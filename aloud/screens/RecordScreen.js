import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
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

  const [recFlash, recFlasher] = useState(null);

  const recCall = function(){
    useEffect(() => {
    return axios.get('https://aloud-server.appspot.com/recording')
    .then(response => {
      recFlasher(response.data)
    })
    .catch(err => console.log('there was an axios err', err))
  });
  }

  return (
    <View allignItems={'center'}>

      <Ionicons name={'md-mic'}
      size={300}
      onPress={()=>{
        return axios.get('https://aloud-server.appspot.com/recording')
    .then(response => {
      console.log(response.data)
      recFlasher(response.data)
    })
    .catch(err => console.log('there was an axios err', err))
      }}
      />
    </View>
  );
}

RecordScreen.navigationOptions = {
  title: 'Record',
};