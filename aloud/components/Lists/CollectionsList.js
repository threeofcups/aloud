import React, { useState } from 'react';
import CollectionsListItem from '../ListItems/CollectionsListItem';
import { Ionicons } from '@expo/vector-icons';
import collData from '../../src/sampleCollData';

import Colors from '../../constants/Colors';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function CollectionsList(props) {
  const [collections, setCollections] = useState(collData);

  return (
    <View>
      <ScrollView>
        <Text>{'    '}collections</Text>
        <View>
          {
            collData.map((collection, i) => {
              return <CollectionsListItem key={i} collection={collection} />
            })
          }
        </View>
      </ScrollView>
    </View>
  );
}