import React, { useState, useEffect } from 'react';
import CollectionsListItem from '../ListItems/CollectionsListItem';
import { Ionicons } from '@expo/vector-icons';
import collData from '../../src/sampleCollData';

import Colors from '../../constants/Colors';
import {
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';
import { ListItem, Card } from 'react-native-elements';
import { TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default function CollectionsList({ collections }) {
  const [listCollections, setCollections] = useState([]);
  
  useEffect(() => {
    setCollections(collections || collData);
  }, [collections]);

  return (
    <View>
     

      <FlatList
      horizontal
      data={listCollections}
      renderItem={({ item: rowData }) => {
        return (
          <TouchableWithoutFeedback onPress={()=> {console.log('dot')}} >
            <CollectionsListItem  collection={rowData}/>
          </TouchableWithoutFeedback>
          
          
          );
        }}
        keyExtractor={(item, index) => `${index}`}
        />
       
    </View>
  );
}
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     backgroundColor: "#e5e5e5"
//   },
//   headerText: {
//     fontSize: 20,
//     textAlign: "center",
//     margin: 10,
//     fontWeight: "bold"
//   },
// });