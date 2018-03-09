import { Component } from 'react';
import firebase from 'react-native-firebase';

export class JobsProvider extends Component {
  state = {
    jobs: [],
    loading: true,
    error: false
  };

  handleJobSnapshot = querySnapshot =>
    this.setState({
      loading: false,
      error: false,
      jobs: querySnapshot.docs.map(queryDocumentSnapshot => ({
        id: queryDocumentSnapshot.id,
        ...queryDocumentSnapshot.data()
      }))
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
      .onSnapshot(this.handleJobSnapshot)
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return this.props.render(this.state);
  }
}
