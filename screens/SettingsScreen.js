import React, { Component } from 'react';
import UserLocation from '../Service/Location.js';
import ResterauntAPI from '../Service/YelpAPI.js';
import { MapView } from 'expo';
import { Marker } from 'react-native-maps';
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
    this.findResteraunts();
  }

  alertIfRemoteNotificationsDisabledAsync = async () => {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
      alert('Hey! You might want to enable notifications for my app, they are good.');
    }
  }

  _handleRegionChange(region){
    this.setState({location: region});
  }

  findResteraunts = async () => {
    const lat = this.props.user.location.coords.latitude;
    const long = this.props.user.location.coords.longitude;
    const list = await ResterauntAPI.findResteraunts(lat, long);
    // Update the store with the list of resteraunts
    this.props.resteraunt.updateResteraunt({
      resterauntNearby: list
    });

    this.props.resteraunt.resterauntNearby.map(x => {
      console.log(x);
    })
  }

  render() {
    if(this.props.user.location !== null && this.props.resteraunt.resterauntNearby !== 0 || undefined){
      return(
        <MapView
          style={{ flex: 1 }}
          showUserLocation={true}
          followsUserLocation={true}
          initialRegion={{
            latitude: this.props.user.location.coords.latitude,
            longitude: this.props.user.location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {this.props.resteraunt.resterauntNearby.map((marker, i) => (
            <Marker
               key={i}
              coordinate={{
                latitude: parseInt(marker.restaurant.location.latitude),
                longitude: parseInt(marker.restaurant.location.longitude)
                }}
              title={marker.restaurant.title}
              description={marker.restaurant.description}
            />
          ))}
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