import React, { useCallback, useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { Colors } from '../../constants/colors';
import { Place } from '../../models/place';
import Button from '../UI/Button';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';

const PlaceForm = ({ onCreatePlace }) => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [pickedLocation, setPickecLocation] = useState();
  const [selectedImage, setSelectedImage] = useState()

  const changeTitleHandler = (enteredText) => {
    setEnteredTitle(enteredText);
  }

  const takeImageHandler = (imageUri) => {
    setSelectedImage(imageUri)
  }

  const pickLocationHandler = useCallback((location) => {
    setPickecLocation(location)
  }, [])

  const savePlaceHandler = () => {
    const placeData = new Place(enteredTitle, selectedImage, pickedLocation);
    onCreatePlace(placeData);
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} onChangeText={changeTitleHandler} value={enteredTitle}></TextInput>
      </View>
      <ImagePicker onTakeImage={takeImageHandler}></ImagePicker>
      <LocationPicker onPickLocation={pickLocationHandler}></LocationPicker>
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  )
}

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.primary500
  },
})