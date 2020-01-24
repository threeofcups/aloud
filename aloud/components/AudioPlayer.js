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
} from "react-native";
import { Asset } from "expo-asset";
import { Audio, Video } from "expo-av";
import * as Font from "expo-font";
import { MaterialIcons } from "@expo/vector-icons";

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");
const BACKGROUND_COLOR = "#FFF8ED";
const DISABLED_OPACITY = 0.5;
const FONT_SIZE = 14;
const LOADING_STRING = "... loading ...";
const BUFFERING_STRING = "...buffering...";
const RATE_SCALE = 3.0;
const VIDEO_CONTAINER_HEIGHT = (DEVICE_HEIGHT * 2.0) / 5.0 - FONT_SIZE * 2;

 
export default function SaveView() {



  return (
    <View
    style={[
      styles.halfScreenContainer,
      {
        opacity:
          !this.state.isPlaybackAllowed || this.state.isLoading ? DISABLED_OPACITY : 1.0,
      },
    ]}>
    <View />
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
           {this.state.isPlaying ? <Ionicons name={'md-play'} size={50} /> : <Ionicons name={'md-pause'} size={50}/> }

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
  </View>
  )
}
