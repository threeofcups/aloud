import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';
import { View, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';

export default function CollectionsListItem({collection}) {
  return (
    <ListItem
      leftAvatar={{
        source: { uri: "https://worldofwonder.net/wp-content/uploads/2017/03/3-27-frank-ohara.jpg" } }}
      title={collection.title}
      subtitle={collection.user}
      rightIcon={{ name: 'more-horiz' }}
    />
  );
}