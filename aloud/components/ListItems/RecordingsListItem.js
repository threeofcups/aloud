// avatar, sound name, artist name, length, more
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';
import { ListItem } from 'react-native-elements';

export default function RecordingsListItem(props) {
  return (
    <ListItem
        size="large"
    leftAvatar={{
       title:'Dot'
    //   title: name[0],
    //   source: { uri: avatar_url },
    //   showEditButton: true,
    }}
    title={'dot'}
    subtitle={'role'}
    chevron
  />
  );
}