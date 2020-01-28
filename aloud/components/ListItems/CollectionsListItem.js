import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';
import { View, StyleSheet, Image, Text } from 'react-native';
import { ListItem, Card } from 'react-native-elements';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default function CollectionsListItem({ collection }) {


  return (
  
    <Card
    containerStyle={{ padding: 0, width: 160 }}
    image={{ uri: collection.url_image } }
    title={collection.title} 
    subtitle={collection.username}
    />

   
   
  );
}