require('dotenv').config(); // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const moment = require('moment-timezone');
const Bus = require('./models/Bus');

const app = express();

// ✅ Setup CORS to allow web and mobile app requests
const allowedOrigins = [
  'https://bus-alpha-ten.vercel.app', 
  'http://localhost:3001', 
  'http://localhost:3002', 
  'http://localhost:3000',
  'https://www.goperdoor.tech',
  'https://goperdoorbus.vercel.app',
  'http://www.goperdoor.tech',
  'http://goperdoor.tech'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, postman, etc.)
    if (!origin) return callback(null, true);
    
    // For development, allow all origins
    if (process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'), false);
  },
  credentials: true
}));

app.use(express.json());

// Connect to MongoDB (existing connection for bus data)
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ Connected to MongoDB (Bus Data)'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Create separate connection for store data
const storeConnection = mongoose.createConnection(process.env.STORE_MONGODB_URI || 'mongodb+srv://goperdoor576124:Y2WWO1iRVEBE9HzP@cluster0.sdfm9ky.mongodb.net/goperdoor-store?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

storeConnection.on('connected', () => {
  console.log('✅ Connected to Store MongoDB');
});

storeConnection.on('error', (err) => {
  console.error('❌ Store MongoDB connection error:', err);
});

// Make store connection available globally
global.storeConnection = storeConnection;

// Helper: Check if bus runs today
const isBusAvailableToday = (availability) => {
  const today = moment().tz('Asia/Kolkata').day();
  return availability === 'daily' || (availability === 'weekdays' && today >= 1 && today <= 5);
};

// Helper: Process upcoming buses
const getUpcomingBuses = (buses) => {
  const now = moment().tz('Asia/Kolkata');
  return buses
    .filter(bus => bus.active && isBusAvailableToday(bus.availability))
    .map(bus => {
      const leavingTime = moment.tz(bus.leavingTimeFromPerdoor, 'HH:mm', 'Asia/Kolkata');
      let nextDeparture = leavingTime.clone();
      if (nextDeparture.isBefore(now)) {
        nextDeparture.add(1, 'day');
      }
      return {
        ...bus.toObject(),
        nextDeparture: nextDeparture.format('HH:mm'),
        minutesUntilDeparture: nextDeparture.diff(now, 'minutes')
      };
    })
    .sort((a, b) => a.minutesUntilDeparture - b.minutesUntilDeparture);
};

// Store routes
const storeRoutes = require('./routes/store');
app.use('/api/store', storeRoutes);

// ================= PUBLIC ROUTES =================

// Get all destinations
app.get('/api/destinations', async (req, res) => {
  try {
    console.log('📍 Fetching destinations...');
    const destinations = await Bus.distinct('destination', { active: true });
    console.log('📍 Found destinations:', destinations);
    res.json(destinations);
  } catch (error) {
    console.error('❌ Error fetching destinations:', error);
    res.status(500).json({ error: error.message });
  }
});

// Search buses by destination
app.get('/api/buses/search', async (req, res) => {
  try {
    const { destination } = req.query;
    if (!destination) return res.status(400).json({ error: 'Destination is required' });

    const buses = await Bus.find({
      destination: new RegExp(destination, 'i'),
      active: true
    });

    if (buses.length === 0) {
      return res.json({ message: 'No buses found for this destination', buses: [] });
    }

    const upcomingBuses = getUpcomingBuses(buses);
    res.json({ buses: upcomingBuses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ================= ADMIN ROUTES =================

// Get all buses
app.get('/api/admin/buses', async (req, res) => {
  try {
    console.log('🚌 Fetching all buses...');
    const buses = await Bus.find().sort({ createdAt: -1 });
    console.log('🚌 Found buses count:', buses.length);
    res.json(buses);
  } catch (error) {
    console.error('❌ Error fetching buses:', error);
    res.status(500).json({ error: error.message });
  }
});

// Add new bus
app.post('/api/admin/buses', async (req, res) => {
  try {
    const bus = new Bus(req.body);
    const savedBus = await bus.save();
    res.status(201).json(savedBus);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Bus number already exists' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

// Update bus
app.put('/api/admin/buses/:id', async (req, res) => {
  try {
    const updatedBus = await Bus.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedBus) return res.status(404).json({ error: 'Bus not found' });
    res.json(updatedBus);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete bus
app.delete('/api/admin/buses/:id', async (req, res) => {
  try {
    const deletedBus = await Bus.findByIdAndDelete(req.params.id);
    if (!deletedBus) return res.status(404).json({ error: 'Bus not found' });
    res.json({ message: 'Bus deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get bus by ID
app.get('/api/admin/buses/:id', async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) return res.status(404).json({ error: 'Bus not found' });
    res.json(bus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚍 Server running on port ${PORT}`);
  console.log('🕒 Timezone enforced: Asia/Kolkata -', moment().tz('Asia/Kolkata').format());
});

