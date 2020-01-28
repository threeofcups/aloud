import React, {useState, useEffect} from 'react';
import { ExpoConfigView } from '@expo/samples';
import axios from 'axios';
import CollectionsList from '../components/Lists/CollectionsList';
import RecordingsList from '../components/Lists/RecordingsList';
import { Text, Platform, TextInput, StatusBar, StyleSheet, ScrollView, View, Image } from 'react-native';
import RecordingsListItem from '../components/ListItems/RecordingsListItem'

export default function CollectionScreen(collection) {
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
}, []);

return (
<View>
      <View>
          <Image/>
          <Text>Title</Text>
          <Text>Owner</Text>
          <Text>Description</Text>
          {/* //todo expand icon */}
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