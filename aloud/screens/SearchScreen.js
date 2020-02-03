import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ExpoConfigView } from '@expo/samples';
import CollectionsList from '../components/Lists/CollectionsList';
import RecordingsListItem from '../components/ListItems/RecordingsListItem';
import {Image,Platform,ScrollView,StyleSheet,Text,TextInput,TouchableOpacity,View,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import SearchStack from '../navigation/SearchNavigator';

export default function SearchScreen() {
  const [searchTerm, onChangeText] = React.useState('search...');
  // const [collections, setCollections] = React.useState([]);
  const [recordings, setRecordings] = React.useState([]);

  const handleSubmit = (() => {
    console.log('hit submit', searchTerm);
    const fetchContent = async () => {
      await axios.post(`http://aloud-server.appspot.com/query/${searchTerm}`)
        .then(response => {
          console.log(response.data);
          setRecordings(response.data);
        })
        .catch(err => console.log('there was an axios err', err))
    };

    fetchContent();
  });

  return (
  <ScrollView>
      <SearchBar
        lightTheme
        round
        platform="android"
        searchIcon={{ size: 20, color: 'red' }}
        clearIcon={{ size: 20, color: '#eac2cd' }}
        inputStyle={{ fontStyle: "italic", fontSize: 16}}
        onSubmitEditing={handleSubmit}
        onChangeText={text => onChangeText(text)}
        value={searchTerm}
      />
      <View>
      {recordings.map(recording => {
        return <RecordingsListItem recording={recording.item} />
      })}
      </View>
  </ScrollView>
  );
}

SearchScreen.navigationOptions = {
  title: 'Search',
};
