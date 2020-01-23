import React from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  import proData  from '../src/sampleProData';
  import collData  from '../src/sampleCollData';
  import recData  from '../src/sampleRecData';
  import {Avatar} from 'react-native-elements'

export default function ProfileScreen() {

  state = { 
    'proInfo': proData[1].username,
    'proName': proData[1].name_display,
    'proPic': 'https://res.cloudinary.com/dahfjsacf/image/upload/v1579656042/qc35njypmtfvjt9baaxq.jpg',
    'proBio': proData[1].bio,
  };
  
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>aloud</Text>
    <Text style={styles.instructions}>{this.state['proInfo']}'s Profile</Text>
        <Text>@{this.state['proName']}</Text>
        <Avatar
        rounded title ="Dot"
        size="large"
        source={{uri: this.state.proPic}}
        /> 
        <Text>Bio: {this.state['proBio']}</Text>
      </View>
    );
  }


ProfileScreen.navigationOptions = {
  title: 'Profile',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: 50, height: 50
  }
});
