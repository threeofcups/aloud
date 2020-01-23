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
      <Image
      style={{width: 300, height: 300}}
      source={{uri: 'http://res.cloudinary.com/dahfjsacf/image/upload/v1579754358/ufr126rb6909oc8skkxa.png'}} />
    </View>
  );
}

RecordScreen.navigationOptions = {
  title: 'Record',
};