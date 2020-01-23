import React, { useState } from 'react';
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
import { ScrollView } from 'react-native-gesture-handler';
import { ListItem, Card } from 'react-native-elements';

export default function CollectionsList(props) {
  const [collections, setCollections] = useState(collData);

  return (
    <View>
      <FlatList
      horizontal
        data={collections}
        renderItem={({ item: rowData }) => {
          return (
  
            <CollectionsListItem collection={rowData}/>
          );
        }}
        keyExtractor={(item, index) => index}
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