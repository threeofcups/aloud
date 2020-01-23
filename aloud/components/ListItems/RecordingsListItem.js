// avatar, sound name, artist name, length, more
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

import Colors from '../../constants/Colors';
import { ListItem, View } from 'react-native-elements';

export default function RecordingsListItem({recording}) {
  const config = Platform.select({
    web: { headerMode: 'false' },
    default: {},
  });

  return (
    <ListItem
    size="small"
    title={recording.title}
    subtitle={recording.id_user}
    chevron
  />
  );
}