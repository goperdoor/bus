const { exec } = require('child_process');
const mongoose = require('mongoose');
const path = require('path');

// Sample bus data for testing
const sampleBuses = [
  {
    busName: 'Kerala RTC',
    busNumber: 'KL-07-1234',
    destination: 'Kochi',
    arrivalTimeToPerdoor: '08:30',
    leavingTimeFromPerdoor: '08:45',
    availability: 'daily',
    active: true
  },
  {
    busName: 'Private Express',
    busNumber: 'KL-07-5678',
    destination: 'Thrissur',
    arrivalTimeToPerdoor: '09:15',
    leavingTimeFromPerdoor: '09:30',
    availability: 'weekdays',
    active: true
  },
  {
    busName: 'Malabar Express',
    busNumber: 'KL-07-9012',
    destination: 'Palakkad',
    arrivalTimeToPerdoor: '10:00',
    leavingTimeFromPerdoor: '10:15',
    availability: 'daily',
    active: true
  },
  {
    busName: 'City Bus',
    busNumber: 'KL-07-3456',
    destination: 'Calicut',
    arrivalTimeToPerdoor: '11:30',
    leavingTimeFromPerdoor: '11:45',
    availability: 'daily',
    active: true
  },
  {
    busName: 'Super Express',
    busNumber: 'KL-07-7890',
    destination: 'Kottayam',
    arrivalTimeToPerdoor: '14:20',
    leavingTimeFromPerdoor: '14:35',
    availability: 'weekdays',
    active: true
  }
];

function runCommand(command, cwd = process.cwd()) {
  return new Promise((resolve, reject) => {
    console.log(`Running: ${command} in ${cwd}`);
    exec(command, { cwd }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        reject(error);
        return;
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
      }
      console.log(stdout);
      resolve(stdout);
    });
  });
}

async function setupProject() {
  try {
    console.log('🚀 Setting up Perdoor Bus Timing Project...\n');

    // Install backend dependencies
    console.log('📦 Installing backend dependencies...');
    await runCommand('npm install', path.join(__dirname, 'backend'));

    // Install frontend dependencies
    console.log('📦 Installing frontend dependencies...');
    await runCommand('npm install', path.join(__dirname, 'frontend'));

    console.log('✅ Dependencies installed successfully!\n');

    // Setup sample data
    console.log('🗄️  Setting up sample data...');
    await setupSampleData();

    console.log('🎉 Setup completed successfully!\n');
    console.log('📋 Next steps:');
    console.log('1. Make sure MongoDB is running: mongod');
    console.log('2. Start the backend server: cd backend && npm start');
    console.log('3. Start the frontend server: cd frontend && npm start');
    console.log('4. Open http://localhost:3000 in your browser\n');
    console.log('🚌 Happy bus timing management!');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

async function setupSampleData() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/perdoor-bus-timing', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Load Bus model
    const Bus = require('./backend/models/Bus');

    // Clear existing data
    await Bus.deleteMany({});
    console.log('🗑️  Cleared existing bus data');

    // Insert sample data
    await Bus.insertMany(sampleBuses);
    console.log(`✅ Inserted ${sampleBuses.length} sample buses`);

    // Close connection
    await mongoose.connection.close();
    console.log('🔐 Database connection closed');

  } catch (error) {
    console.error('❌ Error setting up sample data:', error.message);
    console.log('⚠️  You can add sample data manually through the admin panel');
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }
  }
}

// Run setup if called directly
if (require.main === module) {
  setupProject();
}

module.exports = { setupProject, setupSampleData };