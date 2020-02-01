import React, {useState} from 'react';
import { Card, Text, Button } from 'react-native-elements';
import { Modal } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import CollectionsScreen from '../../screens/CollectionScreen'

export default function RecentListItem ({ collection }) {
  const [modalVisible, setModalVisibilty] = useState(false);

  const onPressHandle = () => {
    console.log('COLLECTION', collection);
    setModalVisibilty(!modalVisible);
  };

  if (modalVisible) {
    return (
      <Modal
        animationType="fade"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisibilty(!modalVisible)
        }}>
      <Text style={{ marginTop: 54, textAlign: "center" }}>{collection.title}</Text>
      <Text style={{ margin: 22, textAlign: "center" }}>render all {collection.title} recordings here</Text>
      <Text style={{ marginLeft: 22, textAlign: "center" }}>add options like save collection</Text>
      <Text style={{ marginLeft: 22, textAlign: "center" }}>render recording list</Text>
      <Button
          title="x"
          type="clear"
          onPress={() => {
            setModalVisibilty(!modalVisible);
          }}
      />
      </Modal>
    )
  } 

    return (
      <TouchableWithoutFeedback onPress={() => {onPressHandle()}}>
        <Card
          containerStyle={{ padding: 0, width: 150, height: 150, borderWidth: 0, marginBottom: 15 }}
          image={{ uri: collection.url_image }}
          // title={collection.title} 
          featuredSubtitle={collection.title}
        />
      </TouchableWithoutFeedback>
    )

}