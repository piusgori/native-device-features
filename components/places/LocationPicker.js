import { StyleSheet, View, Alert, Image, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import OutlinedButton from '../UI/OutlinedButton';
import { Colors } from '../../constants/colors';
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';
import { getAddress, getMapPreview } from '../../utils/location';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';

const LocationPicker = ({ onPickLocation }) => {
    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();
    const [pickedLocation, setPickedLocation] = useState();
    const navigation = useNavigation();
    const route = useRoute();
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused && route.params){
            const mapPickedLocation = { lat: route.params.pickedLat, lng: route.params.pickedLng };
            setPickedLocation(mapPickedLocation);
        }
    }, [route, isFocused]);

    useEffect(() => {
        const handleLocation = async () => {
            if(pickedLocation){
                let address;
                try {
                    address = await getAddress(pickedLocation.lat, pickedLocation.lng);
                } catch (err) { console.log(err) };
                onPickLocation({...pickedLocation, address});
            }
        }
        handleLocation();
    }, [pickedLocation, onPickLocation])

    const verifyPermissions = async () => {
        if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED){
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
        if(locationPermissionInformation.status === PermissionStatus.DENIED){
            Alert.alert('Insufficient Permissions', 'You need to grant location permissions to use this app');
            return false;
        }
        return true;
    }

    const getLocationHandler = async () => {
        const hasPermission = await verifyPermissions();
        if(!hasPermission){
            return;
        }
        const location = await getCurrentPositionAsync();
        setPickedLocation({ lat: location.coords.latitude, lng: location.coords.longitude });
    }

    const pickOnMapHandler = () => {
        navigation.navigate('Map');
    }

    let locationPreview = <Text>No location picked yet</Text>

    if (pickedLocation){
        locationPreview = <Image style={styles.image} source={{uri: getMapPreview(pickedLocation.lat, pickedLocation.lng)}}></Image>
    }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton onPress={getLocationHandler} icon='location'>Locate User</OutlinedButton>
        <OutlinedButton onPress={pickOnMapHandler} icon='map'>Pick on Map</OutlinedButton>
      </View>
    </View>
  )
}

export default LocationPicker;

const styles = StyleSheet.create({
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
        overflow: 'hidden'
    },
})