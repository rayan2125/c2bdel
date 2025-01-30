import { PermissionsAndroid, Platform, ToastAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { addLocation } from '../../redux/Reducers/locationReducers';

export const  requestLocationPermission = async () => {
  
  try {
    let result;
    if (Platform.OS === 'ios') {
      result = await Geolocation.requestAuthorization("whenInUse");
      
    } else {
      result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      
    }

    if (result === "granted" || result === PermissionsAndroid.RESULTS.GRANTED) {
      
        Geolocation.getCurrentPosition(
          (position) => {

            // dispatch(addLocation(position))
            
          },
          (error) => {
        
            ToastAndroid.show('Error getting location: ' + error.message, ToastAndroid.LONG);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      
    } else {
      ToastAndroid.show('Location permission denied', ToastAndroid.LONG);
      return null;
    }
  } catch (error) {
    ToastAndroid.show('Error requesting location permission: ' + error.message, ToastAndroid.LONG);
    return null;
  }
};

export const watchPosition = (dispatch, loc) => {
  Geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      dispatch(loc({ latitude, longitude }));
    },
    (error) => {
      ToastAndroid.show('Error getting location: ' + error.message, ToastAndroid.LONG);
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );
};

