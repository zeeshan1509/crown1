import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    
        apiKey: "AIzaSyBs8G28cA0uGl_FnWaSJ_N6Nq_KJ9MV87c",
        authDomain: "crown-db15.firebaseapp.com",
        databaseURL: "https://crown-db15.firebaseio.com",
        projectId: "crown-db15",
        storageBucket: "crown-db15.appspot.com",
        messagingSenderId: "989211542808",
        appId: "1:989211542808:web:6ad0eabccc25533f1b4a6d",
        measurementId: "G-0F6B1KDHZ1"
      
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
        if (!userAuth) return;
      
        const userRef = firestore.doc(`users/${userAuth.uid}`);
      
        const snapShot = await userRef.get();
      
        if (!snapShot.exists) {
          const { displayName, email } = userAuth;
          const createdAt = new Date();
          try {
            await userRef.set({
              displayName,
              email,
              createdAt,
              ...additionalData
            });
          } catch (error) {
            console.log('error creating user', error.message);
          }
        }
      
        return userRef;
      };
      
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInwWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
