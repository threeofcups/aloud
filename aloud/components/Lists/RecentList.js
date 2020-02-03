import React, { useState, useEffect } from 'react';
import CollectionsListItem from '../ListItems/CollectionsListItem';
import collData from '../../src/sampleCollData';
import RecentListItem from '../ListItems/RecentListItem';
import Colors from '../../constants/Colors';
import {
  StyleSheet,
  View,
  FlatList
} from 'react-native';

export default function RecentList({ recentlySaved }) {
  const [collections, setCollections] = useState(recentlySaved)
  const [collectionData, setCollectionData] = useState({})

  useEffect(() => {
    setCollections(recentlySaved);
  }, [recentlySaved]);


  return (
    <View>
      <FlatList
        horizontal
        data={collections}
        renderItem={({ item: rowData }) => {
          setCollectionData(rowData)
          return (
            <RecentListItem collection={rowData}/>
          )
        }}
        keyExtractor={(item, index) => `${index}`}
      />

    </View>
  )
}