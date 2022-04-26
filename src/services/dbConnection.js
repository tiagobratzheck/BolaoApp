import firebase from 'firebase'
import firestore from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAzkkc5br3v9iSJZ_oF02I8wzULnrWMqVI",
    authDomain: "bolao2022.firebaseapp.com",
    projectId: "bolao2022",
    storageBucket: "bolao2022.appspot.com",
    messagingSenderId: "709525091897",
    appId: "1:709525091897:web:592fa149dbe4fdee40bfe8",
};

const firebaseApp = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();

const db = firebaseApp.firestore();

export default db;
