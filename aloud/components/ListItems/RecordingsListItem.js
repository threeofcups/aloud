import React, {useState, useEffect} from 'react';
import { Audio } from "expo-av";
import Colors from '../../constants/Colors';
import { View, StyleSheet, Modal, Text, TouchableHighlight, ScrollView } from 'react-native';
import { ListItem, Button, Icon } from 'react-native-elements';

export default function RecordingsListItem({ recording }) {
  const [isPlaying, setPlayStatus] = useState('');
  const [playback, setPlayback] = useState('');
  const [iconStatus, setIconStatus] = useState('play-circle-filled');
  const [modalVisible, setModalVisible] = useState(false);


  const loadAudio = () => {
    const loadSetup = async() => {
    try {
      const playback = new Audio.Sound()
      const source = {
        uri: 'https://www.nasa.gov/mp3/584791main_spookysaturn.mp3'
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

  useEffect(() => {
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

  setAudioMode();
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

  const handleCollectionAdd = () => {
    //send axios post request to collection recording save route
    // recording.id and collection.id
    // need info from chosen collection (may have to retrieve with selected collection name)
  };

  const handleLibraryAdd = () => {
    //send axios post request to library recording save route
    // recording.id and user.id
    // need info from global auth
  };

  // const handleGoToArtist = () => {

  // };

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
            <Text style={{ marginTop: 54, textAlign: "center"}}>playback here</Text>
            <Text style={{ textAlign: "center"}}>{recording.title}</Text>
            <Text style={{ textAlign: "center" }}>{recording.username}</Text>
            <Text style={{ margin: 22, textAlign: "left" }}>{recording.description}</Text>
            <Text style={{ marginLeft: 22, marginBottom: 22, textAlign: "left" }}>{recording.speech_to_text}</Text>
              <Button
                title="add to collection"
                type="clear"
                onPress={() => {
                setModalVisible(!modalVisible);
              }}
              />
              <Button
                title="add to library"
                type="clear"
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              />
              {/* <Button
                title="go to artist"
                type="clear"
                onPress={() => {
                setModalVisible(!modalVisible);
              }}
              /> */}
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