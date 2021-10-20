import firebase from 'firebase';


var firebaseConfig = {
  apiKey: "AIzaSyAuwofvLpw4pSOHyOzhsjehC9--AG6M_lc",
  authDomain: "clinicastm-4f6cd.firebaseapp.com",
  databaseURL: "https://clinicastm-4f6cd-default-rtdb.firebaseio.com",
  projectId: "clinicastm-4f6cd",
  storageBucket: "clinicastm-4f6cd.appspot.com",
  messagingSenderId: "839536335386",
  appId: "1:839536335386:web:b08732e0db975fa66a4fa3"
};
// Initialize Firebase
var fireDB=firebase.initializeApp(firebaseConfig);

export default fireDB.database().ref();