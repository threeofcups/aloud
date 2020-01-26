import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from '../screens/HomeScreen';
import SoundsSearchScreen from '../screens/SoundsSearchScreen';
import CollectionsSearchScreen from '../screens/CollectionsSearchScreen';
import SearchScreen from '../screens/SearchScreen';
import ArtistSearchScreen from '../screens/ArtistSearchScreen';


const config = Platform.select({
  web: { headerMode: 'false' },
//   default: {},
  default: { headerMode: "false"}, // this one will get rid of header bar at top of screen
});
const SearchStack = createStackNavigator({
    Sounds: {
      screen: SoundsSearchScreen,
      navigationOptions: {
        tabBarLabel: 'Sounds',
      },
    },
    Artists: {
      screen: ArtistSearchScreen,
      navigationOptions: {
        tabBarLabel: 'Artists',
      },
    },
    Collections: {
        screen: CollectionsSearchScreen,
        navigationOptions: {
          tabBarLabel: 'Collections',
        },
      },
   
  })

  



export default SearchStack;
