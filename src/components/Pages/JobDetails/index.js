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
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';

export class JobDetails extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          job: PropTypes.shape({
            ref: PropTypes.shape({
              collection: PropTypes.func.isRequired
            }).isRequired
          }).isRequired
        }).isRequired
      }).isRequired
    }).isRequired,
    screenProps: PropTypes.shape({
      jobs: PropTypes.shape({
        loading: PropTypes.bool.isRequired,
        querySnapshot: PropTypes.object
      }).isRequired
    }).isRequired
  };

  state = { loading: true };

  componentDidMount = async () => {
    const currentReport = await this.fetchReport();
    this.setState({
      loading: false,
      initialValue: currentReport ? currentReport.data().content : ''
    });
  };

  fetchReport = async () => {
    const currentJob = this.props.navigation.state.params.job.ref;
    const currentUserUid = firebase.auth().currentUser.uid;
    const reportsFromCurrentUser = await currentJob
      .collection('reports')
      .where('creatorUid', '==', currentUserUid)
      .get();
    return !reportsFromCurrentUser.empty && reportsFromCurrentUser.docs[0];
  };

  handleChangeText = async text => {
    const currentReport = await this.fetchReport();

    if (currentReport) {
      currentJob.collection('reports').add({
        creatorUid: currentUserUid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        content: text
      });
    } else {
      currentReport.ref.update({
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        content: text
      });
    }
  };

  render() {
    const {
      navigation: { navigate, state: { params: { job } } },
      screenProps: { jobs: { loading, data } }
    } = this.props;

    if (loading || this.state.loading) return <Spinner />;
    return (
      <Container>
        <Content padder>
          <Text>Opis zlecenia:</Text>
          <Text>{job.data().description}</Text>
          <Text>Raport:</Text>
          <Item regular>
            <Input
              defaultValue={this.state.initialValue}
              placeholder="Twój raport ze zlecenia"
              multiline={true}
              onChangeText={debounce(this.handleChangeText, 500, {
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
