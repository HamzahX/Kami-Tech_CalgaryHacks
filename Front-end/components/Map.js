import React, {Component, useEffect, useState} from 'react';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
} from 'native-base';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  Platform,
  StatusBar,
} from 'react-native';
import SnowFlake from './snow.svg';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import {PERMISSIONS, request} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import {Colors} from 'react-native/Libraries/NewAppScreen';
class Map extends Component {
  state = {
    initialPosition: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.09,
      longitudeDelta: 0.035,
    },
    locations: [
      {id: '00000001.jpg', latitude: 51.0756, longitude: -114.126213},
      {id: '00000000.jpg', latitude: 51.076537, longitude: -114.128037},
      {id: '00000002.jpg', latitude: 51.076085, longitude: -114.134464},
      {id: '00000004.jpg', latitude: 51.077905, longitude: -114.132479},
      {id: '00000003.jpg', latitude: 51.079684, longitude: -114.125033},
      {id: '00000013_.jpg', latitude: 51.079684, longitude: -114.130505},
      {id: '00000001_.jpg', latitude: 51.080688, longitude: -114.129539},
      {id: '00000000_.jpg', latitude: 51.078936, longitude: -114.133595},
      {id: '00000002_.jpg', latitude: 51.07533, longitude: -114.133101},
      {id: '00000007_.jpeg', latitude: 51.076193, longitude: -114.129861},
    ],
  };

  // this.processConditions = this.processConditions.bind(this);

  getConditions() {
    fetch('https://kami-backend.herokuapp.com/api/getConditions', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        locations: this.state.locations,
      }),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('No results found');
        }
      })
      .then(condRes => this.processConditions(condRes))
      .catch(error => console.log(error.message));
  }

  processConditions = condRes => {
    let locations = this.state.locations;
    let icy = [];
    for (let i = 0; i < locations.length; i++) {
      let location = locations[i];
      let id = location.id;
      console.log(condRes[id]);
      location.condition = condRes[id].condition;
      if (location.condition === 'icy') {
        icy.push(location);
      }
    }

    console.log(locations);
    this.setState({locations: icy});
  };

  handelRegionChange = event => {
    let area = {
      // 51.084119, -114.158612
      ul: {
        lat: 51.084119,
        longi: -114.158612,
      },
      // ll: {
      //   lat: 51.073256,
      //   longi: -114.151527,
      // },
      // ur: {
      //   lat: 51.08185,
      //   longi: -114.12318,
      // },
      // 51.072315, -114.111605
      lr: {
        lat: 51.072315,
        longi: -114.111605,
      },
    };

    // x is longitute
    // y is latitude

    //bb is the bounding box,
    // (ix,iy) are its top-left coordinates,
    // (ax,ay) its bottom-right coordinates.
    // p is the point and (x,y) its coordinates.
    // if( bb.ix <= p.x && p.x <= bb.ax && bb.iy <= p.y && p.y <= bb.ay ) {

    // if you pan out get back to the screen
    if (
      !(area.ul.longi <= event.longitude && event.longitude <= area.lr.longi)
      // area.ul.lat <= event.latitude &&
      // event.latitude <= area.lr.lat
    ) {
      // Point is in bounding box
      console.log('out of bounds');
      console.log('lat', event.latitude);
      console.log('longi', event.longitude);
      this.requestLocationPermission().then(r => console.log('req loc res', r));
    }

    //console.log('Cordinates');
    //console.log('ed: ', event);

    // let initialPosition = {
    //   latitude: 51.07736699,
    //   latitudeDelta: 0.09,
    //   longitude: -114.12419059,
    //   longitudeDelta: 0.035,
    // };
    // console.log(initialPosition);
    // console.log('region change');

    // this.setState({initialPosition: initialPosition});
    console.log('region change');
  };

  requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      console.log('iPhone: ' + response);

      if (response === 'granted') {
        this.locateCurrentPosition();
      }
    } else {
      var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      console.log('Android: ' + response);

      if (response === 'granted') {
        this.locateCurrentPosition();
      }
    }
  };

  locateCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        // console.log(JSON.stringify(position));

        let initialPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.035,
        };

        this.setState({initialPosition: initialPosition});
        this.mapRef.setMapBoundaries(
          {latitude: 51.081368, longitude: -114.151829},
          {latitude: 51.074238, longitude: -114.119081},
        );

        //console.log('locate', this.state);
      },
      error => console.log('error occurred ', error.message),
      {enableHighAccuracy: true},
    );
  };

  componentDidMount() {
    this.requestLocationPermission().then(r => console.log('req loc res', r));
    this.getConditions();
    //console.log('hello', this.state);
  }
  render() {
    return (
      <MapView
        style={styles.map}
        ref={ref => (this.mapRef = ref)}
        followsUserLocation={true}
        minZoomLevel={14}
        showsUserLocation={true}
        onRegionChangeComplete={this.handelRegionChange}
        provider={PROVIDER_GOOGLE}
        region={this.state.initialPosition}>
        {this.state.locations.map(item => (
          <Marker
            coordinate={{latitude: item.latitude, longitude: item.longitude}}>
            <Image
              style={{width: 25, height: 25}}
              source={require('./snow.png')}
            />
          </Marker>
        ))}
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  map: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default Map;
