# Firebase Setup Guide

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name (e.g., "authenx-hospital")
4. Follow the setup wizard

## Step 2: Enable Realtime Database

1. In Firebase Console, go to "Build" → "Realtime Database"
2. Click "Create Database"
3. Choose location (closest to your users)
4. Start in "Test mode" for development (change to production rules later)

## Step 3: Get Firebase Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click the web icon (</>) to add a web app
4. Register your app with a nickname
5. Copy the `firebaseConfig` object

## Step 4: Update Configuration

Open `src/firebase.js` and replace the configuration:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## Step 5: Set Database Rules (Production)

In Firebase Console → Realtime Database → Rules, use these rules:

```json
{
  "rules": {
    "patients": {
      ".read": true,
      ".write": true,
      "$patientId": {
        ".validate": "newData.hasChildren(['timestamp', 'patient', 'symptoms', 'hospital', 'analysis', 'queue', 'status'])"
      }
    }
  }
}
```

For better security in production:

```json
{
  "rules": {
    "patients": {
      ".read": "auth != null",
      ".write": "auth != null",
      "$patientId": {
        ".validate": "newData.hasChildren(['timestamp', 'patient', 'symptoms', 'hospital', 'analysis', 'queue', 'status'])"
      }
    }
  }
}
```

## Data Structure

The Firebase database will store patient data in this structure:

```
patients/
  ├── {patientId1}/
  │   ├── id: "unique-id"
  │   ├── timestamp: "2024-03-04T10:30:00.000Z"
  │   ├── tokenNumber: 123
  │   ├── patient/
  │   │   ├── name: "John Doe"
  │   │   ├── age: 45
  │   │   ├── gender: "Male"
  │   │   ├── bloodGroup: "O+"
  │   │   ├── phone: "9876543210"
  │   │   └── ...
  │   ├── symptoms/
  │   │   ├── description: "Chest pain and shortness of breath"
  │   │   ├── duration: "2 hours"
  │   │   ├── severity: "Critical"
  │   │   └── ...
  │   ├── hospital/
  │   │   ├── id: "h_1"
  │   │   ├── name: "Apollo Hospital"
  │   │   ├── address: "..."
  │   │   └── ...
  │   ├── analysis/
  │   │   ├── specialization: "Cardiology"
  │   │   ├── riskLevel: "Critical"
  │   │   ├── conditions: ["Possible cardiac event"]
  │   │   └── ...
  │   ├── queue/
  │   │   ├── position: 1
  │   │   ├── total: 5
  │   │   ├── waitTime: 12
  │   │   └── priority: 4
  │   ├── status: "waiting"
  │   └── lastUpdated: "2024-03-04T10:30:00.000Z"
  └── {patientId2}/
      └── ...
```

## Usage in Your App

The Firebase integration is already set up in `App.js`. When a token is generated, patient data is automatically saved to Firebase.

### For the Hospital Dashboard (patientapp)

To fetch and display patients in real-time:

```javascript
import { listenToPatients, listenToHospitalPatients } from './firebase';

// Listen to all patients
const unsubscribe = listenToPatients((patients) => {
  console.log('All patients:', patients);
  // Update your UI with the patients array
});

// Listen to specific hospital's patients
const unsubscribe = listenToHospitalPatients('h_1', (patients) => {
  console.log('Hospital patients:', patients);
  // Update your UI with filtered patients
});

// Don't forget to unsubscribe when component unmounts
return () => unsubscribe();
```

## Testing

1. Generate a token in the main app
2. Check Firebase Console → Realtime Database
3. You should see the patient data appear in real-time
4. Any updates will sync automatically across all connected clients

## Security Notes

- Never commit your Firebase config with real credentials to public repositories
- Use environment variables for production
- Enable Firebase Authentication for production use
- Set proper database rules to restrict access
- Monitor usage in Firebase Console to avoid quota limits

## Troubleshooting

**Error: "Permission denied"**
- Check your database rules in Firebase Console
- Make sure you're in test mode for development

**Error: "Firebase not initialized"**
- Make sure you've replaced the config in `firebase.js`
- Check that the databaseURL is correct

**Data not syncing**
- Check your internet connection
- Verify Firebase config is correct
- Check browser console for errors
- Ensure Firebase Realtime Database is enabled in console
