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
    this.unsubscribe = firebase
      .firestore()
      .collection('jobs')
      .where(`assignees.${firebase.auth().currentUser.uid}`, '>', 0)
      .orderBy(`assignees.${firebase.auth().currentUser.uid}`)
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
