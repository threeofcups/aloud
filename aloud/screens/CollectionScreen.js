import React, {useState, useEffect} from 'react';
import { ExpoConfigView } from '@expo/samples';
import axios from 'axios';
import CollectionsList from '../components/Lists/CollectionsList';
import RecordingsList from '../components/Lists/RecordingsList';
import { Text, div, Platform, TextInput, StatusBar, StyleSheet, Button, ScrollView, View, Image } from 'react-native';
import RecordingsListItem from '../components/ListItems/RecordingsListItem'
import {Card} from 'react-native-elements'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
export default function CollectionScreen({collection, toggleListOrCollection}) {
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
    console.log('GOOOOO',collection)
    setCollectionRecordings(collection.recordings)
}, []);

return (
<View>
      <View  >
      {/* <Button onPress={()=>toggleListOrCollection('list')} title="Upload from Device" color='#f90909'/> */}
      <TouchableWithoutFeedback onPress={()=>toggleListOrCollection('list')}>

      <Card
    
    containerStyle={{ padding: 0, width: 300 }}
    image={{ uri: collection.url_image } }
    title={collection.title} 
    subtitle={collection.name_display}
    >
    </Card>
    </TouchableWithoutFeedback>
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