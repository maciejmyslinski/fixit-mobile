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

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
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
        data={Array.from(new Array(20)).map((item, i) => ({ key: i + 1 }))}
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
