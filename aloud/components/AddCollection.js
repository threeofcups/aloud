
import React, {useState, useContext}  from 'react';
import { Ionicons } from '@expo/vector-icons';
import { TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ListItem, Card, Overlay } from 'react-native-elements';
import {Image, Platform, ScrollView, StyleSheet, Text, Button, TextInput, Icon,  TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';
import axios from 'axios';
import { bundleDirectory } from 'expo-file-system';
import {UserContext} from '../App'
import * as ImagePicker from 'expo-image-picker';
// import { Ionicons } from '@expo/vector-icons';


export default function AddCollection(props) {
    const [isVisible, setVisibility] = useState(false);
    const [uploadedImage, setUploadedImage] = useState('');
    const [collectionDescription, setCollectionDescription] = useState('');
    const [collectionTitle, setCollectionTitle] = useState('');
    const {userName, userId, photoUrl} = useContext(UserContext)



//Todo Style
//Todo user feedback for image uploaded
const onSaveCollection = async() => {
    await axios.post('https://aloud-server.appspot.com/collection/save', {

    "id_user_creator": "1",
      "title": collectionTitle,
        "description": collectionDescription,
          "url_image": uploadedImage
  
    })
    .then(()=> setVisibility(false))
    .catch((err)=> {console.error( err)})
}

let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect:[4, 3],
      base64: true
    });
    if (pickerResult.cancelled === true) {
      return;
    }
   
    //save image to cloudinary db
    setUploadedImage({ localUri: pickerResult.uri })
  let base64Img = `data:image/jpg;base64,${pickerResult.base64}`;
  let cloud = 'https://api.cloudinary.com/v1_1/dahfjsacf/upload';
  const data = {
    'file': base64Img,
    'upload_preset': 'qna2tpvj',
  }
    // then send POST to server to save user's current image
    fetch(cloud, {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
    }).then(async r => {
        let data = await r.json()
        console.log('hi',data.secure_url)
        return data.secure_url
    }).then(()=> {
        setUploadedImage(data.secure_url)
     
    })
    .then((data) => {
      console.log('image',uploadedImage)
    })
    .catch((err) => {
        return console.log(err);
    })
    //send post rq to DB to store profile pic using (data.secure_url)
  };

        return (
            <View alignItems={'center'}>

            <Ionicons name={'md-add-circle-outline'} onPress={()=> setVisibility(true)} size={50} color={'#f90909'}/>
            

<Overlay
  isVisible={isVisible}
  onBackdropPress={() => setVisibility(false)}
>
    <Image source={{uri : uploadedImage}}/>
    <Button title='Upload Image' onPress={()=> openImagePickerAsync()} color={'#eac2cd'}/>
    

<Text>Recording Title:</Text>
        <TextInput style={{ height: 40, borderColor: 'black', borderWidth: 0.5, margin: 10 }}
        // onChangeText={text => setTitle(text)}
        // value={title}
        />
        <Text>Recording Description:</Text>
        <TextInput
        style={{ height: 80, borderColor: 'black', borderWidth: 0.5, margin: 10 }}
        // onChangeText={text => setDescription(text)}
        // value={description}
        />
  <Button title='back' onPress={()=> setVisibility(false)} color={'#eac2cd'}></Button>
  <Button title='add collection' onPress={()=> onSaveCollection()} color={'#eac2cd'}></Button>
           
</Overlay>

   
</View>
   
   );
}






// a square to start off the collection list in the profile view? or library



// a screen to upload collection image, collection description collection title 
