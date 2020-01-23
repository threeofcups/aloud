import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { Text, Platform, TextInput, StatusBar, StyleSheet, View } from 'react-native';
import RecordingsListItem from '../components/ListItems/RecordingsListItem'

export default function LibraryScreen() {
   const [value, onChangeText] = React.useState('Search term')
  return (
<View>
  <Text>library view</Text>
</View>
  );
}

LibraryScreen.navigationOptions = {
  title: 'Library',
};