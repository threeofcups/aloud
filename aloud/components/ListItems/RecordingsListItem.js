import React, {useState, useEffect} from 'react';
import { Audio } from "expo-av";
import axios from 'axios';
import Colors from '../../constants/Colors';
import { View, StyleSheet, Modal, Text, ScrollView, Picker } from 'react-native';
import { ListItem, Button, Icon } from 'react-native-elements';

export default function RecordingsListItem({ recording }) {
  const [src, setSrc] = useState(recording.url_recording);
  const [isPlaying, setPlayStatus] = useState('');
  const [playback, setPlayback] = useState('');
  const [iconStatus, setIconStatus] = useState('play-circle-filled');
  const [modalVisible, setModalVisible] = useState(false);
  const [collectionsModalVisible, setCollectionsVisible] = useState(false);
  const [collections, setCollections] = useState([]);
  const [choiceCollection, setChoiceCollection] = useState([]);

  //get all collections for user
  //get all libraries for user

  const fetchCollectionContent = async () => {
    await axios.get('https://aloud-server.appspot.com/profile/bjork/1')
      .then(response => {
        setCollections(response.data[0].collections);
      })
      .catch(err => console.log('there was an axios err', err))
  };


  const loadAudio = () => {
    const loadSetup = async() => {
    try {
      const playback = new Audio.Sound()
      const source = {
        uri: src,
      }
      const status = {
        shouldPlay: isPlaying,
        isPlaybackAllowed: true
      }
      await playback.loadAsync(source, status);
      return playback;
    } catch (e) {
      console.log(e);
    }
  }

  loadSetup()
  .then(playback => setPlayback(playback))
  .catch(e => console.error(e));

  };

  const setAudioMode = async() => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
        shouldDuckAndroid: true,
        staysActiveInBackground: true,
        playThroughEarpieceAndroid: true
      })
      loadAudio()
    } catch (e) {
      console.log(e)
    }
  };

    // const fetchLibraryContent = async () => {
  //   await axios.get('https://aloud-server.appspot.com/home')
  //     .then(response => {
  //       setHomeCollections(response.data[0].collections);
  //       setHomeRecordings(response.data[0].recordings);
  //     })
  //     .catch(err => console.log('there was an axios err', err))
  // };
      
  useEffect(() => {

    
    setAudioMode();
    fetchCollectionContent();
    // fetchLibraryContent();

  }, []);

  const handlePlayPause = async () => {
  if(isPlaying) {
    await playback.pauseAsync();
    setIconStatus('play-circle-filled')
  } else {
    await playback.playAsync();
    setIconStatus('pause-circle-filled');
  }

  setPlayStatus(!isPlaying);
  };
  
  const openModal = () => {
    setModalVisible(!modalVisible);
  }

  const saveToLibrary = async () => {
    await axios.post(`https://aloud-server.appspot.com/library/save/recording/${recording.id}`, {
      "userId": "1"
    })
      .then(success => {
        console.log(success);
      })
      .catch(err => console.log('there was an axios err:', err))
  };

  const saveToCollection = async () => {
    await axios.post(`https://aloud-server.appspot.com/recording/${choiceCollection.id}`, {
      "recordingId": recording.id
    })
      .then(success => {
        console.log(success);
      })
      .catch(err => console.log('there was an axios err:', err))
  };

  const handleCollectionAdd = () => {
    saveToCollection();
  };

  const handleLibraryAdd = () => {
    saveToLibrary();
  };

  return (
    <View style={styles.container}>
      <Modal
        style={styles.modal}
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}>
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
          <View>
            <Text style={{ marginTop: 54, textAlign: "center"}}>playback view here</Text>
            <Text style={{ textAlign: "center"}}>{recording.title}</Text>
            <Text style={{ textAlign: "center" }}>{recording.username}</Text>
            <Text style={{ margin: 22, textAlign: "left" }}>{recording.description}</Text>
            <Text style={{ marginLeft: 22, marginBottom: 22, textAlign: "left" }}>{recording.speech_to_text}</Text>
              <Button
                title="add to collection"
                type="clear"
                onPress={() => {
                  // setModalVisible(!modalVisible);
                  setCollectionsVisible(true);
              }}
              />
              <Modal
              style={styles.modal}
              animationType="fade"
              transparent={false}
              visible={collectionsModalVisible}
              onRequestClose={() => {
                setCollectionsVisible(!collectionsModalVisible)
              }}>
              <Text style={{margin: 54, textAlign: "center"}}>collections</Text>
              {collections.map(collection => {
                return (
                  <Button
                    title={collection.title}
                    type="clear"
                    onPress={() => {
                      //add to collection
                      //axios post function called here
                      setChoiceCollection(collection)
                      handleCollectionAdd();
                      setCollectionsVisible(!collectionsModalVisible);
                    }}
                  />
                )
              })}
              <Button
                title="x"
                type="clear"
                onPress={() => {
                  setCollectionsVisible(!collectionsModalVisible);
                }}
              />
              </Modal>
              <Button
                title="add to library"
                type="clear"
                onPress={() => {
                  handleLibraryAdd();
                  setModalVisible(!setModalVisible);
                }}
              />
            <Button
              title="go to artist"
              type="clear"
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            />
              <Button
                title="x"
                type="clear"
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              />
          </View>
        </ScrollView>
      </Modal>
      <ListItem
        onPress={() => handlePlayPause()}
        leftIcon={{ name: iconStatus }}
        title={recording.title}
        subtitle={recording.username}
        rightIcon={{ name: 'more-horiz', onPress: () => openModal()}}
      bottomDivider
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
  },
  modal: {
    backgroundColor: 'white',
    margin: 0, 
    alignItems: undefined,
    justifyContent: undefined,
  },
  
});