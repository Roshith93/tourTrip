import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAaECsdfzU6zFP4ad5TMCBwzOro01_sS6Y",
    authDomain: "tripplanner-7ed5b.firebaseapp.com",
    databaseURL: "https://tripplanner-7ed5b.firebaseio.com",
    projectId: "tripplanner-7ed5b",
    storageBucket: "tripplanner-7ed5b.appspot.com",
    messagingSenderId: "497528194682"
  };
  firebase.initializeApp(config);
  firebase.firestore().settings({ timestampsInSnapshots: true });
  export const storage = firebase.storage();
  export default  firebase; 
  
