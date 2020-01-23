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
import { ListItem } from 'react-native-elements';

export default function RecordingsList(props) {
  const [recordings, setRecordings] = useState(recData);

  return (
    <View>
    <Text>recordings list</Text>
    <View>
      {
        recData.map((recording, i) => {
         return <RecordingsListItem recording={recording}/>
        })
      }
    </View>
    </View>
  );
}