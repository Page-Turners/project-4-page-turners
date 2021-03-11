import firebase from 'firebase/app';
import 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCo5mNfIP6n1ZJUZtRymKELImtSKvAuYFA",
  authDomain: "project-4-page-turner.firebaseapp.com",
  projectId: "project-4-page-turner",
  storageBucket: "project-4-page-turner.appspot.com",
  messagingSenderId: "400768705756",
  appId: "1:400768705756:web:1ed5b6d428367ef881c019"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;