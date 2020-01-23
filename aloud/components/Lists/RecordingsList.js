import React, {useState} from 'react';
import RecordingsListItem from '../ListItems/RecordingsListItem'
import { Ionicons } from '@expo/vector-icons';
import recData from '../../src/sampleRecData';

import Colors from '../../constants/Colors';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function RecordingsList(props) {
  const [recordings, setRecordings] = useState(recData);

  return (
    <View>
    <ScrollView>
    <Text>{'    '}recordings</Text>
    <View>
      {
        recData.map((recording, i) => {
         return <RecordingsListItem key={i} recording={recording}/>
        })
      }
    </View>
    </ScrollView>
    </View>
  );
}