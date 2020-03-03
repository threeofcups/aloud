
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

export default function AddCollection(props) {
  const [uploadedImage, setUploadedImage] = useState('');
  const [collectionDescription, setCollectionDescription] = useState('');
  const [collectionTitle, setCollectionTitle] = useState('');
  const {userName, userId, photoUrl} = useContext(UserContext);
  const [isVisible, setVisibility] = useState(false);


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
    setUploadedImage({ localUri: pickerResult.uri })
  }

const onSaveCollection= async() => {

  let base64Img = `data:image/jpg;base64,${pickerResult.base64}`;
  let cloud = 'https://api.cloudinary.com/v1_1/dahfjsacf/upload';
  const data = {
    'file': base64Img,
    'upload_preset': 'qna2tpvj',
    };
    // then send POST to server to save user's current image
    fetch(cloud, {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
    })
    .then(async r => {
        let data = await r.json()
        console.log('hi',data.secure_url)
        return data.secure_url
    })
    .then(async () => {
      await axios.post('https://aloud-server.appspot.com/collection/save', {
        "id_user_creator": "1",
          "title": collectionTitle,
            "description": collectionDescription,
              "url_image": data.secure_url
            })
    })
    .then(() => {
      console.log('thats in our aloud collection now');
    })
    .catch((err) => {
        return console.log('error fetching', err);
    })
    //send post rq to DB to store profile pic using (data.secure_url)
  };

return (
  <View alignItems={'center'}>
    <Ionicons name={'md-add-circle-outline'}
      onPress={()=> setVisibility(true)}
      size={30}
      color={'#f90909'}
      />
      <Overlay
      isVisible={isVisible}
      onBackdropPress={() => setVisibility(false)}
      >
      <Image source={{uri : uploadedImage}}/>
      <Button
      title='Upload Collection Image'
      onPress={()=> openImagePickerAsync()} color={'#eac2cd'}/>

      <Text>New Collection Title:</Text>
      <TextInput style={{ height: 40, borderColor: 'black', borderWidth: 0.5, margin: 10 }}
          onChangeText={text => setCollectionTitle(text)}
          value={collectionTitle}
          />
      <Text>Collection Description:</Text>
      <TextInput
          style={{ height: 80, borderColor: 'black', borderWidth: 0.5, margin: 10 }}
          onChangeText={text => setCollectionDescription(text)}
          value={collectionDescription}
          />
      <Button title='back' onPress={()=> setVisibility(false)} color={'#eac2cd'}></Button>
      <Button title='add collection' onPress={()=> onSaveCollection()} color={'#eac2cd'}></Button>
      </Overlay>
      </View>
)}
  //  );
    // } else {
    //   return(
    //     <View alignItems={'center'}>
    //       <Text>New Collection</Text>
    //   <Ionicons name={'md-add-circle-outline'}
    //   onPress={()=> setVisibility(true)}
    //   size={25}
    //   color={'#f90909'}
    //   />
    //   <Overlay
    //   isVisible={isVisible}
    //   onBackdropPress={() => setVisibility(false)}
    //   >
    //   <Image source={{uri : data.secure_url}}/>
    //   <Button title='Upload Collection Image' onPress={()=> openImagePickerAsync()} color={'#eac2cd'}/>
    //   <Text>New Collection Title:</Text>
    //   <TextInput style={{ height: 40, borderColor: 'black', borderWidth: 0.5, margin: 10 }}/>
    //   <Text>collection Description:</Text>
    //   <TextInput style={{ height: 80, borderColor: 'black', borderWidth: 0.5, margin: 10 }}/>
    //   <Button title='back' onPress={()=> setVisibility(false)} color={'#eac2cd'}></Button>
    //   <Button title='add collection' onPress={()=> onSaveCollection()} color={'#eac2cd'}></Button>
    //   </Overlay>
    //   </View>
{/* <View alignItems={'center'}>
      <Text>New Collection</Text>
    <Ionicons name={'md-add-circle-outline'}
    onPress={()=> setVisibility(true)}
    size={25}
    color={'#f90909'}
    />
    <Overlay
    isVisible={isVisible}
    onBackdropPress={() => setVisibility(false)}
    >
    <Image source={{uri : data.secure_url}}/>
    <Button title='Upload Collection Image' onPress={()=> openImagePickerAsync()} color={'#eac2cd'}/>
    <Text>New Collection Title:</Text>
    <TextInput style={{ height: 40, borderColor: 'black', borderWidth: 0.5, margin: 10 }}/>
    <Text>Collection Description:</Text>
    <TextInput style={{ height: 80, borderColor: 'black', borderWidth: 0.5, margin: 10 }}/>
    <Button title='back' onPress={()=> setVisibility(false)} color={'#eac2cd'}></Button>
    <Button title='add collection' onPress={()=> onSaveCollection()} color={'#eac2cd'}></Button>
    </Overlay>
    </View> */}
