import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {View, Text} from 'react-native'
import CollectionsList from '../components/Lists/CollectionsList'

export default function CollectionsSearchScreen() {
  
return (
    <View>
        <Text>CollectionsSearchScreen</Text>
        <CollectionsList/>
    </View>
)
}

CollectionsSearchScreen.navigationOptions = {
  title: 'app.json',
};