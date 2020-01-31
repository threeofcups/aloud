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
    const [privacySetting, setPrivacy] = useState('private');
    const [generateTranscript, setGenerateTranscript] = useState(false)
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
        style={{ height: 40, borderColor: 'black', borderWidth: 0.5, margin: 10 }}
        onChangeText={text => setDescription(text)}
        value={description}/>
        <Text>Public</Text>
        <Switch onValueChange={(switchValue)=>{setPrivacy(switchValue)}} value={'public'}></Switch>
        {/* <Text>Generate Transcript</Text>
        <Switch></Switch>
        <Text>Transcript</Text>
        <TextInput></TextInput> */}
        {/* <recNav /> */}
        {/* <Button onPress={(event) => {
          const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dahfjsacf/upload';
          const CLOUDINARY_UPLOAD_PRESET = 'qna2tpvj';
          //const axios = require('axios');
          //addEventListener('change', function(event){
            const file = event.target.files[0];
            const formData = new FormData();
            // formData.append('file', file);
            // formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
            const defaultHeaders = {'Content-Type': 'application/x-www-form-urlencoded'};
            axios({
              url: CLOUDINARY_URL,
              method: 'POST',
              headers: defaultHeaders,
              data: formData,
              upload_preset: CLOUDINARY_UPLOAD_PRESET
            })
            .then(res => console.log(res))
            .catch(err => console.log(err))
        //  })
          //make the axios call to generate audio url
          //save url to cloudinary
          //grab url from response object
          //save url to the DB
          console.log('saved that sound for you')
        }} title="Save My Sound" color='#f90909'/> */}
        <Button title="Submit Sound" color='#f90909' onPress={()=> saveRecording()}/>
        <Button onPress={() => {
          //grab the url thats been saved to the db from the cloudinary call
          //save the url to a new collection in the db
         onBack()}} title="Cancel" color='#f90909'
          />
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