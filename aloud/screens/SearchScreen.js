import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ExpoConfigView } from '@expo/samples';
import CollectionsList from '../components/Lists/CollectionsList';
import RecordingsList from '../components/Lists/RecordingsList';
import RecordingsListItem from '../components/ListItems/RecordingsListItem';
import CollectionsListItem from '../components/ListItems/CollectionsListItem';
import {
  Image, FlatList, Platform, RefreshControl, ScrollView, StyleSheet, TextInput, TouchableOpacity, View,
} from 'react-native';
import {SearchBar, Text} from 'react-native-elements';
import SearchStack from '../navigation/SearchNavigator';

export default function SearchScreen() {
  const [searchTerm, onChangeText] = React.useState(' ');
  const [preSearch, setPreSearch] = useState(true);
  const [recordings, setRecordings] = React.useState([]);
  const [noMatch, setNoMatch] = React.useState(false);
  const [defaultRecordings, setDefaultRecordings] = React.useState([]);
  const [defaultCollections, setDefaultCollections] = React.useState([]);
  const [collections, setCollections] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchContent();
    onChangeText('');
    setNoMatch(false);
    setPreSearch(true);
    setRecordings([]);
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);


  const fetchContent = async () => {
    await axios.get('https://aloud-server.appspot.com/home/1')
      .then(response => {
        setDefaultCollections(response.data[0].collections);
        setDefaultRecordings(response.data[0].recordings);
      })
      .catch(err => console.log('there was an axios err', err))
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleSubmit = (() => {
    const fetchContent = async () => {
      await axios.post(`http://aloud-server.appspot.com/query/${searchTerm}`)
        .then(response => {
          if (!response.data[0].recordingMatches.length && !response.data[0].collectionMatches.length) {
            setNoMatch(true);
            setPreSearch(false);
          } else {
          setRecordings(response.data[0].recordingMatches);
          setCollections(response.data[0].collectionMatches);
          setNoMatch(false);
          setPreSearch(false);
          }
        })
        .catch(err => console.log('there was an axios err', err))
    };

    fetchContent();
  });

  if (noMatch) {
    return (
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <SearchBar
          lightTheme
          round
          platform="android"
          searchIcon={{ size: 20, color: 'red' }}
          clearIcon={{ size: 20, color: '#eac2cd' }}
          inputStyle={{ fontStyle: "italic", fontSize: 16 }}
          onSubmitEditing={handleSubmit}
          onChangeText={text => {
            onChangeText(text)
            setNoMatch(false);
          }}
          value={searchTerm}
        />
        <Text style={{marginLeft: 22, marginBottom: 10, color: 'red'}}>no results, try again!</Text> 
        <View>
          <CollectionsList collections={defaultCollections} />
          <RecordingsList recordings={defaultRecordings} />
        </View>
      </ScrollView>
    )
  };

  if (preSearch) {
    return (
    <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <SearchBar
        lightTheme
        round
        platform="android"
        searchIcon={{ size: 20, color: 'red' }}
        clearIcon={{ size: 20, color: '#eac2cd' }}
        inputStyle={{ fontStyle: "italic", fontSize: 16 }}
        onSubmitEditing={handleSubmit}
        value={searchTerm}
        onChangeText={(text) => {
            onChangeText(text)
            setNoMatch(false);
        }}
      />
      <View>
        <CollectionsList collections={defaultCollections} />
        <RecordingsList recordings={defaultRecordings} />
      </View>
    </ScrollView>
    )
  }

  return (
  <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
  >
      <SearchBar
        lightTheme
        round
        platform="android"
        searchIcon={{ size: 20, color: 'red' }}
        clearIcon={{ size: 20, color: '#eac2cd' }}
        inputStyle={{ fontStyle: "italic", fontSize: 16}}
        onSubmitEditing={handleSubmit}
        value={searchTerm}
        onChangeText={(text) => {
          onChangeText(text)
        }}
      />
      <View>
      <View> 
        <FlatList
          horizontal
          data={collections}
          renderItem={({ item: rowData }) => {
            return <CollectionsListItem collection={rowData.item} />
          }}
        />
      </View>
      <View>
      {recordings.map((recording) => {
        return <RecordingsListItem recording={recording.item} />
      })}
      </View>
      </View>
  </ScrollView>
  );
}

SearchScreen.navigationOptions = {
  title: 'Search',
};
