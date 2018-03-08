/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  FlatList
} from "react-native";
import { StackNavigator } from "react-navigation";
import firebase from "react-native-firebase";

firebase
  .auth()
  .signInAnonymously()
  .then(user => {
    console.log(user);
  });
  
class TaskDetails extends Component {
  render() {
    return <Text>Hello</Text>;
  }
}

class TasksList extends Component {
  render() {
    return (
      <FlatList
        data={Array.from(new Array(20)).map((item, i) => ({ key: String(i + 1) }))}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("TaskDetails")}
          >
            <Text style={styles.welcome}>Zlecenie nr. {item.key}</Text>
          </TouchableOpacity>
        )}
      />
    );
  }
}

export default StackNavigator({
  Home: { screen: TasksList },
  TaskDetails: { screen: TaskDetails }
});

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
