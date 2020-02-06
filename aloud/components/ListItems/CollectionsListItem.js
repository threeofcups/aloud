import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Text, Button, Image, Overlay} from 'react-native-elements';
import { Modal, View, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
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
  const handleLibrarySave = () => {
    console.log(collection);
    axios.post(`https://aloud-server.appspot.com/library/save/collection/${collection.id}`, {
      "userId": "1",
    })
      .then(response => {
        console.log(response.status);
        setModalVisibilty(!modalVisible);
      })
      .catch(err => {
        console.error(err);
        setModalVisibilty(!modalVisible);
      })
  };
  const onPressHandle = () => {
    setModalVisibilty(!modalVisible);
  };
  if(collection.title === ''){
    return (
      <View>
      <Overlay
        onBackdropPress={()=>  setModalVisibilty(!modalVisible)}
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisibilty(!modalVisible)
        }}>
        <ScrollView>
        <LinearGradient
         colors={['#eac2cd', '#ffefef','#ffefef','#ffefef']}>
        <Image
          source={{ uri: collection.url_image }}
          containerStyle={{ marginTop: 30, marginLeft: 15, width: 100, height: 100 }}
          />
        <Text style={{ marginTop: 15, marginLeft: 15, textAlign: "left", fontWeight: 'bold', fontSize: 22 }}>{collection.title}</Text>
        <Text style={{ marginLeft: 15, fontWeight: 'bold', color: '#f90909' }}>@{collection.username}</Text>
        <Text style={{ margin: 15, textAlign: "left" }}>{collection.description}</Text>
        <TouchableOpacity
            onPress={() => {
              handleLibrarySave();
              setModalVisibilty(!modalVisible);
            }}
            title="save to library"
            >
              <Text style={{ marginLeft: 15, marginBottom: 20, fontWeight: 'bold', color: '#fb6262', textAlign: "left" }}>save to library</Text>
        </TouchableOpacity>
        <RecordingsList recordings={recordings} />
        <Text style={{ marginBottom: 500}}></Text>
        </LinearGradient>
        </ScrollView>
      </Overlay>
    <TouchableOpacity onPress={() => onPressHandle() }>
      <Card
        containerStyle={{ padding: 0, width: 150, height: 150, borderWidth: 0, marginBottom: 15 }}
        image={{ uri: collection.url_image }}
        featuredSubtitle={' '}
        />
    </TouchableOpacity>
        </View>
  )
  } else
    return (
      <View>
      <Overlay
        onBackdropPress={()=>  setModalVisibilty(!modalVisible)}
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisibilty(!modalVisible)
        }}>
        <ScrollView>
        <LinearGradient
         colors={['#eac2cd', '#ffefef','#ffefef','#ffefef']}>
        <Image
          source={{ uri: collection.url_image }}
          containerStyle={{ marginTop: 30, marginLeft: 15, width: 100, height: 100 }}
          />
        <Text style={{ marginTop: 15, marginLeft: 15, textAlign: "left", fontWeight: 'bold', fontSize: 22 }}>{collection.title}</Text>
        <Text style={{ marginLeft: 15, fontWeight: 'bold', color: '#f90909' }}>@{collection.username}</Text>
        <Text style={{ margin: 15, textAlign: "left" }}>{collection.description}</Text>
        <TouchableOpacity
            onPress={() => {
              handleLibrarySave();
              setModalVisibilty(!modalVisible);
            }}
            title="save to library"
            >
              <Text style={{ marginLeft: 15, marginBottom: 20, fontWeight: 'bold', color: '#fb6262', textAlign: "left" }}>save to library</Text>
        </TouchableOpacity>
        <RecordingsList recordings={recordings} />
        <Text style={{ marginBottom: 500}}></Text>
        </LinearGradient>
        </ScrollView>
      </Overlay>
    <TouchableOpacity onPress={() => onPressHandle() }>
      <Card
        containerStyle={{ padding: 0, width: 150, height: 150, borderWidth: 0, marginBottom: 15 }}
        image={{ uri: collection.url_image }}
        featuredSubtitle={collection.title}
        />
    </TouchableOpacity>
        </View>
  )
}