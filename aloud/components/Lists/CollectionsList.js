import React, { useState, useEffect } from 'react';
import CollectionsListItem from '../ListItems/CollectionsListItem';
import { Ionicons } from '@expo/vector-icons';
import collData from '../../src/sampleCollData';
import CollectionScreen from '../../screens/CollectionScreen'
import Colors from '../../constants/Colors';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button
} from 'react-native';
import { ListItem, Card } from 'react-native-elements';
import { TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import AddCollection from '../AddCollection';

export default function CollectionsList({ collections }) {
  const [listCollections, setCollections] = useState([]);
  const [listOrCollection, toggleListOrCollection] = useState('list')
  const [collectionData, setCollectionData] = useState({})
  useEffect(() => {
    setCollections(collections || collData);
  }, [collections]);


  if(listOrCollection === 'list'){
    return(
      <View>
        {/* <Text>     Collections</Text> */}
       
      <FlatList
      horizontal
      data={listCollections}
      renderItem={({ item: rowData }) => {
        setCollectionData(rowData)
        return (
          
       
                <CollectionsListItem listOrCollection={listOrCollection} collection={rowData} toggleListOrCollection={toggleListOrCollection}/>
        
        )
        }}
        keyExtractor={(item, index) => `${index}`}
        />
       
    </View>

    )
  } else {
    return <CollectionScreen  toggleListOrCollection={toggleListOrCollection} collection={collectionData}/>
  }
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