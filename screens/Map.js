import React, { useCallback, useLayoutEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import IconButton from '../components/UI/IconButton';

const Map = ({ navigation, route }) => {
  const initialLocation = route.params ? { lat: route.params.initialLat, lng: route.params.initialLng } : null ;
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const region = { latitude: initialLocation ? initialLocation.lat : 37.78, longitude: initialLocation ? initialLocation.lng :  -122.43, latitudeDelta: 0.0922,longitudeDelta: 0.0421 };


  const selectLocationHandler = (event) => {
    if( initialLocation ){
      return;
    }
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({ lat, lng })
  }

  const savePickedLocationHandler = useCallback(() => {
    if(!selectedLocation){
      Alert.alert('No location picked', 'You have to pick a location by tapping on the map first');
      return;
    }
    navigation.navigate('AddPlace', { pickedLat: selectedLocation.lat, pickedLng: selectedLocation.lng })
  }, [navigation, selectedLocation])

  useLayoutEffect(() => {
    if (initialLocation){
      return;
    }
    navigation.setOptions({
      headerRight: ({ tintColor }) => <IconButton onPress={savePickedLocationHandler} color={tintColor} size={24} icon='save'></IconButton>
    })
  }, [navigation, savePickedLocationHandler, initialLocation])

  return (
    <MapView style={styles.map} onPress={selectLocationHandler} initialRegion={region}>
      {selectedLocation && <Marker title='Picked Location' coordinate={{ latitude: selectedLocation.lat, longitude: selectedLocation.lng }}></Marker>}
    </MapView>
  )
}

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1
  }
})