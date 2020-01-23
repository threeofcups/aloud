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

export default function RecordScreen() {

  return (
    <View>
      <Text>This is the Recording Component</Text>
    </View>
  );
}

RecordScreen.navigationOptions = {
  title: 'Record',
};