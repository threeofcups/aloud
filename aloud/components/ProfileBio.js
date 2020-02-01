import React from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Card
  } from 'react-native';
  import proData  from '../src/sampleProData';
  import collData  from '../src/sampleCollData';
  import recData  from '../src/sampleRecData';
  import {Avatar} from 'react-native-elements'
  import { ListItem, Button, Icon } from 'react-native-elements';

export default function ProfileBio(bio) {

  state = { 
    'proBio': proData[1].bio,
     partialBio: proData[1].bio.slice(50) 
  };
  
    return (
      <View style={styles.container}>
          <Card 
             rightIcon={{ name: 'more-horiz'}}>
            <Text>{this.state.partialBio}</Text>
          </Card>
       
       
        <Text>Bio: {this.state['proBio']}</Text>
      </View>
    );
  }

  ProfileBio.navigationOptions = {
    title: 'ProfileBio',
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
