         // This is how firebase.js file will look like-->Also npm install firebase//

import firebase from 'firebase'
const firebaseApp=firebase.initializeApp( {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
  });
  const db=firebaseApp.firestore();
const auth=firebaseApp.auth();

export {db,auth};