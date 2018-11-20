import firebase from 'firebase'
// Initialize Firebase
var config = {
  apiKey: "AIzaSyDfuNr3RaCZkituTfoB7b7pR2u2rWuraWE",
  authDomain: "pilotcity-firestore.firebaseapp.com",
  databaseURL: "https://pilotcity-firestore.firebaseio.com",
  projectId: "pilotcity-firestore",
  storageBucket: "pilotcity-firestore.appspot.com",
  messagingSenderId: "80767280856"
};
const firebaseApp = firebase.initializeApp(config)
firebaseApp.firestore().settings({timestampsInSnapshots: true})

// export firestore database
export default firebaseApp