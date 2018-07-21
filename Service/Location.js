import {Permissions, Location} from 'expo';

const getLocation = getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      return await Location.getCurrentPositionAsync({enableHighAccuracy: true});
    } else {
      this.alertIfRemoteNotificationsDisabledAsync();
      throw new Error('Location permission not granted');
    }
  }

  const UserLocation = {
      getLocation,
  }

  export default UserLocation;