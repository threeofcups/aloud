import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import {UserContext} from '../App'
import {View, Text, TextInput, Switch, Button, AppState, StyleSheet} from 'react-native'
import { createStackNavigator } from 'react-navigation-stack';
import recNav from '../navigation/AppNavigator';
import RecordingsList from '../components/Lists/RecordingsList'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { RecordStack } from '../navigation/MainTabNavigator';
import RecordScreen from '../screens/RecordScreen';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

export default function SaveRecordingScreen({onBack}) {
    const {userName, userId, photoUrl} = useContext(UserContext)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState('');
    const [privacySetting, setPrivacy] = useState('true');
    const [recordingUrl, setRecordingURl] = useState('')
    const [recFlash, recFlasher] = useState(null);



    saveRecording = async() => {
      
        await axios.post('https://aloud-server.appspot.com/recording', {
    "id_user": "1",
    "title": title,
    "description": description,
    "url_recording": "cloudinary.mp3",
    "published": privacySetting,
    "speech_to_text": "sample sample sample",
  
        })
        .then(()=> console.log('yay'))
        .catch(err => console.error('there was an error with save recording'))
    }
    togglePrivacy = () => {
      if(privacySetting === 'false'){
        setPrivacy('true')
      } else {
        setPrivacy('true')
      }
    }

return (
    <View>
        <ScrollView>
        <Text>Recording Title:</Text>
        <TextInput style={{ height: 40, borderColor: 'black', borderWidth: 0.5, margin: 10 }}
        onChangeText={text => setTitle(text)}
        value={title}
        />
        <Text>Recording Description:</Text>
        <TextInput
        style={{ height: 80, borderColor: 'black', borderWidth: 0.5, margin: 10 }}
        onChangeText={text => setDescription(text)}
        value={description}/>
        <Text>Public</Text>
        <Switch
          onValueChange={(value) =>setPrivacy(value)}
          style={{marginBottom: 10}}
          value={privacySetting} 
          trackColor={{
            true: '#f90909',
            false:'#f90909',
        }} 
          thumbColor={'#fbf0f2'}/>
        <Text></Text>
        <Button title="Submit Sound" color='#f90909' onPress={()=> saveRecording()}/>
        <Button onPress={() => {onBack()}} title="Cancel" color='#f90909'/>
        </ScrollView>
    </View>
)};


SaveRecordingScreen.navigationOptions = {
  title: 'app.json',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor:'#841584',
    paddingTop:10,
    paddingBottom:10,
    paddingLeft : 10,
      paddingRight : 10
  },
  resetText:{
      color:'#fff',
      textAlign:'center',
      paddingLeft : 10,
      paddingRight : 10
  }
});