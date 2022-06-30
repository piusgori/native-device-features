import { View, Text, Alert, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker'
import { Colors } from '../../constants/colors';
import OutlinedButton from '../UI/OutlinedButton';

const ImagePicker = ({ onTakeImage }) => {
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();
    const [pickedImage, setPickedImage] = useState();

    const verifyPermissions = async () => {
        if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED){
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
        if(cameraPermissionInformation.status === PermissionStatus.DENIED){
            Alert.alert('Insufficient Permissions', 'You need to grant camera permissions to use this app');
            return false;
        }
        return true;
    }

    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions();
        if(!hasPermission){
            return;
        }
        const image = await launchCameraAsync({ allowsEditing: true, aspect: [16, 9], quality: 0.5 });
        setPickedImage(image.uri);
        onTakeImage(image.uri);
    }

    let imagePreview = <Text>No Image taken yet.</Text>;
    if(pickedImage){
        imagePreview = <Image style={styles.image} source={{uri: pickedImage}}></Image>       
    }

  return (
    <View>
        <View style={styles.imagePreview}>
            {imagePreview}
        </View>
        <OutlinedButton icon='camera' onPress={takeImageHandler}>Take Image</OutlinedButton>
    </View>
  )
}

export default ImagePicker;

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: '100%',
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
        overflow: 'hidden'
    }
})