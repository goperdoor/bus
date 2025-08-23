# GoPerdoor React Native App

A React Native mobile application for bus timing information in Perdoor, using the same backend as the website with exact UI/UX matching.

## Features

✅ **Same Backend Integration** - Uses the exact API endpoints as the GoPerdoor website
✅ **Dropdown Selection** - Exactly like website with Kannada labels (ಎಲ್ಲಿಗೆ ಹೋಗಬೇಕು?)
✅ **Bus Search Results** - Same format as website with Kannada text
✅ **Time Formatting** - 12-hour format with moment.js like the website
✅ **Popular Destinations** - Quick access to frequently searched routes
✅ **Bus Timing Tables** - Complete schedules for all active routes grouped by destination
✅ **Clean UI** - Material design with header and footer components matching website
✅ **SDK 53** - Latest Expo SDK for better performance and features

## UI Components Matching Website

### Search Form
- **Dropdown Picker** - Same as website's select dropdown
- **Kannada Labels** - ಎಲ್ಲಿಗೆ ಹೋಗಬೇಕು? (Where do you want to go?)
- **Search Button** - ಬಸ್ ಹುಡುಕಿ (Search Bus)

### Bus Results
- **Bus Name & Number** - Displayed prominently
- **Arrival/Departure Times** - ಪೆರ್ಡೂರಿಗೆ ಆಗಮಿಸುವ ಸಮಯ / ಪೆರ್ಡೂರಿನಿಂದ ಹೊರಡುವ ಸಮಯ
- **Next Departure** - ನಂತರ ಪೆರ್ಡೂರಿನಿಂದ ಹೊರಡುತ್ತದೆ
- **Availability Badge** - ಪ್ರತಿದಿನ (Daily) / ಕೆವಲ ವಾರದ ದಿನಗಳಲ್ಲಿ (Weekdays only)

### Timing Tables
- **Grouped by Destination** - Same as website structure
- **Bus Details** - Name, number, and schedule
- **Color-coded Availability** - Visual distinction for daily vs weekdays

## Setup Instructions

### Prerequisites
- Node.js installed
- Expo CLI: `npm install -g @expo/cli`
- Expo Go app on your phone (from Play Store/App Store)

### Installation

1. **Navigate to the app folder:**
   ```bash
   cd app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Run on device:**
   - Scan the QR code with Expo Go app
   - Or press 'a' for Android emulator
   - Or press 'w' for web browser

### Quick Setup Scripts

**Windows:**
```bash
setup-app.bat
```

**Mac/Linux:**
```bash
./setup-app.sh
```

## Backend Connection

The app connects to the same backend as the website:
- **API Base URL:** `https://bus-backend-production-44ce.up.railway.app/api`
- **Endpoints:**
  - `/destinations` - Get all available destinations
  - `/buses/search?destination=X` - Search buses by destination
  - `/admin/buses` - Get all bus schedules

## App Structure

```
app/
├── App.js                 # Main app component (no navigation)
├── src/
│   ├── components/
│   │   ├── Header.js      # App header with branding
│   │   └── Footer.js      # Footer with contact info
│   ├── screens/
│   │   └── HomeScreen.js  # Main screen with search functionality
│   └── services/
│       └── api.js         # Backend API integration
└── package.json
```

## Dependencies

- **React Native** - Cross-platform mobile development
- **Expo SDK 53** - Latest development platform
- **@react-native-picker/picker** - Dropdown selection (like website)
- **Axios** - HTTP client for API calls
- **Moment.js** - Time formatting (matching website exactly)
- **React Native Safe Area Context** - Handle device safe areas
- **Expo Linear Gradient** - Beautiful gradients

## Key Features Matching Website

1. **Exact Search Flow** - Dropdown selection → Search → Results
2. **Same Data Structure** - Identical API responses and data handling
3. **Kannada Text Support** - All labels and messages in Kannada like website
4. **Time Formatting** - Moment.js 12-hour format exactly like website
5. **Bus Information Display** - Same layout and information as website
6. **Popular Destinations** - Quick access buttons for common routes
7. **Timing Tables** - Complete bus schedules grouped by destination

## Development

The app uses the exact same API endpoints and data structures as the website, ensuring complete consistency across platforms. All bus timing data, destinations, search functionality, and display formats are identical to the web version.

## Website vs Mobile App

Both platforms now provide:
- Same backend and database
- Identical search functionality
- Same time formatting and display
- Consistent Kannada text and labels
- Matching color schemes and branding
- Same bus information structure
