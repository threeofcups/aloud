import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LibraryScreen from '../screens/LibraryScreen';
import SearchScreen from '../screens/SearchScreen';
import RecordScreen from '../screens/RecordScreen';
import SaveRecordingScreen from '../screens/SaveRecordingScreen'

const config = Platform.select({
  web: { headerMode: 'false' },
  // default: {},
  default: { headerMode: "false"}, // this one will get rid of header bar at top of screen
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home`
          : 'md-home'
      }
      
    />
  ),
  tabBarOptions: { showLabel: false }
};

HomeStack.path = '';



const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
  },
  config
);

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'} />
  ),
  tabBarOptions: { showLabel: false }
};

ProfileStack.path = '';

const LibraryStack = createStackNavigator(
  {
    Library: LibraryScreen,
  },
  config
);

LibraryStack.navigationOptions = {
  tabBarLabel: 'Library',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-headset' : 'md-headset'} />
  ),
  tabBarOptions: { showLabel: false }
};

LibraryStack.path = '';

const RecordStack = createStackNavigator(
  {
    Record: RecordScreen,
  },
  config
);

RecordStack.navigationOptions = {
  tabBarLabel: 'Record',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-add-circle' : 'md-add-circle'} />
  ),
  tabBarOptions: { showLabel: false }
};

RecordStack.path = '';

const SearchStack = createStackNavigator(
  {
    Search: SearchScreen,
  },
  config
);

SearchStack.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'} />
  ),
  tabBarOptions: { showLabel: false }
};

SearchStack.path = '';

const tabNavigator = createBottomTabNavigator({
  
  HomeStack,
  SearchStack,
  RecordStack,
  LibraryStack,
  ProfileStack,

 
});

tabNavigator.path = '';

export default tabNavigator;
