import React from 'react';
import RecordingsListItem from '../ListItems/RecordingsListItem'
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function RecordingsList(props) {
  return (
    <View>
    <Text>recordings list</Text>
      <RecordingsListItem />
      <RecordingsListItem />
      <RecordingsListItem />
      <RecordingsListItem />
      <RecordingsListItem />
    </View>
  );
}