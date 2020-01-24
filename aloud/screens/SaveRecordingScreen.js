import React, {useState} from 'react';
import {View, Text, TextInput, Switch} from 'react-native'
import RecordingsList from '../components/Lists/RecordingsList'
import { ScrollView } from 'react-native-gesture-handler';

export default function SaveRecordingScreen() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [privacySetting, setPrivacy] = useState('private');
    const [generateTranscript, setGenerateTranscript] = useState(false)

return (
    <View>
    
        <ScrollView>
        {/* playback component  */}
        <Text>Title</Text>
        <TextInput style={{ height: 40, borderColor: 'black', borderWidth: 0.5, margin: 10 }}
        onChangeText={text => setTitle(text)}
        value={title}
        />
        <Text>Description</Text>
        <TextInput
        style={{ height: 40, borderColor: 'black', borderWidth: 0.5, margin: 10 }}
        onChangeText={text => setDescription(text)}
        value={description}/>
        <Text>Public Sound</Text>
        <Switch onValueChange={(switchValue)=>{setPrivacy(switchValue)}} value={'public'}></Switch>
        <Text>Generate Transcript</Text>
        <Switch></Switch>
        <Text>Transcript</Text>
        <TextInput></TextInput>
        <Text onPress={()=>{console.log('uhg')}}>Add to Collection + </Text>
        </ScrollView>
        
    </View>
)
}

SaveRecordingScreen.navigationOptions = {
  title: 'app.json',
};