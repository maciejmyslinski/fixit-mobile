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
import { View, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';
import firebase from 'react-native-firebase';
import { GoogleSigninButton } from 'react-native-google-signin';
import { JobsProvider } from 'src/providers/JobsProvider';
import { AuthProvider } from 'src/providers/AuthProvider';
import { Navigator } from 'src/components/Navigator';
import { login } from 'src/utils/auth';

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
          return (
            <View style={styles.loginWrapper}>
              <Text>Zaloguj</Text>
              <GoogleSigninButton
                style={styles.loginButton}
                color={GoogleSigninButton.Color.Light}
                size={GoogleSigninButton.Size.Icon}
                onPress={login}
              />
            </View>
          );
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  loginWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginButton: {
    width: 120,
    height: 44
  }
});

export default App;
