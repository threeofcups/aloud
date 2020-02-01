import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ExpoConfigView } from '@expo/samples';
import CollectionsList from '../components/Lists/CollectionsList';
import RecordingsList from '../components/Lists/RecordingsList';
import {Image,Platform,ScrollView,StyleSheet,Text,TextInput,TouchableOpacity,View, Button,
} from 'react-native';
import SearchStack from '../navigation/SearchNavigator';
import ButtonGroup from 'react-native-elements';
import ArtistSearchScreen from './ArtistSearchScreen';
import SoundsSearchScreen from './SoundsSearchScreen';
import CollectionsSearchScreen from './CollectionsSearchScreen';

export default function SearchScreen() {
  const [value, onChangeText] = useState('search here');
  const [collections, setCollections] = useState([]);
  const [recordings, setRecordings] = useState([]);
  const [view, setView] = useState('artists')

  useEffect(() => {
    const fetchContent = async () => {
      await axios.get('https://aloud-server.appspot.com/home/1')
        .then(response => {
          setCollections(response.data[0].collections);
          setRecordings(response.data[0].recordings);
        })
        .catch(err => console.log('there was an axios err', err))
    };

    fetchContent();
  }, []);

  // if(view === 'artists'){
    return (
      <View>
        <View>
          <Button title='Artist' onPress={()=>setView('artists')}></Button>
          <Button title='Collections' onPress={()=>setView('collections')}></Button>
          <Button title='Sounds' onPress={()=>setView('sounds')}></Button>
          
        </View>
      <ScrollView>
        <TextInput
          style={{ height: 40, borderColor: 'black', borderWidth: 0.5, margin: 10 }}
          onChangeText={text => onChangeText(text)}
          value={value}
          />
        <ArtistSearchScreen/>
    </ScrollView>
    </View>
    )
//   } else if ( view === 'sounds'){
//     <ScrollView>
//     {/* <Text>search bar</Text> */}
//     {/* <SearchStack/> */}
//       <TextInput
//         style={{ height: 40, borderColor: 'black', borderWidth: 0.5, margin: 10 }}
//         onChangeText={text => onChangeText(text)}
//         value={value}
//       />
//      <SoundsSearchScreen/>
//   </ScrollView>
//   } else {
//     <ScrollView>
//     {/* <Text>search bar</Text> */}
//     {/* <SearchStack/> */}
//       <TextInput
//         style={{ height: 40, borderColor: 'black', borderWidth: 0.5, margin: 10 }}
//         onChangeText={text => onChangeText(text)}
//         value={value}
//       />
//      <CollectionsSearchScreen/>
//   </ScrollView>
//   }
// ;
}

SearchScreen.navigationOptions = {
  title: 'Search',
};
