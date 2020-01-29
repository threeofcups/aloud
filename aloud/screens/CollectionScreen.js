import React, {useState, useEffect} from 'react';
import { ExpoConfigView } from '@expo/samples';
import axios from 'axios';
import CollectionsList from '../components/Lists/CollectionsList';
import RecordingsList from '../components/Lists/RecordingsList';
import { Text, div, Platform, TextInput, StatusBar, StyleSheet, ScrollView, View, Image } from 'react-native';
import RecordingsListItem from '../components/ListItems/RecordingsListItem'
import {Card} from 'react-native-elements'
export default function CollectionScreen({collection}) {
// const [value, onChangeText] = React.useState('Search term');
const [recordings, setCollectionRecordings] = useState([]);

useEffect(() => {
    // const fetchContent = async () => {
    //     // todo get recordings from collection
    //   await axios.get(`/collection/${collectionId}`)
    //   //todo access to collection id
    //     .then(response => {
    //       setLibraryRecordings(response.data[0].recordings);
    //     })
    //     .catch(err => console.error(err));
    // };

    // fetchContent()
    setCollectionRecordings(collection.collection)
}, []);
console.log(collection)
return (
<View>
      <View>
      <Card
    containerStyle={{ padding: 0, width: 300 }}
    image={{ uri: collection.url_image } }
    title={collection.title} 
    subtitle={collection.name_display}
    >
   

    </Card>
          {/* <Text>{collection.description}</Text> */}
      </View>
  <ScrollView>
      <View>
        <RecordingsList recordings={recordings} />
      </View>
  </ScrollView>
</View>
  );
}

CollectionScreen.navigationOptions = {
  title: 'Collection',
};