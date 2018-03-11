import { GoogleSignin } from 'react-native-google-signin';
import firebase from 'react-native-firebase';

export const login = async () => {
  await GoogleSignin.hasPlayServices({ autoResolve: true });
  await GoogleSignin.configure();

  const data = await GoogleSignin.signIn();

  const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);

  firebase.auth().signInWithCredential(credential);
};

export const logout = () => {
  firebase.auth().signOut();
  GoogleSignin.signOut();
};
