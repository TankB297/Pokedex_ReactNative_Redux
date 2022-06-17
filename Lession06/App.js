import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListItem from './Components/ListItem';
import DetailItem from './Components/DetailItem';
import ListFavouriteItem from './Components/ListFavouriteItem';
import {store} from './Redux/store';
import {Provider} from 'react-redux';
import Profile from './Components/Profile';
import AnimationItem from './Components/AnimationItem';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ListItem"
            component={ListItem}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DetailItem"
            component={DetailItem}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ListFavoriteItem"
            component={ListFavouriteItem}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name="AnimationItem"
            component={AnimationItem}
            options={{headerShown: true}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
