import React, { useState } from 'react';
import { ExpoConfigView } from '@expo/samples';
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

export default function SearchScreen() {
  const [value, onChangeText] = React.useState('search here');

  return (
  <ScrollView>
    <Text>search bar</Text>
      <TextInput
        style={{ height: 40, borderColor: 'black', borderWidth: 0.5 }}
        onChangeText={text => onChangeText(text)}
        value={value}
      />
  </ScrollView>
  );
}

SearchScreen.navigationOptions = {
  title: 'Search',
};
