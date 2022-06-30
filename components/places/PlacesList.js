import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PlaceItem from './PlaceItem'
import { Colors } from '../../constants/colors'
import { useNavigation } from '@react-navigation/native'

const PlacesList = ({ places }) => {
    const navigation = useNavigation();

    const selectPlaceHandler = (id) => { navigation.navigate('PlaceDetails', { placeId: id }) }

    const rendering = ({ item }) => (<PlaceItem onSelect={selectPlaceHandler} place={item}></PlaceItem>)

    if(!places || places.length === 0){
        return (
            <View style={styles.fallBackContainer}>
                <Text style={styles.fallbackText}>No places added yet - start adding some</Text>
            </View>
        )
    }

  return (
    <FlatList
        data={places}
        keyExtractor={(item) => item.id}
        renderItem={rendering}
        style={styles.listStyle}
    ></FlatList>
  )
}

export default PlacesList;

const styles = StyleSheet.create({
    fallBackContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fallbackText: {
        fontSize: 16,
        color: Colors.primary200,
    },
    listStyle: {
        margin: 24
    }
})