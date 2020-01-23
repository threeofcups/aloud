import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import CollectionsList from '../components/Lists/CollectionsList';
import RecordingsList from '../components/Lists/RecordingsList';
import { Text, Platform, TextInput, StatusBar, StyleSheet, ScrollView, View } from 'react-native';
import RecordingsListItem from '../components/ListItems/RecordingsListItem'

export default function LibraryScreen() {
   const [value, onChangeText] = React.useState('Search term')
  return (
<View>
  <ScrollView>
      <CollectionsList />
      <RecordingsList />
  </ScrollView>
</View>
  );
}

LibraryScreen.navigationOptions = {
  title: 'Library',
};