import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { Ionicons } from '@expo/vector-icons';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Slider,
  TouchableHighlight,
 
  Button
} from "react-native";
import { Asset } from "expo-asset";
import { Audio, Video } from "expo-av";
import * as MediaLibrary from 'expo-media-library';
import * as Font from "expo-font";
import { MaterialIcons } from "@expo/vector-icons";
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import SaveRecordingScreen from './SaveRecordingScreen';
import navigator from 'react-native-elements'
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-document-picker';
import * as Speech from 'expo-speech';

class Icon {
  constructor(module, width, height) {
    this.module = module;
    this.width = width;
    this.height = height;
    Asset.fromModule(this.module).downloadAsync();
  }
}

const ICON_RECORD_BUTTON = new Icon(require('./assets/images/record_button.png'), 70, 119);
const ICON_RECORDING = new Icon(require('./assets/images/record_icon.png'), 20, 14);

const ICON_PLAY_BUTTON = new Icon(require('./assets/images/play_button.png'), 34, 51);
const ICON_PAUSE_BUTTON = new Icon(require('./assets/images/pause_button.png'), 34, 51);
// const ICON_STOP_BUTTON = new Icon(require('./assets/images/stop_button.png'), 22, 22);

const ICON_MUTED_BUTTON = new Icon(require('./assets/images/muted_button.png'), 67, 58);
// const ICON_UNMUTED_BUTTON = new Icon(require('./assets/images/unmuted_button.png'), 67, 58);

const ICON_TRACK_1 = new Icon(require('./assets/images/track_1.png'), 166, 5);
const ICON_THUMB_1 = new Icon(require('./assets/images/thumb_1.png'), 18, 19);
const ICON_THUMB_2 = new Icon(require('./assets/images/thumb_2.png'), 15, 19);

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');
const BACKGROUND_COLOR = 'white';
const LIVE_COLOR = '#f90909';
// const DISABLED_OPACITY = 0.5;
// const RATE_SCALE = 3.0;

