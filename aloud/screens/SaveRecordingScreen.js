import React, {useEffect, useState} from 'react';
import axios from 'axios';
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
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [privacySetting, setPrivacy] = useState('private');
    const [generateTranscript, setGenerateTranscript] = useState(false)
    const [recFlash, recFlasher] = useState(null);

// const uploadRecFromPhone = function(){
// DocumentPicker.getDocumentAsync({
//   type: '*/*',
//   copyToCacheDirectory: true,
// })
// .then(succ => console.log(succ.uri, succ.type, succ.name, succ.size))
// .catch(err => console.log('Audio upload error', err))
// }

// const callback = downloadProgress => {
//   const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
//   this.setState({
//     downloadProgress: progress,
//   });
// };

// const downloadResumable = FileSystem.createDownloadResumable(
//   'http://techslides.com/demos/sample-videos/small.mp4',
//   FileSystem.documentDirectory + 'small.mp4',
//   {},
//   callback
// );

// try {
//   const { uri } = await downloadResumable.downloadAsync();
//   console.log('Finished downloading to ', uri);
// } catch (e) {
//   console.error(e);
// }

// try {
//   await downloadResumable.pauseAsync();
//   console.log('Paused download operation, saving for future retrieval');
//   AsyncStorage.setItem('pausedDownload', JSON.stringify(downloadResumable.savable()));
// } catch (e) {
//   console.error(e);
// }

// try {
//   const { uri } = await downloadResumable.resumeAsync();
//   console.log('Finished downloading to ', uri);
// } catch (e) {
//   console.error(e);
// }

// //To resume a download across app restarts, assuming the the DownloadResumable.savable() object was stored:
// const downloadSnapshotJson = await AsyncStorage.getItem('pausedDownload');
// const downloadSnapshot = JSON.parse(downloadSnapshotJson);
// const downloadResumable = new FileSystem.DownloadResumable(
//   downloadSnapshot.url,
//   downloadSnapshot.fileUri,
//   downloadSnapshot.options,
//   callback,
//   downloadSnapshot.resumeData
// );

// try {
//   const { uri } = await downloadResumable.resumeAsync();
//   console.log('Finished downloading to ', uri);
// } catch (e) {
//   console.error(e);
// }

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
        <Button title="Submit Sound" color='#f90909'/>
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