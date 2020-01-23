import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SearchScreen() {

  return (
  <View>
    <Text>This is the Search screen</Text>
  </View>);
}

SearchScreen.navigationOptions = {
  title: 'Search',
};