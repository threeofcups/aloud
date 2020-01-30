import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ExpoConfigView } from '@expo/samples';
import CollectionsList from '../components/Lists/CollectionsList';
import RecordingsList from '../components/Lists/RecordingsList';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import SearchStack from '../navigation/SearchNavigator'
export default function SearchScreen() {
  const [value, onChangeText] = React.useState('search here');
  const [collections, setCollections] = React.useState([]);
  const [recordings, setRecordings] = React.useState([]);

  useEffect(() => {
    const fetchContent = async () => {
      await axios.get('https://aloud-server.appspot.com/home')
        .then(response => {
          setCollections(response.data[0].collections);
          setRecordings(response.data[0].recordings);
        })
        .catch(err => console.log('there was an axios err', err))
    };

    fetchContent();
  }, []);

  return (
  <ScrollView>
    {/* <Text>search bar</Text> */}
    {/* <SearchStack/> */}
      <TextInput
        style={{ height: 40, borderColor: 'black', borderWidth: 0.5, margin: 10 }}
        onChangeText={text => onChangeText(text)}
        value={value}
      />
      <View>
        <CollectionsList collections={collections} />
        <RecordingsList recordings={recordings} />
      </View>
  </ScrollView>
  );
}

SearchScreen.navigationOptions = {
  title: 'Search',
};
