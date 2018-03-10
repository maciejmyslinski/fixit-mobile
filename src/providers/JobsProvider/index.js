import { Component } from 'react';
import firebase from 'react-native-firebase';

export class JobsProvider extends Component {
  state = {
    loading: true,
    error: false
  };

  handleJobSnapshot = querySnapshot =>
    this.setState({
      loading: false,
      error: false,
      querySnapshot
    });

  handleError = () => this.setState({ error: true, loading: false });

  componentDidMount() {
    firebase
      .firestore()
      .collection('jobs')
      .orderBy('number')
      .get()
      .then(this.handleJobSnapshot)
      .catch(this.handleError);

    this.unsubscribe = firebase
      .firestore()
      .collection('jobs')
      .orderBy('number')
      .onSnapshot(this.handleJobSnapshot, this.handleError);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return this.props.render(this.state);
  }
}
