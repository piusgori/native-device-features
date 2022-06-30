import React from 'react'
import PlaceForm from '../components/places/PlaceForm';
import { insertPlace } from '../utils/database';

const AddPlace = ({ navigation }) => {
  const createPlaceHandler = (place) => {
    insertPlace(place).then(() => {
      navigation.navigate('AllPlaces');
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <PlaceForm onCreatePlace={createPlaceHandler}></PlaceForm>
  )
}

export default AddPlace;