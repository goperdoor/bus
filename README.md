# Perdoor Bus Timing Website

A full-stack MERN application for managing and displaying bus timings for Perdoor junction. This website helps villagers find bus timings easily and provides an admin panel for managing bus information.

## Features

### User Features
- 🚌 Search buses by destination
- ⏰ View upcoming bus timings sorted by next departure
- 📱 Mobile-friendly responsive design
- 🔍 Auto-complete destination suggestions
- 📅 Shows availability (Daily/Weekdays only)
- ⚡ Real-time next departure calculation

### Admin Features
- ➕ Add new buses
- ✏️ Edit existing bus information
- 🗑️ Delete buses
- 📊 View all buses in a table format
- 🔄 Toggle bus active/inactive status
- ⏲️ Set arrival and departure times

## Technology Stack

- **Frontend**: React.js with responsive CSS
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Libraries**: 
  - Mongoose for MongoDB object modeling
  - Moment.js for time handling
  - Axios for API calls
  - React Router for navigation

## Project Structure

```
perdoor-bus-timing/
├── backend/
│   ├── models/
│   │   └── Bus.js
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.js
│   │   │   └── Admin.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB installed and running locally
- npm or yarn package manager

### Quick Start (Recommended)
```bash
# Clone the repository
git clone <repository-url>
cd perdoor-bus-timing

# Install root dependencies
npm install

# Run the automated setup
npm run setup

# Start the application (Linux/Mac)
chmod +x start.sh
./start.sh

# Or start manually
npm run dev
```

### Manual Setup

#### Step 1: Clone the repository
```bash
git clone <repository-url>
cd perdoor-bus-timing
```

#### Step 2: Install Dependencies
```bash
# Install all dependencies at once
npm run install:all

# Or install individually
cd backend && npm install
cd ../frontend && npm install
```

#### Step 3: Start MongoDB
Make sure MongoDB is running on your local machine:
```bash
mongod
```

#### Step 4: Start the Application
```bash
# Start both servers simultaneously
npm run dev

# Or start individually
npm run start:backend  # Backend on http://localhost:5000
npm run start:frontend # Frontend on http://localhost:3000
```

### Available Scripts
- `npm run setup` - Automated setup with sample data
- `npm run dev` - Start both servers in development mode
- `npm run start` - Start both servers in production mode
- `npm run install:all` - Install dependencies for both backend and frontend
- `./start.sh` - Start application with automatic MongoDB check (Linux/Mac)

## Usage

### For Users
1. Open `http://localhost:3000` in your browser
2. Enter your destination in the search box
3. Click "Search Buses" to view available buses
4. View upcoming bus timings sorted by next departure

### For Admins
1. Click "Admin Panel" button on the homepage
2. Add new buses by clicking "Add New Bus"
3. Edit existing buses by clicking "Edit" in the table
4. Delete buses by clicking "Delete" (with confirmation)
5. Toggle bus status between active/inactive

## API Endpoints

### Public Endpoints
- `GET /api/destinations` - Get all unique destinations
- `GET /api/buses/search?destination=<destination>` - Search buses by destination

### Admin Endpoints
- `GET /api/admin/buses` - Get all buses
- `POST /api/admin/buses` - Add new bus
- `PUT /api/admin/buses/:id` - Update bus
- `DELETE /api/admin/buses/:id` - Delete bus
- `GET /api/admin/buses/:id` - Get bus by ID

## Database Schema

### Bus Model
```javascript
{
  busName: String,          // Name of the bus service
  busNumber: String,        // Unique bus number
  destination: String,      // Destination city/town
  arrivalTimeToPerdoor: String,    // Arrival time to Perdoor (HH:mm format)
  leavingTimeFromPerdoor: String,  // Departure time from Perdoor (HH:mm format)
  availability: String,     // 'daily' or 'weekdays'
  active: Boolean,          // Whether bus is currently active
  createdAt: Date,          // Auto-generated
  updatedAt: Date           // Auto-generated
}
```

## Mobile Responsiveness

The application is fully responsive and optimized for mobile devices:
- Touch-friendly buttons and inputs
- Responsive grid layouts
- Mobile-optimized modal dialogs
- Large, easy-to-read text
- Proper viewport settings

## Features Explained

### Time Calculation
The system calculates the next departure time based on:
- Current time
- Bus departure time
- Day of the week (for weekday-only buses)
- Shows time remaining until departure

### Search Functionality
- Case-insensitive search
- Partial matching for destinations
- Auto-complete suggestions
- Results sorted by upcoming departure time

### Admin Panel
- Full CRUD operations
- Form validation
- Confirmation dialogs for destructive actions
- Real-time updates
- Error handling and user feedback

## Development Notes

### Time Format
- All times are stored in 24-hour format (HH:mm)
- Displayed in 12-hour format (h:mm AM/PM) for users
- Time calculations use Moment.js for accuracy

### Validation
- Required field validation
- Time format validation
- Unique bus number constraint
- Form error display

### Error Handling
- API error responses
- Network error handling
- User-friendly error messages
- Loading states

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For support or questions about this project, please create an issue in the repository.

---

Built with ❤️ for the Perdoor community