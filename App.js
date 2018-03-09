import React, { Component } from 'react';
import {
  Container,
  Header,
  Body,
  Title,
  Content,
  ListItem,
  Text
} from 'native-base';
import { StackNavigator } from 'react-navigation';
import firebase from 'react-native-firebase';
import { JobsProvider } from 'src/providers/JobsProvider';
import { Navigator } from 'src/components/Navigator';

class App extends Component {
  render() {
    return <JobsProvider render={(jobs) => <Navigator screenProps={jobs} />} />;
  }
}

export default App;
