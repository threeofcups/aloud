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
    'collTitles': collData[0].title
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
    {/* <ScrollView>{this.state['collTitles']}</ScrollView> */}
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
