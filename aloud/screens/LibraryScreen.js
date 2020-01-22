import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

export default function LibraryScreen() {

  return (
<View>
  <Text> This is the Library Screen</Text>
   {/* search input */}
   {/* <ScrollView>
   artists sounds collection tabs
   ArtistListItem Component
   SoundsListItem Component
   CollectionsListItem Component */}

</View>
  );
}

LibraryScreen.navigationOptions = {
  title: 'Library',
};