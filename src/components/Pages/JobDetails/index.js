import React from 'react';
import {
  Container,
  Header,
  Body,
  Title,
  Content,
  ListItem,
  Text,
  Spinner,
  Left,
  Button,
  Icon
} from 'native-base';

export const JobDetails = ({
  navigation: { navigate, state: { params: { number } } },
  screenProps: { loading, jobs }
}) => {
  if (loading) return <Spinner />;
  return (
    <Container>
      <Content padder>
        <Text>Zlecenie numer {number}</Text>
        <Text>{jobs.find(job => job.number === number).description}</Text>
      </Content>
    </Container>
  );
};

JobDetails.navigationOptions = ({
  navigation,
  navigation: { state: { params: { number } } }
}) => ({
  header: (
    <Header>
      <Left>
        <Button transparent onPress={navigation.popToTop}>
          <Icon name="arrow-back" />
        </Button>
      </Left>
      <Body>
        <Title>Zlecenie {number}</Title>
      </Body>
    </Header>
  )
});
