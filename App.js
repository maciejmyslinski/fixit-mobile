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
import { AuthProvider } from 'src/providers/AuthProvider';
import { Navigator } from 'src/components/Navigator';

class App extends Component {
  render() {
    return (
      <AuthProvider
        render={auth => {
          if (auth.currentUser)
            return (
              <JobsProvider
                render={jobs => <Navigator screenProps={{ jobs, auth }} />}
              />
            );
          return null;
        }}
      />
    );
  }
}

export default App;
