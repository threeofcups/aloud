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
  import {Avatar} from 'react-native-elements'

export default function ProfileScreen() {

  return (
      <View>
          <Text>This is the Profile Screen</Text>
          <Avatar
          rounded title ="Dot"
          size="large"
          
          /> 

      </View>
  )
}

ProfileScreen.navigationOptions = {
  title: 'Profile',
};