import React, {useState} from 'react';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';
import { View, StyleSheet, Image, Text } from 'react-native';
import { ListItem, Card } from 'react-native-elements';
import { TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import CollectionsScreen from '../../screens/CollectionScreen'

export default function CollectionsListItem({ collection, listOrCollection, toggleListOrCollection }) {
  // const [listOrCollection, toggleListOrCollection] = useState('list')


if(listOrCollection === 'list'){
  return(

  <TouchableWithoutFeedback onPress={()=> {toggleListOrCollection('collection')}}>

    <Card
    containerStyle={{ padding: 0, width: 160 }}
    image={{ uri: collection.url_image } }
    title={collection.title} 
    subtitle={collection.username}
    />
  </TouchableWithoutFeedback>
  )
} else {
  return (
    <CollectionsScreen collection={collection}/>
 
  )
}
  

   
}