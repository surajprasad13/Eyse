import {PermissionsAndroid} from 'react-native';

export async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Search Module',
        message: 'Search Module wants to access to your location ',
        buttonNeutral: 'Ask me later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    } else {
      alert('Location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

export async function requestAudioPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: 'Search Module',
        message: 'Search Module wants to access to your location ',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    } else {
      alert('audio permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}
