import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState, useEffect, Component } from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, Button, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import {PermissionsAndroid} from 'react-native';
import { Header } from 'react-native-elements';
import AppNavigator from './navigation/AppNavigator';
import * as Google from 'expo-google-app-auth';
import axios from 'axios';
import Logo from './assets/images/image.svg'
// disables yellow warnings
console.disableYellowBox = true;

export const UserContext = React.createContext();
export default function App() {
    const [signedIn, setSignIn] = useState('true');
    // const [name, setName] = useState('');S
    const [photoUrl, setPhotoUrl] = useState('')
    const [isLoadingComplete, setLoadingComplete] = useState('false');
    const [userName, setUsername] = useState('temp')
    const [googleId, setGoogleId] = useState('')
    const [state, setTheState] = useState({userName, photoUrl})
    signIn = async () => {
      try {
        const result = await Google.logInAsync({
          androidClientId:
          "1001786307226-3b5813q7pc0g9j32gjqd5vp58g28shpk.apps.googleusercontent.com",
          scopes: ["profile", "email"]
        })
        if (result.type === "success") {
          // console.log(result)
          setSignIn("true");
          setUsername(result.user.name);
          setPhotoUrl(result.user.photoUrl)
          setGoogleId(result.user.id)
          axios.post('https://aloud-server.appspot.com/user/signup', {
            //Todo insert body
    "user": {
      "email": result.user.email,
        "familyName": result.user.familyName,
          "givenName": result.user.givenName,
            "id": result.user.id,
              "name": result.user.name,
                "photoUrl": result.user.photoUrl

    }})
          .then(response => {
            setTheState({userName:result.user.name, googleId: result.user.id, photoUrl:result.user.photoUrl, userId:response[0].id})
          
          })
          .catch(console.error('there was an error saving user'))
        
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
          <UserContext.Provider value={state}>
            <LoggedInPage name={userName} photoUrl={photoUrl} />
            </UserContext.Provider>
          ) : (
            <LoginPage signIn={signIn} />
            )}
      </View>
            
    ) 
          }  
      
          
const LoginPage = props => {
  return (
    <View >
  <Header
      style={styles.container}
      backgroundColor={'#fbf0f2'}
      centerComponent={Logo}
      />
    <View>
      <Text></Text>
      <Text style={styles.header }></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Button title="Sign in with Google" color='#f90909' onPress={() => props.signIn()} />
    </View>
    </View>
  )
}

const LoggedInPage = props => {
  return (
    
    <View style={styles.container}>
       <Header
      style={styles.container}
      backgroundColor={'#fbf0f2'}
      centerComponent={Logo}
      />
      <View backgroundColor={'#fbf0f2'}>

      </View>
    
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
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
  playback: {

  }
});
