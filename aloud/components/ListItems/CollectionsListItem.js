import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';
import { View, StyleSheet, Image, Text } from 'react-native';
import { ListItem, Card } from 'react-native-elements';

export default function CollectionsListItem({collection}) {
  return (
    
      // <Card>
      // <Image scr={{ uri: "https://worldofwonder.net/wp-content/uploads/2017/03/3-27-frank-ohara.jpg" }}/>
      // <Text>{collection.title}</Text>
      // <Text>{collection.user}</Text>
      // </Card>
    
    <Card
    containerStyle={{ padding: 0, width: 160 }}
    image={{ uri: "https://worldofwonder.net/wp-content/uploads/2017/03/3-27-frank-ohara.jpg" } }
    title={collection.title} 
    subtitle={collection.user}
    
    />
    // <ListItem
    //   leftAvatar={{
    //     source: { uri: "https://worldofwonder.net/wp-content/uploads/2017/03/3-27-frank-ohara.jpg" } }}
    //   rightIcon={{ name: 'more-horiz' }}
    // />
  );
}