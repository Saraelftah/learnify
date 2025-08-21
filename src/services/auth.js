
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { setCurrentUser } from '../store/UsersSlice';
import { db } from '../../firebase';

export const initializeAuthListener = (dispatch) => {
  console.log('Initializing auth listener...');
  const auth = getAuth();
  const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      // get data from Firestore
      const docSnap = await getDoc(doc(db, 'users', firebaseUser.uid));
      if (docSnap.exists()) {
        const userData = docSnap.data();
        const userObject = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: userData.name, 
          image: firebaseUser.Image,
          role: userData.role,
        };
        dispatch(setCurrentUser(userObject));
      } else {
        dispatch(setCurrentUser(null));
      }
    } else {
      //no login users
      dispatch(setCurrentUser(null));
    }
  });

  return unsubscribe;
};