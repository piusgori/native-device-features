import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import PlacesList from '../components/places/PlacesList';
import { fetchPlaces } from '../utils/database';

const AllPlaces = ({ route }) => {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const loadPlaces = async () => {
      const places = await fetchPlaces();
      setLoadedPlaces(places);
    }
    if(isFocused){
      loadPlaces();
      // setLoadedPlaces(curPlaces => [...curPlaces, route.params.place]);
    }
  }, [isFocused]);

  return (
    <PlacesList places={loadedPlaces}></PlacesList>
  )
}

export default AllPlaces;