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
    this.login();
  }

  login = async () => {
    try {
      await GoogleSignin.configure();

      const data = await GoogleSignin.signIn();

      const credential = firebase.auth.GoogleAuthProvider.credential(
        data.idToken,
        data.accessToken
      );

      const UserCredential = await firebase
        .auth()
        .signInWithCredential(credential);

      this.setState({ error: null, UserCredential });
    } catch (error) {
      this.setState({ UserCredential: null, error });
    }
  };

  render() {
    return this.props.render(this.state);
  }
}
