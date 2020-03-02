import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Card, Text, Button, Image } from 'react-native-elements';
import { Modal, View } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import RecordingsList from '../Lists/RecordingsList';
import CollectionsScreen from '../../screens/CollectionScreen';

export default function RecentListItem ({ collection }) {
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
        <ScrollView>
        <LinearGradient
          colors={['#fc8f8f', '#eac2cd', '#eac2cd', '#ffefef']}
        >
          <Image
            source={{ uri: collection.url_image }}
            containerStyle={{ marginTop: 30, marginLeft: 15, width: 100, height: 100 }}
          />
          <Text style={{ marginTop: 15, marginLeft: 15, textAlign: "left", fontWeight: 'bold', fontSize: 22 }}>{collection.title}</Text>
          <Text style={{ marginLeft: 15, fontWeight: 'bold', color: '#f90909' }}>@{collection.username}</Text>
          <Text style={{ margin: 15, textAlign: "left" }}>{collection.description}</Text>
      <RecordingsList recordings={recordings} /> 
      {/* <TouchableOpacity
            onPress={() => {
              //go to artist handler
              setModalVisibilty(!modalVisible);
            }}
            title="go to artist"
      >
        <Text style={{ marginTop: 15, marginBottom: 500, fontWeight: 'bold', color: '#fb6262', textAlign: "center" }}>go to artist</Text>
      </TouchableOpacity> */}
          <Text style={{ marginBottom: 500 }}></Text>
      </LinearGradient>
      </ScrollView>
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