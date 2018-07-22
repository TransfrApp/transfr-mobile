import React, { Component } from 'react';
import UserLocation from '../Service/Location.js';
import ResterauntAPI from '../Service/YelpAPI.js';
import { MapView } from 'expo';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator
} from 'react-native';

class SettingsScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      location: null,
    }
  }
  static navigationOptions = {
    title: 'Explore',
  };

  componentDidMount(){
    this.getUsersLocation();
  }

  componentDidUpdate(){
    console.log("State", this.state);
  }
  alertIfRemoteNotificationsDisabledAsync = async () => {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
      alert('Hey! You might want to enable notifications for my app, they are good.');
    }
  }

  getUsersLocation = async () => {
    const location =  await UserLocation.getLocation();
    console.log(JSON.stringify(location, null, 2));
    this.setState({location});
  }

  _handleRegionChange(region){
    this.setState({location: region});
  }

  findResteraunts = async() => {
    const lat = this.state.location.coords.latitude;
    const long = this.state.location.coords.longitude;
    const resteraunts = await ResterauntAPI.findResteraunts(lat, long);
    await console.log('Resteraunts', resteraunts);
    await this.renderMarkers(resteraunts);
  }

  renderMarkers = (resteraunts) => {
    if(resteraunts === undefined) return;
    resteraunts.map(marker => {
      let latlong = {
        latitude: marker.restaurant.location.latitude, 
        longitude: marker.restaurant.location.latitude
      }
      return(
        <Marker
          coordinate={latlong}
          title={marker.restaurant.name}
        />
      )
    })
  }


  render() {
    if(this.state.location !== null){
      return(
        <MapView
          style={{ flex: 1 }}
          showUserLocation={true}
          followsUserLocation={true}
          initialRegion={{
            latitude: this.state.location.coords.latitude,
            longitude: this.state.location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          </MapView>
      )
    } else {
      return(
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#00ff00"/>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
}
})

export default SettingsScreen;