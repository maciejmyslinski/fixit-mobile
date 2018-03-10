import React, { Component } from 'react';
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
  Icon,
  Item,
  Input
} from 'native-base';
import firebase from 'react-native-firebase';
import debounce from 'lodash/debounce';

export class JobDetails extends Component {
  handleChangeText = text =>
    this.props.navigation.state.params.job.ref.update({
      report: text
    });

  render() {
    const {
      navigation: { navigate, state: { params: { job } } },
      screenProps: { loading, data }
    } = this.props;

    if (loading) return <Spinner />;
    return (
      <Container>
        <Content padder>
          <Text>Zlecenie numer {job.data().number}</Text>
          <Text>{job.data().description}</Text>
          <Text>Raport:</Text>
          <Item regular>
            <Input
              defaultValue={job.data().report}
              placeholder="Twój raport ze zlecenia"
              onChangeText={debounce(this.handleChangeText, 2000, {
                maxWait: 6000
              })}
            />
          </Item>
        </Content>
      </Container>
    );
  }
}

JobDetails.navigationOptions = ({
  navigation,
  navigation: { state: { params: { job } } }
}) => ({
  header: (
    <Header>
      <Left>
        <Button transparent onPress={navigation.popToTop}>
          <Icon name="arrow-back" />
        </Button>
      </Left>
      <Body>
        <Title>Zlecenie {job.data().number}</Title>
      </Body>
    </Header>
  )
});
