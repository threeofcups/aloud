import React from 'react';
import { Card } from 'react-native-elements';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import CollectionsScreen from '../../screens/CollectionScreen'

export default function RecentListItem ({ collection }) {

    return (
        <Card
          containerStyle={{ padding: 0, width: 150, height: 150, borderWidth: 0, marginBottom: 15 }}
          image={{ uri: collection.url_image }}
          // title={collection.title} 
          featuredSubtitle={collection.title}
        />
    )

}