//);
//};
// import { Ionicons } from '@expo/vector-icons';


// export default function AddCollection(props) {
//     const [isVisible, setVisibility] = useState(false);
//     const [uploadedImage, setUploadedImage] = useState('');
//     const [collectionDescription, setCollectionDescription] = useState('');
//     const [collectionTitle, setCollectionTitle] = useState('');
//     const {userName, userId, photoUrl} = useContext(UserContext)

//     let openImagePickerAsync = async () => {
//       let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
      
//       if (permissionResult.granted === false) {
//         alert('Permission to access camera roll is required!');
//         return;
//       }
  
//       let pickerResult = await ImagePicker.launchImageLibraryAsync({
//         allowsEditing: true,
//         aspect:[4, 3],
//         base64: true
//       });
      
//       if (pickerResult.cancelled === true) {
//         return;
//       }
//       setUploadedImage({ localUri: pickerResult.uri })
//     }

//     const onSaveCollection = async() => {
//       await axios.post('https://aloud-server.appspot.com/collection/save', {
//       "id_user_creator": "1",
//         "title": collectionTitle,
//           "description": collectionDescription,
//             "url_image": data.secure_url
//     })
//       //.then(()=> setVisibility(false))
//     //  .catch(err => console.error('err saving that collection', err))
//   //}
  
//     .then(() => {
//     let base64Img = `data:image/jpg;base64,${pickerResult.base64}`;
//     let cloud = 'https://api.cloudinary.com/v1_1/dahfjsacf/upload';
//     const data = {
//     'file': base64Img,
//     'upload_preset': 'qna2tpvj',
//     }
//     fetch(cloud, {
//       body: JSON.stringify(data),
//       headers: {
//         'content-type': 'application/json'
//       },
//       method: 'POST',
//     }).then(async r => {
//         let data = await r.json()
//         console.log('cloudinary secure url', data.secure_url)
//         let collURL = data.secure_url;
//         return setUploadedImage(collURL);
//     })
//     .then(() => {
//       console.log('your collection details:');
//       await axios.post('https://aloud-server.appspot.com/collection/save', {
//       "id_user_creator": "1",
//         "title": collectionTitle,
//           "description": collectionDescription,
//             "url_image": collURL
//     })
//   })
//       .then(()=> setVisibility(false))
//       .catch((err)=> console.error('uh oh! No new collection for you!', err))
//   })

//   if (data.secure_url !== null) {
//   return (
//     <View alignItems={'center'}>
//     <Ionicons name={'md-add-circle-outline'}
//     onPress={()=> setVisibility(true)}
//     size={25}
//     color={'#f90909'}
//     />
//     <Overlay
//     isVisible={isVisible}
//     onBackdropPress={() => setVisibility(false)}
//     >
//     <Image source={{uri : uploadedImage}}/>
//     <Button 
//     title='Upload Collection Image' 
//     onPress={()=> openImagePickerAsync()} color={'#eac2cd'}/>

//     <Text>New Collection Title:</Text>
//     <TextInput style={{ height: 40, borderColor: 'black', borderWidth: 0.5, margin: 10 }}
//         onChangeText={text => setCollectionTitle(text)}
//         value={collectionTitle}
//         />
//     <Text>Collection Description:</Text>
//     <TextInput
//         style={{ height: 80, borderColor: 'black', borderWidth: 0.5, margin: 10 }}
//         onChangeText={text => setCollectionDescription(text)}
//         value={collectionDescription}/>
//     <Button title='back' onPress={()=> setVisibility(false)} color={'#eac2cd'}></Button>
//     <Button title='add collection' onPress={()=> onSaveCollection()} color={'#eac2cd'}></Button>
//     </Overlay>
//     </View>
//   );
//   } else {
//     return(
//       <View alignItems={'center'}>
//         <Text>New Collection</Text>
//     <Ionicons name={'md-add-circle-outline'}
//     onPress={()=> setVisibility(true)}
//     size={25}
//     color={'#f90909'}
//     />
//     <Overlay
//     isVisible={isVisible}
//     onBackdropPress={() => setVisibility(false)}
//     >
//     <Image source={{uri : data.secure_url}}/>
//     <Button title='Upload Collection Image' onPress={()=> openImagePickerAsync()} color={'#eac2cd'}/>
//     <Text>New Collection Title:</Text>
//     <TextInput style={{ height: 40, borderColor: 'black', borderWidth: 0.5, margin: 10 }}/>
//     <Text>collection Description:</Text>
//     <TextInput style={{ height: 80, borderColor: 'black', borderWidth: 0.5, margin: 10 }}/>
//     <Button title='back' onPress={()=> setVisibility(false)} color={'#eac2cd'}></Button>
//     <Button title='add collection' onPress={()=> onSaveCollection()} color={'#eac2cd'}></Button>
//     </Overlay>
//     </View>
//     )
//   }
// }
