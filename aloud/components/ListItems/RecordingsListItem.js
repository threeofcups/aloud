// avatar, sound name, artist name, length, more
import React, {useState, useEffect} from 'react';
import { Audio } from "expo-av";
import Colors from '../../constants/Colors';
import { View, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';

export default function RecordingsListItem({ recording }) {
  const [isPlaying, setPlayStatus] = useState('');
  const [playback, setPlayback] = useState('');
  const [onPlaybackUpdate, setOnPBupdate] = useState('');
  const [iconStatus, setIconStatus] = useState('play-circle-filled');


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


  // const playRecording = async() => {
  //   try {
  //     setSound(await Audio.Sound.createAsync(
  //       { uri: 'https://ia902704.us.archive.org/26/items/macbeth_0810_librivox/macbeth_0_shakespeare.mp3' },
  //       { shouldPlay: true }
  //     ))
  //     setPlayStatus(true);
  //     setIconStatus('pause-circle-filled');
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const pauseRecording = async () => {
  //   try {
      
  //     setPlayStatus(false);
  //     setIconStatus('play-circle-filled');
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };


  // const playAndPause = () => {
  //   switch (playStatus) {
  //     case false:
  //       playRecording();
  //       break;
  //     case true:
  //       pauseRecording();
  //       break;
  //   }
  // };

  return (
    <View style={styles.container}>
      <ListItem
        onPress={() => handlePlayPause()}
        leftIcon={{ name: iconStatus}}
        title={recording.title}
        subtitle={recording.username}
        rightIcon={{ name: 'more-horiz'}}
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
  }
});