export default class RecordScreen extends React.Component {
  constructor(props) {
    super(props);
    this.recording = null;
    this.sound = null;
    this.isSeeking = false;
    this.shouldPlayAtEndOfSeek = false;
    this.state = {
      haveRecordingPermissions: false,
      isLoading: false,
      isPlaybackAllowed: false,
      muted: false,
      soundPosition: null,
      soundDuration: null,
      recordingDuration: null,
      shouldPlay: false,
      isPlaying: false,
      isRecording: false,
      fontLoaded: false,
      shouldCorrectPitch: true,
      volume: 1.0,
      rate: 1.0,
      view: 'record'
    };
    this.recordingSettings = JSON.parse(JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY));
     // UNCOMMENT THIS TO TEST maxFileSize:
    // this.recordingSettings.android['maxFileSize'] = 12000;
    this.onSaveRecording = this.onSaveRecording.bind(this)
  }

  componentDidMount() {
    (async () => {
      await Font.loadAsync({
        'cutive-mono-regular': require('./assets/fonts/CutiveMono-Regular.ttf'),
      });
      this.setState({ fontLoaded: true });
    })();
    this._askForPermissions();
  }


  _askForPermissions = async () => {
    const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING, Permissions.CAMERA_ROLL);
    this.setState({
      haveRecordingPermissions: response.status === 'granted',
    });
  };

  _updateScreenForSoundStatus = status => {
    if (status.isLoaded) {
      this.setState({
        soundDuration: status.durationMillis,
        soundPosition: status.positionMillis,
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
        rate: status.rate,
        muted: status.isMuted,
        volume: status.volume,
        shouldCorrectPitch: status.shouldCorrectPitch,
        isPlaybackAllowed: true,
      });
    } else {
      this.setState({
        soundDuration: null,
        soundPosition: null,
      });
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };

  _updateScreenForRecordingStatus = status => {
    if (status.canRecord) {
      this.setState({
        isRecording: status.isRecording,
        recordingDuration: status.durationMillis,
      });
    } else if (status.isDoneRecording) {
      this.setState({
        isRecording: false,
        recordingDuration: status.durationMillis,
      });
      if (!this.state.isLoading) {
        this._stopRecordingAndEnablePlayback();
      }
    }
  };

  async _stopPlaybackAndBeginRecording() {
    this.setState({
      isLoading: true,
    });
    if (this.sound !== null) {
      await this.sound.unloadAsync();
      this.sound.setOnPlaybackStatusUpdate(null);
      this.sound = null;
    }
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });
    if (this.recording !== null) {
      this.recording.setOnRecordingStatusUpdate(null);
      this.recording = null;
    }

    const recording = new Audio.Recording();
    await recording.prepareToRecordAsync(this.recordingSettings);
    recording.setOnRecordingStatusUpdate(this._updateScreenForRecordingStatus);

    this.recording = recording;
    await this.recording.startAsync(); // Will call this._updateScreenForRecordingStatus to update the screen.
    this.setState({
      isLoading: false,
    });
  }

  async _stopRecordingAndEnablePlayback() {
    this.setState({
      isLoading: true,
    });
    try {
      await this.recording.stopAndUnloadAsync();
    } catch (error) {
      // Do nothing -- we are already unloaded.
    }

    const info = await FileSystem.getInfoAsync(this.recording.getURI());

    console.log(`FILE INFO: ${JSON.stringify(info)}`);

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      playsInSilentLockedModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });

    const { sound, status } = await this.recording.createNewLoadedSoundAsync({
        isLooping: false,
        isMuted: this.state.muted,
        volume: this.state.volume,
        rate: this.state.rate,
        shouldCorrectPitch: this.state.shouldCorrectPitch,
      },
      this._updateScreenForSoundStatus );
    this.sound = sound;
    this.setState({
      isLoading: false,
    });
  }

  _onRecordPressed = () => {
    if (this.state.isRecording) {
      this._stopRecordingAndEnablePlayback();
    } else {
      this._stopPlaybackAndBeginRecording();
    }
  };

  _onPlayPausePressed = () => {
    if (this.sound != null) {
      if (this.state.isPlaying) {
        this.sound.pauseAsync();
      } else {
        this.sound.playAsync();
      }
    }
  };

  _onStopPressed = () => {
    if (this.sound != null) {
      this.sound.stopAsync();
    }
  };

  _onMutePressed = () => {
    if (this.sound != null) {
      this.sound.setIsMutedAsync(!this.state.muted);
    }
  };

  _onVolumeSliderValueChange = value => {
    if (this.sound != null) {
      this.sound.setVolumeAsync(value);
    }
  };

  _trySetRate = async (rate, shouldCorrectPitch) => {
    if (this.sound != null) {
      try {
        await this.sound.setRateAsync(rate, shouldCorrectPitch);
      } catch (error) {
        // Rate changing could not be performed, possibly because the client's Android API is too old.
      }
    }
  };

  _onRateSliderSlidingComplete = async value => {
    this._trySetRate(value * RATE_SCALE, this.state.shouldCorrectPitch);
  };

  _onPitchCorrectionPressed = async value => {
    this._trySetRate(this.state.rate, !this.state.shouldCorrectPitch);
  };

  _onSeekSliderValueChange = value => {
    if (this.sound != null && !this.isSeeking) {
      this.isSeeking = true;
      this.shouldPlayAtEndOfSeek = this.state.shouldPlay;
      this.sound.pauseAsync();
    }
  };

  _onSeekSliderSlidingComplete = async value => {
    if (this.sound != null) {
      this.isSeeking = false;
      const seekPosition = value * this.state.soundDuration;
      if (this.shouldPlayAtEndOfSeek) {
        this.sound.playFromPositionAsync(seekPosition);
      } else {
        this.sound.setPositionAsync(seekPosition);
      }
    }
  };

  _getSeekSliderPosition() {
    if (
      this.sound != null &&
      this.state.soundPosition != null &&
      this.state.soundDuration != null
    ) {
      return this.state.soundPosition / this.state.soundDuration;
    }
    return 0;
  }

  _getMMSSFromMillis(millis) {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = number => {
      const string = number.toString();
      if (number < 10) {
        return '0' + string;
      }
      return string;
    };
    return padWithZero(minutes) + ':' + padWithZero(seconds);
  }

  _getPlaybackTimestamp() {
    if (
      this.sound != null &&
      this.state.soundPosition != null &&
      this.state.soundDuration != null
    ) {
      return `${this._getMMSSFromMillis(this.state.soundPosition)} / ${this._getMMSSFromMillis(
        this.state.soundDuration
      )}`;
    }
    return '';
  }
  _getRecordingTimestamp() {
    if (this.state.recordingDuration != null) {
      return `${this._getMMSSFromMillis(this.state.recordingDuration)}`;
    }
    return `${this._getMMSSFromMillis(0)}`;
  }

  //CODE ADDITIONS START HERE
  async createAudioAsset() {
    let newAss = await MediaLibrary.createAssetAsync(this.recording.getURI())
    MediaLibrary.createAlbumAsync('Recordings', newAss)
    .then(() => {
      console.log('Album created!');
    })
    .catch(error => {
      console.log('err', error);
    });
    }

    async saveToPhoneLibrary(){
      this.createAudioAsset()
    .then(asset => MediaLibrary.saveToLibraryAsync(asset))
    .catch(err => console.log('media library save asset err', err))
    }

    async uploadRecFromPhone(){
      DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
        base64: true
      })
      .then(succ => {
        //check out the saved info
        console.log(`Recording Information -- path: ${succ.uri}, type: ${succ.type}, size: ${succ.size}`)
        //https://www.iana.org/assignments/media-types/media-types.xhtml#audio - MIME audio types
        var Base64 = {
          // private property
          _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
          // public method for encoding
          encode : function (input) {
              var output = "";
              var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
              var i = 0;
              input = Base64._utf8_encode(input);
              while (i < input.length) {
                  chr1 = input.charCodeAt(i++);
                  chr2 = input.charCodeAt(i++);
                  chr3 = input.charCodeAt(i++);
                  enc1 = chr1 >> 2;
                  enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                  enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                  enc4 = chr3 & 63;
                  if (isNaN(chr2)) {
                      enc3 = enc4 = 64;
                  } else if (isNaN(chr3)) {
                      enc4 = 64;
                  }
                  output = output +
                  this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                  this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
              }
              return output;
          },
          // public method for decoding
          decode : function (input) {
              var output = "";
              var chr1, chr2, chr3;
              var enc1, enc2, enc3, enc4;
              var i = 0;
              input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
              while (i < input.length) {
                  enc1 = this._keyStr.indexOf(input.charAt(i++));
                  enc2 = this._keyStr.indexOf(input.charAt(i++));
                  enc3 = this._keyStr.indexOf(input.charAt(i++));
                  enc4 = this._keyStr.indexOf(input.charAt(i++));
                  chr1 = (enc1 << 2) | (enc2 >> 4);
                  chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                  chr3 = ((enc3 & 3) << 6) | enc4;
                  output = output + String.fromCharCode(chr1);
                  if (enc3 != 64) {
                      output = output + String.fromCharCode(chr2);
                  }
                  if (enc4 != 64) {
                      output = output + String.fromCharCode(chr3);
                  }
              }
              output = Base64._utf8_decode(output);
              return output;
          },
          // private method for UTF-8 encoding
          _utf8_encode : function (string) {
              string = string.replace(/\r\n/g,"\n");
              var utftext = "";
              for (var n = 0; n < string.length; n++) {
                  var c = string.charCodeAt(n);
                  if (c < 128) {
                      utftext += String.fromCharCode(c);
                  }
                  else if((c > 127) && (c < 2048)) {
                      utftext += String.fromCharCode((c >> 6) | 192);
                      utftext += String.fromCharCode((c & 63) | 128);
                  }
                  else {
                      utftext += String.fromCharCode((c >> 12) | 224);
                      utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                      utftext += String.fromCharCode((c & 63) | 128);
                  }
              }
              return utftext;
          },
          // private method for UTF-8 decoding
          _utf8_decode : function (utftext) {
              var string = "";
              var i = 0;
              var c = c1 = c2 = 0;
              while ( i < utftext.length ) {
                  c = utftext.charCodeAt(i);
                  if (c < 128) {
                      string += String.fromCharCode(c);
                      i++;
                  }
                  else if((c > 191) && (c < 224)) {
                      c2 = utftext.charCodeAt(i+1);
                      string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                      i += 2;
                  }
                  else {
                      c2 = utftext.charCodeAt(i+1);
                      c3 = utftext.charCodeAt(i+2);
                      string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                      i += 3;
                  }
              }
              return string;
          }
          }
          //Post the Uploaded Recording to Cloudinary
          let cloudUri = Base64.encode(succ.uri);
          console.log(cloudUri);
          let base64Aud = `data:audio/mpeg;base64,${cloudUri}`;
          console.log(base64Aud)
          let fd = new FormData();
          fd.append("file", `${base64Aud}`);
          fd.append("upload_preset", "qna2tpvj");
          fd.append("resource_type", "video")
          // fd.append("height", "200");
          // fd.append("width", "500");
          // fd.append("flags", "waveform");
          fetch('https://api.cloudinary.com/v1_1/dahfjsacf/upload', {
            method: 'POST',
            body: fd,
            })
            .then(async (response) => {
              let recordingURL = await response.json();
              console.log('Cloudinary Info:', recordingURL);
              return recordingURL;
            })
            .then('https://aloud-server.appspot.com/recording')
          .catch(err => console.log('cloudinary err'))
          })
        .catch(err => console.log('audio upload err', err))
    }

  onSaveRecording(){
    if(this.state.view !== 'save'){
      this.setState({view: 'save'})
    } else {
      this.setState({view:'record'})
    }
  }

  render() {
    if(!this.state.fontLoaded) {
        return (
            <View style={styles.emptyContainer} />
        )
    }
//* this is the pop up to ask for permissions
    if (!this.state.haveRecordingPermissions){
        return (
            <View style={styles.container}>
                <View />
                <Text style={[styles.noPermissionsText, { fontFamily: 'cutive-mono-regular' }]}>
                  You must enable audio recording permissions in order to use this app.
                </Text>
                <View />
            </View>
        )
    }
      if(this.state.view === 'record'){
          return (
            <View style={styles.container}>
              <Text></Text>
              <TouchableOpacity
                     style={styles.circleButtons}
                      onPress={rec => uploadRecFromPhone(rec)} title="Upload from Device">
                <Ionicons name={'md-cloud-upload'}
                    size={80}
                    style={styles.icon}
                    />
              </TouchableOpacity>
              <Text></Text>
                <View alignItems='center'>
                  <TouchableOpacity
                     onPress={()=> this.onSaveRecording()}
                     style={styles.circleButtons}>
                    <Ionicons name={'md-save'}
                      size={80}
                      style={styles.icon}
                      />
                  </TouchableOpacity>
                  <Text></Text>
                  
                  <TouchableOpacity
                    onPress={this._onRecordPressed}
                    style={styles.circleButtons}>
                    <Ionicons name={'md-mic'}
                    style={styles.icon}
                    size={80}
                    />
                  </TouchableOpacity>
                  
                  <Text></Text>
                      <Text style={[styles.recordingTimestamp, { fontFamily: 'cutive-mono-regular' }]}>
                        {this._getRecordingTimestamp()}
                      </Text>
                </View>
                <View style={styles.playbackContainer}>
                  <Slider
                    style={styles.playbackSlider}
                    value={this._getSeekSliderPosition()}
                    onValueChange={this._onSeekSliderValueChange}
                    onSlidingComplete={this._onSeekSliderSlidingComplete}
                    disabled={!this.state.isPlaybackAllowed || this.state.isLoading}
                    minimumTrackTintColor={'#1e001a'}
                    maximumTrackTintColor={'#1e001a'}
                    thumbTintColor={'#1e001a'}
                  />
                  <Text style={[styles.playbackTimestamp, { fontFamily: 'cutive-mono-regular' }]}>
                    {this._getPlaybackTimestamp()}
                  </Text>
                </View>
                <View style={[styles.buttonsContainerBase, styles.buttonsContainerTopRow]}>
                  <View style={styles.volumeContainer}>
                  </View>
                  <View style={styles.playStopContainer}>
                    <TouchableHighlight
                      underlayColor={BACKGROUND_COLOR}
                      onPress={this._onPlayPausePressed}
                      disabled={!this.state.isPlaybackAllowed || this.state.isLoading}>
                       {this.state.isPlaying ? <Ionicons name={'md-pause'} size={50} color={'#1e001a'} /> : <Ionicons name={'md-play'} size={50} color={'#1e001a'}/> }
                    </TouchableHighlight>
                  </View>
                </View>
                </View>
          );
} else {
  return (
    <View>
      <SaveRecordingScreen view={this.state.view} onBack={this.onSaveRecording}/>
    </View>
  )
}
}
}



