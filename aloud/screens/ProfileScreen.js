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
  import proData  from '../src/sampleProData';
  import collData  from '../src/sampleCollData';
  import recData  from '../src/sampleRecData';
  import {Avatar} from 'react-native-elements'

export default function ProfileScreen() {

  state = {
    'proInfo': proData[0].username,
    'proName': proData[0].name_display,
    'proPic': proData[0].url_image,
    'proBio': proData[0].bio,
    'collImg': collData[0].url_image,
    'recTitle': recData[0].title,
    'recDescription': recData[0].description,
    'recContent': recData[0].url_recording
  };
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>aloud</Text>
    <Text style={styles.instructions}>{this.state['proInfo']}'s Profile</Text>
        <Text>@{this.state['proName']}</Text>
        <Avatar
        rounded title ="Dot"
        size="large"
        source={{uri: this.state['proPic']}}
        />
        <Text>Bio: {this.state['proBio']}</Text>
        <Text> {this.state.proInfo}'s Collections</Text> 
      <Image
      source={{uri: this.state.collImg, width: 64, height: 64}} />
     <Text> {this.state.proInfo}'s Sounds</Text>
     <ScrollView>
      <Text>{this.state.recTitle}</Text>
      <Text>{this.state.recDescription} </Text>
      <View
      source={{uri: this.state.recContent, width: 64, height: 64}} />
      </ScrollView>
        {/* <Text style={styles.instructions}>{instructions}</Text> */}
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
