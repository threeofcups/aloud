import React, {useState, useEffect} from 'react';
import { ExpoConfigView } from '@expo/samples';
import axios from 'axios';
import CollectionsList from '../components/Lists/CollectionsList';
import RecordingsList from '../components/Lists/RecordingsList';
import { Text, Platform, TextInput, StatusBar, StyleSheet, ScrollView, View } from 'react-native';
import RecordingsListItem from '../components/ListItems/RecordingsListItem'

export default function LibraryScreen() {
// const [value, onChangeText] = React.useState('Search term')
const [collections, setLibraryCollections] = useState([]);
const [recordings, setLibraryRecordings] = useState([]);

useEffect(() => {
    const fetchContent = async () => {
      await axios.get(`https://aloud-server.appspot.com/library/björk/1`)
        .then(response => {
          setLibraryCollections(response.data[0].collections);
          setLibraryRecordings(response.data[0].recordings);
        })
        .catch(err => console.error(err));
    };

    fetchContent()
}, []);

return (
<View>
  <ScrollView>
      <View>
        <CollectionsList collections={collections} />
        <RecordingsList recordings={recordings} />
      </View>
  </ScrollView>
</View>
  );
}

LibraryScreen.navigationOptions = {
  title: 'Library',
};