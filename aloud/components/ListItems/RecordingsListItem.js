// avatar, sound name, artist name, length, more
import React from 'react';

import Colors from '../../constants/Colors';
import { View, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';

export default function RecordingsListItem({recording}) {

  return (
    <View style={styles.container}>
      <ListItem
        leftIcon={{ name: "play-circle-filled"}}
        title={recording.title}
        subtitle={recording.user}
        rightIcon={{ name: 'more-horiz'}}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eac3cd',
  },
  playIcon: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  }
});