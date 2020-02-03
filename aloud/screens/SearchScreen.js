import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ExpoConfigView } from '@expo/samples';
import CollectionsList from '../components/Lists/CollectionsList';
import RecordingsList from '../components/Lists/RecordingsList';
import RecordingsListItem from '../components/ListItems/RecordingsListItem';
import {Image,Platform,ScrollView,StyleSheet,Text,TextInput,TouchableOpacity,View,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import SearchStack from '../navigation/SearchNavigator';

export default function SearchScreen() {
  const [searchTerm, onChangeText] = React.useState('search...');
  // const [collections, setCollections] = React.useState([]);
  const [recordings, setRecordings] = React.useState([]);
  const [defaultRecordings, setDefaultRecordings] = React.useState([]);
  const [collections, setDefaultCollections] = React.useState([]);

  useEffect(() => {
    const fetchContent = async () => {
      await axios.get('https://aloud-server.appspot.com/home/1')
        .then(response => {
          setDefaultCollections(response.data[0].collections);
          setDefaultRecordings(response.data[0].recordings);
        })
        .catch(err => console.log('there was an axios err', err))
    };

    fetchContent();
  }, []);

  const handleSubmit = (() => {
    console.log('hit submit', searchTerm);
    const fetchContent = async () => {
      await axios.post(`http://aloud-server.appspot.com/query/${searchTerm}`)
        .then(response => {
          setRecordings(response.data);
        })
        .catch(err => console.log('there was an axios err', err))
    };

    fetchContent();
  });

  if (!recordings.length) {
    return (
    <ScrollView>
      <SearchBar
        lightTheme
        round
        platform="android"
        searchIcon={{ size: 20, color: 'red' }}
        clearIcon={{ size: 20, color: '#eac2cd' }}
        inputStyle={{ fontStyle: "italic", fontSize: 16 }}
        onSubmitEditing={handleSubmit}
        onChangeText={text => onChangeText(text)}
        value={searchTerm}
      />
      <View>
        <RecordingsList recordings={defaultRecordings} />
      </View>
    </ScrollView>
    )
  }

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
        onChangeText={text => {
          onChangeText(text)
          handleSubmit()
        }}
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
