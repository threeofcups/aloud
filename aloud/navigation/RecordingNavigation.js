import React, { Component } from 'react';
import { AppRegistry, Navigator } from 'react-native';
import SaveScreen from '../screens/SaveRecordingScreen'
// import Apple from './app/Apple';
// import Orange from './app/Orange'
import SaveRecordingScreen from '../screens/RecordScreen';
import RecordScreen from '../screens/RecordScreen'

class RecordingNavigator extends Component {
  render() {
    return (
      <View>
        
      <Navigator
        initialRoute={{screen: 'Record'}}
        renderScene={(route, nav) => {return this.renderScene(route, nav)}}
        />
        </View>
    )
  }

  renderScene(route,nav) {
    switch (route.screen) {
      case "Record":
        return <RecordScreen navigator={RecordingNavigator} />
      case "Save":
        return <SaveRecordingScreen navigator={RecordingNavigator} />
      }
  }
}

AppRegistry.registerComponent('recordingNavigator', () => recordingNavigator);