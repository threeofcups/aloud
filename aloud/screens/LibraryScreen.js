import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { Text, Platform, TextInput, StatusBar, StyleSheet, View } from 'react-native';

export default function LibraryScreen() {
   const [value, onChangeText] = React.useState('type')
  return (
<View>
  {/* <Icon> magnifying glass</Icon> */}
  <Text>Search</Text>
  <TextInput
  style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
  onChangeText={text => onChangeText(text)}
  value={value}/>
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