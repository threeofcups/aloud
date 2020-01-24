import React, { useState } from 'react';
import { ExpoConfigView } from '@expo/samples';
import CollectionsList from '../components/Lists/CollectionsList';
import RecordingsList from '../components/Lists/RecordingsList';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import SearchStack from '../navigation/SearchNavigator'
export default function SearchScreen() {
  const [value, onChangeText] = React.useState('search here');

  return (
  <ScrollView>
    {/* <Text>search bar</Text> */}
    {/* <SearchStack/> */}
      <TextInput
        style={{ height: 40, borderColor: 'black', borderWidth: 0.5, margin: 10 }}
        onChangeText={text => onChangeText(text)}
        value={value}
      />
      <CollectionsList />
      <RecordingsList />
  </ScrollView>
  );
}

SearchScreen.navigationOptions = {
  title: 'Search',
};
