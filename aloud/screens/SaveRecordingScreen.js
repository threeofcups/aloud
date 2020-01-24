import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {View, Text, TextInput, Switch, Button} from 'react-native'
import RecordingsList from '../components/Lists/RecordingsList'
import { ScrollView } from 'react-native-gesture-handler';

export default function SaveRecordingScreen() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [privacySetting, setPrivacy] = useState('private');
    const [generateTranscript, setGenerateTranscript] = useState(false)

    const [recFlash, recFlasher] = useState(null);

    const uploadRec = function(){
      useEffect(() => {
      return axios.post('https://api.cloudinary.com/v1_1/dahfjsacf/upload')
      .then(response => {
        console.log(response)
      })
      .catch(err => console.log('there was an err saving that recording to cloudinary', err))
    });
    }


return (
    <View>
        <ScrollView>
        {/* playback component  
        TODO: save the title and description to the db
        
        */}
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
        <Button onPress={() => {
          //make the axios call to generate audio url 
          //save url to cloudinary
          //grab url from response object
          //save url to the DB 
          console.log('saved that sound for you')
        }} title="Save My Sound" color="#841584"/>

        <Button onPress={() => {
          //grab the url thats been saved to the db from the cloudinary call
          //save the url to a new collection in the db
          console.log('added to your collection')}} title="Add to a Collection" color="#841584"/>
        
        <Button onPress={() => {
          //grab the url thats been saved to the db
          //create a new entry in the collections table with its details
          console.log('created your collection')}} title="Create a new Collection" color="#841584"/>

        </ScrollView>
    </View>
)};

SaveRecordingScreen.navigationOptions = {
  title: 'app.json',
};