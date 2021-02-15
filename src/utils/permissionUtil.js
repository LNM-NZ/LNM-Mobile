import { PermissionsAndroid, Platform } from 'react-native'

export default {
    async requestPermission() {
        // android
        if(Platform.OS === 'android'){
            try {
                const granted = await PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
                return granted === PermissionsAndroid.RESULTS.GRANTED;
                  
              } catch (err) {
                console.warn(err);
                return false;
              }
            }
            return false;
        }
          
}