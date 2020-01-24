import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { Ionicons } from '@expo/vector-icons';
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
    <View allignItems={'center'}>

      <Ionicons name={'md-mic'}
      size={300}
      onPress={()=>{console.log('dot')}}
      />
      
    </View>
  );
}

RecordScreen.navigationOptions = {
  title: 'Record',
};