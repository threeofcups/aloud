import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';

export default function ProfileScreen() {

  return (
      <View>
          <Text>This is the Profile Screen</Text>
      </View>
  )
}

ProfileScreen.navigationOptions = {
  title: 'Profile',
};