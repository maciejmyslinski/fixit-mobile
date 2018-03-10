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
  screenProps: { loading, data }
}) => {
  if (loading) return <Spinner />;
  return (
    <Container>
      <Content>
        {data &&
          data.map(job => (
            <ListItem
              key={job.id}
              onPress={() => navigation.navigate('JobDetails', { number: job.number })}
            >
              <Text>Zlecenie numer {job.number}</Text>
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
