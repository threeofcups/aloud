import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {View, Text} from 'react-native'
import RecordingsList from '../components/Lists/RecordingsList'

export default function SoundsSearchScreen() {
  
return (
    <View>
        <Text>SoundsSearchScreen</Text>
        <RecordingsList/>
    </View>
)
}

SoundsSearchScreen.navigationOptions = {
  title: 'app.json',
};