const styles = StyleSheet.create({
  emptyContainer: {
    alignSelf: 'stretch',
    backgroundColor: BACKGROUND_COLOR,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: BACKGROUND_COLOR,
  },
  noPermissionsText: {
    textAlign: 'center',
  },
  wrapper: {},
  halfScreenContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  recordingContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  recordingDataContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: ICON_RECORD_BUTTON.height,
    maxHeight: ICON_RECORD_BUTTON.height,
    minWidth: ICON_RECORD_BUTTON.width * 3.0,
    maxWidth: ICON_RECORD_BUTTON.width * 3.0,
  },
  recordingDataRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playbackContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  playbackSlider: {
    alignSelf: 'stretch',
    
  },
  liveText: {
    color:'#f90909',
  },
  recordingTimestamp: {
    // paddingLeft: 20,
  },
  playbackTimestamp: {
    textAlign: 'right',
    alignSelf: 'stretch',
    paddingRight: 20,
  },
  image: {
    backgroundColor: BACKGROUND_COLOR,
  },
  textButton: {
    backgroundColor: BACKGROUND_COLOR,
    padding: 10,
  },
  buttonsContainerBase: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonsContainerTopRow: {
    maxHeight: ICON_MUTED_BUTTON.height,
    alignSelf: 'stretch',
    paddingRight: 20,
  },
  playStopContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  volumeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  volumeSlider: {
    width: DEVICE_WIDTH / 2.0 - ICON_MUTED_BUTTON.width,
  },
  buttonsContainerBottomRow: {
    alignSelf: 'stretch',
    paddingRight: 20,
    paddingLeft: 20,
  },
  rateSlider: {
    width: DEVICE_WIDTH / 2.0,
  },
  circleButtons: {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:100,
    height:100,
    backgroundColor:'#f90909',
    borderRadius:150,
  },
  bigCircleButton: {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:100,
    height:100,
    backgroundColor:'#fbf0f2',
    borderRadius:180,
  },
  icon:{
    color:'#fbf0f2'
  }
});

<<<<<<< HEAD

=======
>>>>>>> c56e3d0fcd770fdc97f296fde98614ff8f1d3a5c
RecordScreen.navigationOptions = {
  title: 'Record',
};