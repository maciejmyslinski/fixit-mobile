import React from 'react';
import {
  Container,
  Header,
  Body,
  Title,
  Content,
  ListItem,
  Text,
  Spinner
} from 'native-base';

export const Home = ({
  navigation,
  screenProps: { loading, querySnapshot }
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
    </Header>
  )
});
