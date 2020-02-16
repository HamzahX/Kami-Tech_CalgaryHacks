import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Map from '../components/Map';

import {Container, Header, Left, Body, Right, Title} from 'native-base';

// pull in the ScreenName component from ScreenName.js

export default class HomeScreen extends React.Component {
  // we won't need to configure navigationOptions just yet
  static navigationOptions = {};

  render() {
    return (
      <Container>
        <Header style={{backgroundColor: '#F20121'}}>
          <Left>
            <Image
              style={{width: 45, height: 45}}
              source={require('../components/white-bird.png')}
            />
          </Left>
          <Body>
            <Title
              style={{
                fontSize: 20,
                textAlign: 'center',
                marginLeft: 30,
              }}>
              {"Bird's Eye"}
            </Title>
          </Body>
          <Right />
        </Header>

        {/*<Header*/}
        {/*  style={{*/}
        {/*    display: 'flex',*/}
        {/*    textAlign: 'right',*/}
        {/*    justifyContent: 'center',*/}
        {/*    backgroundColor: 'pink',*/}
        {/*  }}>*/}
        {/*  <Left style={{flex: 1, backgroundColor: 'red'}} />*/}
        {/*  <Body*/}
        {/*    style={{*/}
        {/*      flex: 1,*/}
        {/*      backgroundColor: 'green',*/}
        {/*    }}>*/}
        {/*    <Title style={{}}>BirdsEye</Title>*/}
        {/*  </Body>*/}
        {/*  <Right style={{flex: 1, background: 'blue'}} />*/}
        {/*</Header>*/}
        {/*<Header>*/}
        {/*  <Left/>*/}
        {/*  <Title>BirdsEye</Title>*/}
        {/*  <Right/>*/}
        {/*</Header>*/}
        <Map />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
