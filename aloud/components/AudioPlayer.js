import React from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    Dimensions,
    Slider,
  } from 'react-native';
  import {Avatar} from 'react-native-elements'
  import { Ionicons } from '@expo/vector-icons';
  import { Asset } from "expo-asset";
  import { Audio, Video } from "expo-av";
  import * as Font from "expo-font";
  import { MaterialIcons } from "@expo/vector-icons";
  import * as FileSystem from 'expo-file-system';
  import * as Permissions from 'expo-permissions';


export default function AudioPlayer() {

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
        const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
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
            isPlaybackAllowed: false,
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
          allowsRecordingIOS: false,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          playsInSilentModeIOS: true,
          playsInSilentLockedModeIOS: true,
          shouldDuckAndroid: true,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
          playThroughEarpieceAndroid: false,
          staysActiveInBackground: true,
        });
        const { sound, status } = await this.recording.createNewLoadedSoundAsync(
          {
            isLooping: true,
            isMuted: this.state.muted,
            volume: this.state.volume,
            rate: this.state.rate,
            shouldCorrectPitch: this.state.shouldCorrectPitch,
          },
          this._updateScreenForSoundStatus
        );
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
    
      onSaveRecording(){
        this.setState({recordingView: 'save'})
      }
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
    return (
          <View style={styles.playbackContainer}>
            <Slider
              style={styles.playbackSlider}
              trackImage={ICON_TRACK_1.module}
              thumbImage={ICON_THUMB_1.module}
              value={this._getSeekSliderPosition()}
              onValueChange={this._onSeekSliderValueChange}
              onSlidingComplete={this._onSeekSliderSlidingComplete}
              disabled={!this.state.isPlaybackAllowed || this.state.isLoading}
            />
            <Text style={[styles.playbackTimestamp, { fontFamily: 'cutive-mono-regular' }]}>
              {this._getPlaybackTimestamp()}
            </Text>
          </View>
          <View style={[styles.buttonsContainerBase, styles.buttonsContainerTopRow]}>
            <View style={styles.volumeContainer}>
              <TouchableHighlight
                underlayColor={BACKGROUND_COLOR}
                style={styles.wrapper}
                onPress={this._onMutePressed}
                disabled={!this.state.isPlaybackAllowed || this.state.isLoading}>
                  {this.state.muted ? <Ionicons name={'md-volume-high'} size={50} /> : <Ionicons name={'md-volume-off'} size={50}/> }
              </TouchableHighlight>
              <Slider
                style={styles.volumeSlider}
                trackImage={ICON_TRACK_1.module}
                thumbImage={ICON_THUMB_2.module}
                value={1}
                onValueChange={this._onVolumeSliderValueChange}
                disabled={!this.state.isPlaybackAllowed || this.state.isLoading}
              />
            </View>
            <View style={styles.playStopContainer}>
              <TouchableHighlight
                underlayColor={BACKGROUND_COLOR}
                style={styles.wrapper}
                onPress={this._onPlayPausePressed}
                disabled={!this.state.isPlaybackAllowed || this.state.isLoading}>
                 {this.state.isPlaying ? <Ionicons name={'md-pause'} size={50} /> : <Ionicons name={'md-play'} size={50}/> }

              </TouchableHighlight>
              <TouchableHighlight
                underlayColor={BACKGROUND_COLOR}
                style={styles.wrapper}
                onPress={this._onStopPressed}
                disabled={!this.state.isPlaybackAllowed || this.state.isLoading}>
                <Image style={styles.image} source={ICON_STOP_BUTTON.module} />
              </TouchableHighlight>
            </View>
            <View />
          </View>
          <View style={[styles.buttonsContainerBase, styles.buttonsContainerBottomRow]}>
            <Text style={[styles.timestamp, { fontFamily: 'cutive-mono-regular' }]}>Rate:</Text>
            <Slider
              style={styles.rateSlider}
              trackImage={ICON_TRACK_1.module}
              thumbImage={ICON_THUMB_1.module}
              value={this.state.rate / RATE_SCALE}
              onSlidingComplete={this._onRateSliderSlidingComplete}
              disabled={!this.state.isPlaybackAllowed || this.state.isLoading}
            />
            <TouchableHighlight
              underlayColor={BACKGROUND_COLOR}
              style={styles.wrapper}
              onPress={this._onPitchCorrectionPressed}
              disabled={!this.state.isPlaybackAllowed || this.state.isLoading}>
              <Text style={[{ fontFamily: 'cutive-mono-regular' }]}>
                PC: {this.state.shouldCorrectPitch ? 'yes' : 'no'}
              </Text>
            </TouchableHighlight>
          </View>
          <View />
        
    );
  }

