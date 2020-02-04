import React, {useState, useEffect} from 'react';
import { Audio } from "expo-av";
import axios from 'axios';
import Colors from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { View, StyleSheet, Modal, Text, ScrollView, Picker, TouchableOpacity  } from 'react-native';
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
  const [iconColor, setIconColor] = useState('#f90909');
  const [backgroundColor, setBackground] = useState('#fdfffc');

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

  useEffect(() => {

    
    setAudioMode();
    fetchCollectionContent();

  }, []);

  const handlePlayPause = async () => {
  if(isPlaying) {
    await playback.pauseAsync();
    setIconColor('#f90909');
    setIconStatus('play-circle-filled');
    setBackground('#fdfffc');
  } else {
    await playback.playAsync();
    setIconColor('#eac2cd');
    setIconStatus('pause-circle-filled');
    setBackground('#fbf0f2');
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
        <ScrollView style={{ marginTop: 0, flex: 1, backgroundColor: '#fbf0f2' }}>
          <View>
            <LinearGradient
              colors={['#fb6969', '#eac2cd', '#eac2cd', '#ffefef']}
            >
            <Icon
              name={iconStatus}
              underlayColor='#fbf0f2'
              onPress={() => handlePlayPause()}
              iconStyle={{ marginTop: 50, margin: 22, color: iconColor}}
              size={60}
            />
            <Text style={{ textAlign: "center", fontWeight: 'bold', fontSize: 22, color: '#1e001a'}}>{recording.title}</Text>
            <Text style={{ textAlign: "center", fontWeight: 'bold', color: '#fb6262'}}>@{recording.username}</Text>
            <Text style={{ marginTop: 11, marginLeft: 22, textAlign: "left" }}>{recording.description}</Text>
            <Text style={{ marginTop: 11, marginLeft: 22, textAlign: "left", color: '#fb6262' }}>google voice to text</Text>
            <Text style={{ marginLeft: 22, marginBottom: 22, textAlign: "left" }}>{recording.speech_to_text}</Text>
            <TouchableOpacity
              onPress={() => {
                setCollectionsVisible(!collectionsModalVisible);
              }} 
              title="add to collection"
            >
              <Text style={{ fontWeight: 'bold', color: '#fb6262', textAlign: "center"}}>add to collection</Text>
            </TouchableOpacity>
              <TouchableOpacity
              onPress={() => {
                handleLibraryAdd();
                setModalVisible(!setModalVisible);
              }}
              title="add to library"
            >
              <Text style={{ marginTop: 30, marginBottom: 30, fontWeight: 'bold', color: '#fb6262', textAlign: "center" }}>add to library</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              title="go to artist"
            >
              <Text style={{ marginTop: 30, marginBottom: 10, fontWeight: 'bold', color: '#fb6262', textAlign: "center" }}>go to artist</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              title="x"
              >
              <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#fb6262', textAlign: "center" }}>x</Text>
            </TouchableOpacity>
            </LinearGradient>
          </View>
        </ScrollView>
      </Modal>
      <ListItem
        containerStyle={{ backgroundColor: backgroundColor }}
        underlayColor='#f90909'
        onPress={() => handlePlayPause()}
        leftIcon={{ name: iconStatus, color: iconColor }}
        title={recording.title}
        subtitle={recording.username}
        rightIcon={{ name: 'more-horiz', onPress: () => openModal()}}
      bottomDivider
    />
    {/* collections modal */}
      <Modal
        backgroundColor='#fbf0f2'
        animationType="fade"
        transparent={false}
        visible={collectionsModalVisible}
        onRequestClose={() => {
          setCollectionsVisible(!collectionsModalVisible)
        }}>
        <LinearGradient
          colors={['#eac2cd', '#ffefef']}
        >
        <Text style={{ marginTop: 54, marginLeft: 20, marginBottom: 20, textAlign: "left", fontWeight: 'bold', color: '#1e001a' }}>collections</Text>
        {collections.map(collection => {
          return (
            <TouchableOpacity
              onPress={() => {
                setChoiceCollection(collection)
                handleCollectionAdd();
                setCollectionsVisible(!collectionsModalVisible);
              }}
              title="collection"
            >
              <Text style={{ marginBottom: 10, fontWeight: 'bold', color: '#fb6262', marginLeft: 20 }}>{collection.title}</Text>
            </TouchableOpacity>
          )
        })}
        <TouchableOpacity
          onPress={() => {
            setCollectionsVisible(!collectionsModalVisible);
          }}
          title="x"
        >
          <Text style={{ marginTop: 20, marginLeft: 50, marginBottom: 1000, fontSize: 24, fontWeight: 'bold', color: '#fb6262', marginLeft: 20 }}>x</Text>
        </TouchableOpacity>
       </LinearGradient>
      </Modal>
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
    backgroundColor: '#eac3cd',
    margin: 0, 
    alignItems: undefined,
    justifyContent: undefined,
  },
  
});