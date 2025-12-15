# PowerScale

A React Native app for managing and visualizing anime character power tiers. Built with Expo and Supabase.

## Features
- Home screen with tier list overview
- Add, edit, and view character details
- Tier detail screens
- Profile management
- Color-coded tier cards
- Supabase backend integration

## Folder Structure
```
assets/                # Images and static assets
src/
  components/          # Reusable UI components
  config/              # Supabase configuration
  screens/             # App screens (Home, Profile, etc.)
  utils/               # Utility functions (e.g., tierColors.js)
App.js                 # Main app entry point
index.js               # App bootstrap
babel.config.js        # Babel configuration
package.json           # Project dependencies and scripts
```

## Getting Started
1. Install dependencies:
   ```
   npm install
   ```
2. Start the development server:
   ```
   npx expo start
   ```
3. Scan the QR code with Expo Go or run on an emulator.

## Configuration
- Supabase settings are in `src/config/supabase.js`.
- Babel preset is set for Expo in `babel.config.js`.

## Requirements
- Node.js
- Expo CLI
- Supabase account (for backend)

## License
MIT
