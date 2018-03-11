import { Component } from 'react';
import { PropTypes } from 'prop-types';
import { GoogleSignin } from 'react-native-google-signin';
import firebase from 'react-native-firebase';

export class AuthProvider extends Component {
  static propTypes = {
    render: PropTypes.func.isRequired
  };

  state = {};

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged(currentUser => {
      this.setState({ currentUser });
      if (!currentUser) this.login();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  login = async () => {
    await GoogleSignin.hasPlayServices({ autoResolve: true });
    await GoogleSignin.configure();

    const data = await GoogleSignin.signIn();

    const credential = firebase.auth.GoogleAuthProvider.credential(
      data.idToken,
      data.accessToken
    );

    firebase.auth().signInWithCredential(credential);
  };

  render() {
    return this.props.render(this.state);
  }
}
