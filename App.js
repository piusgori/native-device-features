import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import IconButton from './components/UI/IconButton';
import { Colors } from './constants/colors';
import Map from './screens/Map';
import { useEffect, useState } from 'react';
import { init } from './utils/database';
import AppLoading from 'expo-app-loading';
import PlaceDetails from './screens/PlaceDetails';

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    init().then(() => {
      setDbInitialized(true)
    }).catch((err) => {
      console.log(err);
    })
  }, []);

  if (!dbInitialized){
    return <AppLoading></AppLoading>
  }

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 }
          }}
        >
          <Stack.Screen
            name='AllPlaces'
            component={AllPlaces}
            options={({ navigation }) => ({
              title: 'Your Favorite Places',
              headerRight: ({ tintColor }) => <IconButton onPress={() => {navigation.navigate('AddPlace')}} icon='add' color={tintColor} size={24}></IconButton>
            })}
          ></Stack.Screen>
          <Stack.Screen
            name='AddPlace'
            component={AddPlace}
            options={{
              title: 'Add a new Place',
            }}
          ></Stack.Screen>
          <Stack.Screen
            name='Map'
            component={Map}
          ></Stack.Screen>
          <Stack.Screen
            name='PlaceDetails'
            component={PlaceDetails}
            options={{
              title: 'Loading place...'
            }}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

