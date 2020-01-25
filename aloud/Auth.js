import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState, useEffect } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import {PermissionsAndroid} from 'react-native';
import { Header } from 'react-native-elements';

import AppNavigator from './navigation/AppNavigator';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      signedIn: false,
      name: "",
      photoUrl: ""
    }
    signIn = async () => {
      try {
        const result = await Google.logInAsync({
          androidClientId:
            "1001786307226-3b5813q7pc0g9j32gjqd5vp58g28shpk.apps.googleusercontent.com",
          //iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
          scopes: ["profile", "email"]
        })
  
        if (result.type === "success") {
          this.setState({
            signedIn: true,
            name: result.user.name,
            photoUrl: result.user.photoUrl
            //! we probably have access to more stuff
          })
        } else {
          console.log("cancelled")
        }
      } catch (e) {
        console.log("error", e)
      }
    }
      return (
        <View style={styles.container}>
          {this.state.signedIn ? (
            <LoggedInPage name={this.state.name} photoUrl={this.state.photoUrl} />
          ) : (
            <LoginPage signIn={this.signIn} />
          )}
        </View>
      )
    }
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
          // rightComponent={}
          />
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <Text style={styles.header}>Welcome:{props.name}</Text>
          <Image style={styles.image} source={{ uri: props.photoUrl }} />
            <AppNavigator />
        </View>
      
      )
    }
    
        
    //     return (
    //       <View style={styles.container}>
    //     {/* //todo messaging icon */}
    //   <Header 
    //   backgroundColor={'#fbf0f2'}
    //   centerComponent={{ text: 'Aloud', style: { color: '#f90909' } }}
    //   // rightComponent={}
    //   />
    //     {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
    //     <AppNavigator />
    //   </View>
    // );

//here



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
