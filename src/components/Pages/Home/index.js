import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Container,
  Header,
  Body,
  Title,
  Content,
  ListItem,
  Text,
  Spinner,
  Right,
  Button
} from 'native-base';
import PropTypes from 'prop-types';
import firebase from 'react-native-firebase';
import { GoogleSignin } from 'react-native-google-signin';

export const Home = ({
  navigation,
  screenProps: { jobs: { loading, querySnapshot } }
}) => {
  if (loading) return <Spinner />;
  return (
    <Container>
      <Content>
        {querySnapshot &&
          querySnapshot.docs.map(job => (
            <ListItem
              key={job.id}
              onPress={() => navigation.navigate('JobDetails', { job })}
            >
              <Text>Zlecenie numer {job.data().number}</Text>
            </ListItem>
          ))}
      </Content>
    </Container>
  );
};

Home.navigationOptions = ({ navigation }) => ({
  header: (
    <Header>
      <Body>
        <Title>Lista zleceń</Title>
      </Body>
      <Right>
        <Button
          transparent
          onPress={() => {
            firebase.auth().signOut();
            GoogleSignin.signOut();
          }}
        >
          <Text style={styles.logoutButton}>Wyloguj</Text>
        </Button>
      </Right>
    </Header>
  )
});

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired,
  screenProps: PropTypes.shape({
    jobs: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      querySnapshot: PropTypes.object
    }).isRequired
  }).isRequired
};

const styles = StyleSheet.create({
  logoutButton: {
    color: 'white'
  }
});
