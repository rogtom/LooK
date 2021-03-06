import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'



const config = {
    apiKey: "AIzaSyBDyf16k9CwO-qEbYPHYXFdBeIlF6wyaPA",
    authDomain: "vidilities.firebaseapp.com",
    databaseURL: "https://vidilities.firebaseio.com",
    projectId: "vidilities",
    storageBucket: "vidilities.appspot.com",
    messagingSenderId: "583205154666",
    appId: "1:583205154666:web:f814c98631eacac8c93f13",
    measurementId: "G-W60WHJBXP0"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.firestore();

  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password)
      .then(() => {

        this.db.collection('users').doc(this.auth.currentUser.uid)
          .set({favorites: []})

          .catch(error => {
            console.log('Something went wrong with added user to firestore: ', error);
          })
      });


  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // *** Firestore API ***


  addToUserFavorite = (collection, film ) =>
    this.db.collection(collection).doc(this.auth.currentUser.uid).update({favorites: app.firestore.FieldValue.arrayUnion(film)})


  getUserFavorites =  (successCallback) => {
    this.db.collection("users").doc(this.auth.currentUser.uid)
      .get()
      .then(doc => {
        if ( typeof successCallback === "function") {
          successCallback(doc.data().favorites)
        }
      })
      .catch(function(error) {
      console.log("Error getting document:", error);
    });

  }

  removeFavorite = (nevData) => {
    this.db.collection('users').doc(this.auth.currentUser.uid).set(nevData)
        .catch(err => console.log(err))

      .catch(function(error) {
        console.log("Error getting document:", error);
      });

  }

}

export default Firebase;
