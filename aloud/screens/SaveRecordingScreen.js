import React, {useEffect, useState, useContext} from 'react';
import {UserContext} from '../App'
import {View, Text, TextInput, Switch, Button, AppState, StyleSheet} from 'react-native'
import { createStackNavigator } from 'react-navigation-stack';
import recNav from '../navigation/AppNavigator';
import RecordingsList from '../components/Lists/RecordingsList'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { RecordStack } from '../navigation/MainTabNavigator';
import RecordScreen from '../screens/RecordScreen';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import UPLOAD_PRESET from '../src/config/cloudinary';
export default function SaveRecordingScreen({onBack}) {
  const {userName, userId, photoUrl} = useContext(UserContext)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState('');
    const [privacySetting, setPrivacy] = useState('private');
    // const [generateTranscript, setGenerateTranscript] = useState(false)
    const [recordingUrl, setRecordingURl] = useState('')
    const [recFlash, recFlasher] = useState(null);



    saveRecording = async() => {
      //access the newly recorded audio in the filesystem
        DocumentPicker.getDocumentAsync({
          type: '*/*',
          copyToCacheDirectory: true,
          base64: true
        })
        .then(succ => {
          //check out the saved info
          //https://www.iana.org/assignments/media-types/media-types.xhtml#audio - MIME audio types
          //encrypt the audio files into a base64 string
          const Base64 = {
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
          
            console.log(`Recording Information -- path: ${succ.uri}, type: ${succ.type}, size: ${succ.size}`)
            //Post the Uploaded Recording to Cloudinary
            let cloudUri = Base64.encode(succ.uri);
            console.log(cloudUri);
            let base64Aud = `data:audio/mpeg;base64,${cloudUri}`;
            console.log(base64Aud)
            //Cloudinary Presets
            let fd = new FormData();
            fd.append("file", `${base64Aud}`);
            fd.append("upload_preset", 'qna2tpvj');
            fd.append("resource_type", "video");
            fd.append("height", "200");
            fd.append("width", "500");
            fd.append("flags", "waveform");
            fd.append("color", "black");
            fd.append("background", "white");
            fetch('https://api.cloudinary.com/v1_1/dahfjsacf/upload', {
              method: 'POST',
              body: fd
            })
            .then(async (response) => {
              let recordingURL = await response.json();
                console.log('Cloudinary Info:' + recordingUrl);
                return recordingURL;
              })
              .then(() => {
        const audioObj = {
          //TODO : dynamic user id 
          "id_user": "1",
          "title": title,
          "description": description,
          "url_recording": recordingUrl,
          "published": privacySetting,
          "speech_to_text": "sample sample sample",
        };
        fetch('https://aloud-server.appspot.com/recording', {
          method: 'POST',
          body: audioObj
        })
      })
      .then(()=> console.log('Your recording has been saved to our database'))
      .catch(err => console.log('there was an error with save recording', err))
  })
}


return (
    <View>
        <ScrollView>
        <Text>Recording Title:</Text>
        <TextInput style={{ height: 40, borderColor: 'black', borderWidth: 0.5, margin: 10 }}
        onChangeText={text => setTitle(text)}
        value={title}
        />
        <Text>Recording Description:</Text>
        <TextInput
        style={{ height: 40, borderColor: 'black', borderWidth: 0.5, margin: 10 }}
        onChangeText={text => setDescription(text)}
        value={description}/>
        <Text>Public</Text>
        <Switch onValueChange={(switchValue)=>{setPrivacy(switchValue)}} value={'public'}></Switch>
        {/* <Text>Generate Transcript</Text>
        <Switch></Switch>
        <Text>Transcript</Text>
        <TextInput></TextInput> */}
        {/* <recNav /> */}
        {/* <Button onPress={() => {
        }} title="Save My Sound" color='#f90909'/> */}
        <Button title="Select Sound" color='#f90909' onPress={()=> saveRecording()}/>
        <Button onPress={() => onBack()} title="Cancel" color='#f90909'/>
        </ScrollView>
    </View>
)};


SaveRecordingScreen.navigationOptions = {
  title: 'app.json',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor:'#841584',
    paddingTop:10,
    paddingBottom:10,
    paddingLeft : 10,
      paddingRight : 10
  },
  resetText:{
      color:'#fff',
      textAlign:'center',
      paddingLeft : 10,
      paddingRight : 10
  }
});