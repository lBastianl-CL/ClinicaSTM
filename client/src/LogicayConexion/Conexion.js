import firebase from 'firebase';


var firebaseConfig = {
  codigoFIREBASE
};
// Initialize Firebase
var fireDB=firebase.initializeApp(firebaseConfig);

export default fireDB.database().ref();