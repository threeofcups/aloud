import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState, useEffect } from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, Button, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import {PermissionsAndroid} from 'react-native';
import { Header } from 'react-native-elements';
import AppNavigator from './navigation/AppNavigator';
import * as Google from 'expo-google-app-auth';


export default function App() {
    const [signedIn, setSignIn] = useState('true');
    const [name, setName] = useState('');
    const [photoUrl, setPhotoUrl] = useState('')
    const [isLoadingComplete, setLoadingComplete] = useState('false');

  signIn = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "1001786307226-3b5813q7pc0g9j32gjqd5vp58g28shpk.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      })
       if (result.type === "success") {
      
          setSignIn("true");
          setName(result.user.name);
          setPhotoUrl(result.user.photoUrl)
          
        
      } else {
        console.log("cancelled")
      }
    } catch (e) {
      console.log("error", e)
    }
  }


    return (
    
      <View style={styles.container}>
        {signedIn === 'true' ? (
          <LoggedInPage name={name} photoUrl={photoUrl} />
          ) : (
            <LoginPage signIn={signIn} />
            )}
      </View>
    ) 
          }  
      
          
const LoginPage = props => {
  return (
    <View>
      <Text style={styles.header}>Sign In With Google</Text>
      <Button title="Sign in with Google" onPress={() => props.signIn()} />
    </View>
  )
}

const LoggedInPage = props => {
  return (
    <View style={styles.container}>
      <Header 
      backgroundColor={'#fbf0f2'}
      centerComponent={{ text: 'Aloud', style: { color: '#f90909' } }}
      />
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
      <Text style={styles.header}>Welcome:{props.name}</Text>
      <Image style={styles.image} source={{ uri: props.photoUrl }} />
        <AppNavigator />
    </View>
  )
}


async function requestCameraPermission() {
  // RECORD_AUDIO: 'android.permission.RECORD_AUDIO'
  // READ_EXTERNAL_STORAGE: 'android.permission.READ_EXTERNAL_STORAGE'
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
