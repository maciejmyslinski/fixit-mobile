import { Component } from 'react';
import { PropTypes } from 'prop-types';
import firebase from 'react-native-firebase';
import { login } from 'src/utils/auth';

export class AuthProvider extends Component {
  static propTypes = {
    render: PropTypes.func.isRequired
  };

  state = {};

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged(currentUser => {
      this.setState({ currentUser });
      if (!currentUser) login();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return this.props.render(this.state);
  }
}
