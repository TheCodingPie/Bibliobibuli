import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

  var firebaseConfig = {
    apiKey: "AIzaSyCbesTTzoQCL6R7OEhOXUhZsdxglrFBYmE",
    authDomain: "bibliobubilii.firebaseapp.com",
    databaseURL: "https://bibliobubilii.firebaseio.com",
    projectId: "bibliobubilii",
    storageBucket: "bibliobubilii.appspot.com",
    messagingSenderId: "555161433580",
    appId: "1:555161433580:web:1d1484951f84a4f106fcc9",
    measurementId: "G-LW8JGF430N"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase
