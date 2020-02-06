import React, {useState, useEffect} from 'react';
import { ExpoConfigView } from '@expo/samples';
import axios from 'axios';
import CollectionsList from '../components/Lists/CollectionsList';
import RecordingsList from '../components/Lists/RecordingsList';
import { Text, Platform, TextInput, StatusBar, StyleSheet, ScrollView, View, RefreshControl } from 'react-native';
import RecordingsListItem from '../components/ListItems/RecordingsListItem'

export default function LibraryScreen() {
// const [value, onChangeText] = React.useState('Search term')
const [collections, setLibraryCollections] = useState([]);
const [recordings, setLibraryRecordings] = useState([]);
const [refreshing, setRefreshing] = React.useState(false);

function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchContent();
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

const fetchContent = async () => {
    await axios.get(`https://aloud-server.appspot.com/library/bjork/1`)
      .then(response => {
        setLibraryCollections(response.data[0].collections);
        setLibraryRecordings(response.data[0].recordings);
      })
      .catch(err => console.error(err));
  };

useEffect(() => {
    fetchContent()
}, []);

return (
<View>
  <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
  >
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