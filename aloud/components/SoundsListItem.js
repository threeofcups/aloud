// avatar, sound name, artist name, length, more
import React from 'react';
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
import Colors from '../constants/Colors';
import { ListItem } from 'react-native-elements';
import proData from '../src/sampleProData';
import recData from '../src/sampleRecData';
import collData from '../src/sampleCollData';


export default function SoundsListItem(props, record) {
  
  state = {
    'proInfo': proData[0].username,
    'proName': proData[0].name_display,
    'proPic': proData[0].url_image,
    'proBio': proData[0].bio,
    'collImg': collData[0].url_image,
    'recTitle': record[0].title,
    'recDescription': record[0].description,
    'recContent': record[0].url_recording
  };
  return (
    <ListItem
        size="large"
    leftAvatar={{
      source: { 
        uri: this.state['proPic'] 
      }
    //   showEditButton: true,
    }}
    title={this.state['proInfo']}
    subtitle={'@' + this.state['proName']}
    chevron
  />
  );
}