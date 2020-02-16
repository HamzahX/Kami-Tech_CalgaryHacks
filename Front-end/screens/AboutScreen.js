import React from 'react';
import { View,Text ,StyleSheet, Image } from 'react-native';


export default class AboutScreen extends React.Component {

  static navigationOptions = {

  };

  render() {
    return (
    <View style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#fddfe3'}}>
        <View style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly'
            }}>
            <View style={{
                              flex: 1,
                              flexDirection: 'column',
                              alignItems: 'center'
                              }}>
                <Image source={require('../components/about_together.png')}/>
            </View>

        </View>
            <Text style={{fontSize: 25, marginBottom: 10, color: '#333333', fontWeight: 'bold'}} >CalgaryHacks 2020</Text>


    </View>
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
