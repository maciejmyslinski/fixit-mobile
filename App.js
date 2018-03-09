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

class App extends Component {
  state = {};

  componentDidMount() {
    firebase
      .firestore()
      .collection('jobs')
      .get()
      .then(querySnapshot =>
        this.setState({
          jobs: querySnapshot.docs.map(queryDocumentSnapshot => ({
            id: queryDocumentSnapshot.id,
            ...queryDocumentSnapshot.data()
          }))
        })
      );
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
