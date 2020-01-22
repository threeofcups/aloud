import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { Text, Platform, TextInput, StatusBar, StyleSheet, View } from 'react-native';
import RecordingsListItem from '../components/ListItems/RecordingsListItem'

export default function LibraryScreen() {
   const [value, onChangeText] = React.useState('Search term')
  return (
<View>
  {/* // Todo <Icon> magnifying glass</Icon> */}
  <TextInput
  style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
  onChangeText={text => onChangeText(text)}
  value={value}/>
  <RecordingsListItem/>

</View>
  );
}

LibraryScreen.navigationOptions = {
  title: 'Library',
};