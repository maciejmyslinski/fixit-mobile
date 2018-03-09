import React, { Component } from "react";
import {
  Container,
  Header,
  Body,
  Title,
  Content,
  ListItem,
  Text
} from "native-base";
import { StackNavigator } from "react-navigation";
import firebase from "react-native-firebase";

class App extends Component {
  state = {
    jobs: [],
  }
  
  componentDidMount() {
    firebase
      .firestore()
      .collection("jobs")
      .orderBy('number')
      .get()
      .then(querySnapshot =>
        this.setState({
          jobs: querySnapshot.docs.map(queryDocumentSnapshot => ({
            id: queryDocumentSnapshot.id,
            ...queryDocumentSnapshot.data()
          }))
        })
      );
    this.unsubscribe = firebase
      .firestore()
      .collection("jobs")
      .orderBy('number')
      .onSnapshot(documentSnapshot =>
        this.setState({
          jobs: documentSnapshot.docs.map(queryDocumentSnapshot => ({
            id: queryDocumentSnapshot.id,
            ...queryDocumentSnapshot.data()
          }))
        })
      );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Lista zleceń</Title>
          </Body>
        </Header>
        <Content>
          {this.state.jobs &&
            this.state.jobs.map(job => (
              <ListItem key={job.id}>
                <Text>Zlecenie numer {job.number}</Text>
              </ListItem>
            ))}
        </Content>
      </Container>
    );
  }
}

export default App;
