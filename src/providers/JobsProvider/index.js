import { Component } from 'react';
import firebase from 'react-native-firebase';
import PropTypes from 'prop-types';

export class JobsProvider extends Component {
  static propTypes = {
    render: PropTypes.func.isRequired,
  };

  state = {
    loading: true,
    error: false,
  };

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

  handleError = () => this.setState({ error: true, loading: false });

  handleJobSnapshot = querySnapshot =>
    this.setState({
      loading: false,
      error: false,
      querySnapshot,
    });

  render() {
    return this.props.render(this.state);
  }
}
