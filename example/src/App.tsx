import * as React from 'react';

import { StyleSheet, View, Text,NativeModules, NativeEventEmitter } from 'react-native';
import MyLibraryEvent from './MyLibraryEvent';


const locationEmitter = new NativeEventEmitter(NativeModules.MyLibrary);

const lib = new MyLibraryEvent();

export default function App() {
  const [latitude, setLatitude] = React.useState<number | undefined>();
  const [longitude, setLongitude] = React.useState<number | undefined>();


  React.useEffect(() => {
    locationEmitter.addListener('onLocationChange', (result) => {
      const res = result[1]
      const data = res.split(',');
      const lat = data[0];
      const lon = data[1];
      setLongitude(lon);
      setLatitude(lat);
    });
  });

  React.useEffect(() => {
    console.log(lib);
    lib.postEvent('');
    console.log(lib);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Latitude: {latitude}</Text>
      <Text>Longitude: {longitude}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
