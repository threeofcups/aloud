import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Text, Button, Image } from 'react-native-elements';
import { Modal, View } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import RecordingsList from '../Lists/RecordingsList';
import CollectionsScreen from '../../screens/CollectionScreen'

export default function CollectionsListItem({ collection }) {
  const [modalVisible, setModalVisibilty] = useState(false);
  const [recordings, setRecordings] = useState([]);

  useEffect(() => {
    //get recordings from collection
    const fetchContent = async () => {
      await axios.get(`https://aloud-server.appspot.com/collection/${collection.id}`)
        .then(response => {
          setRecordings(response.data);
        })
        .catch(err => console.log('there was an axios err', err))
    };

    fetchContent();
  }, [collection]);

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
        <Button
          icon={{
            name: "chevron-left",
            size: 25,
            color: "red"
          }}
          type="clear"
          onPress={() => {
            setModalVisibilty(!modalVisible);
          }}
        />
        <Image
          source={{ uri: collection.url_image }}
          containerStyle={{ marginTop: 30, marginLeft: 15, width: 100, height: 100 }}
        />
        <Text style={{ marginTop: 15, marginLeft: 15, textAlign: "left" }}>{collection.title}</Text>
        <Text style={{ marginLeft: 15, textAlign: "left" }}>{collection.username}</Text>
        <Text style={{ margin: 15, marginBottom: 15, textAlign: "left" }}>{collection.description}</Text>
        <Text style={{ marginLeft: 15, textAlign: "left" }}>save collection button</Text>
        <Text style={{ marginLeft: 15, marginBotton: 15, textAlign: "left" }}>go to artist button</Text>
        <RecordingsList recordings={recordings} />
      </Modal>
    ) 
  }

  return (
    <TouchableWithoutFeedback onPress={() => { onPressHandle() }}>
      <Card
        containerStyle={{ padding: 0, width: 150, height: 150, borderWidth: 0, marginBottom: 15 }}
        image={{ uri: collection.url_image }}
        // title={collection.title} 
        featuredSubtitle={collection.title}
      />
    </TouchableWithoutFeedback>
  )

}