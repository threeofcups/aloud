import React, {useState, useEffect, useContext} from 'react';
import {
    Image,
    Button,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    ListItem,
  } from 'react-native';
  import {Card} from 'react-native-elements'
  import proData  from '../src/sampleProData';
  import collData  from '../src/sampleCollData';
  import recData  from '../src/sampleRecData';
  import {Avatar} from 'react-native-elements'
  import { Ionicons } from '@expo/vector-icons';
  import axios from 'axios';
  import CollectionsList from '../components/Lists/CollectionsList';
  import RecordingsList from '../components/Lists/RecordingsList'
  import {UserContext} from '../App'
  import * as ImagePicker from 'expo-image-picker';
export default function ProfileScreen() {
  //todo id
  const {userName, userId, photoUrl} = useContext(UserContext)
  const [userInfo, setUserInfo] = useState([]);
  const [collections, setUserCollections] = useState([]);
  const [recordings, setUserRecordings] = useState([]);
   //Profile image hook uploader
  const [selectedImage, setSelectedImage] = React.useState(null);
  useEffect(() => {
    console.log(userName)
    console.log(userId)
    const fetchContent = async () => {
      await axios.get(`https://aloud-server.appspot.com/profile/björk/1`)
        .then(response => {
          setUserInfo(response.data[0].user[0]);
          setUserCollections(response.data[0].collections);
          setUserRecordings(response.data[0].recordings);
        })
        .catch(err => console.error(err));
    };
    fetchContent()
  }, []);
    //profile image uploader
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
      setSelectedImage({ localUri: pickerResult.uri });
      //save image to cloudinary db
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
          console.log(data.secure_url)
          return data.secure_url
      }).catch(err=>console.log(err))
      //send post rq to DB to store profile pic using (data.secure_url)
    };
    if (selectedImage !== null) {
      return (
        <View style={styles.container}>
        <ScrollView>
        <Avatar
        rounded title ={userInfo.name_display}
        size="large"
        source={{uri: selectedImage.localUri}}
        />
        <Text style={styles.buttonText} onPress={openImagePickerAsync}>Upload a new photo</Text>
        <Text>@{userInfo.username}</Text>
        <Card >
        <Text rightIcon={{ name: 'more-horiz' }}>Bio: {userInfo.bio}</Text>
        </Card>
        <View>
        <CollectionsList collections={collections} />
        <RecordingsList recordings={recordings} />
        </View>
        </ScrollView>
        </View>
    )
  } else {
    return (
    <View style={styles.container}>
    <ScrollView>
    <Avatar
    rounded title ={userName}
    size="large"
    source={{uri: photoUrl}}
    />
    <TouchableOpacity
    onPress={openImagePickerAsync}
    style={styles.text}>
    <Text style={styles.text}>
    Upload a new profile photo
    </Text>
    </TouchableOpacity>
    <Text style={styles.text}> @ {userName}
    </Text>
    <Card >
    <Text
    rightIcon={{ name: 'more-horiz' }}>Bio: {userInfo.bio}</Text>
    </Card>
      <View>
      <Text style={styles.text}> Collections </Text>
        <CollectionsList collections={collections} />
        <Text style={styles.text}> Recordings </Text>
        <RecordingsList recordings={recordings} />
      </View>
    </ScrollView>
    </View>
    );
  }
}

//  const handleEditMode = ()=> {
//     if(edit === 'false'){
//       toggleEditMode('true');
//     } else{
//       toggleEditMode('false');
//     }
//     console.log(edit)
//   }
    // const editName =  <TextInput
    // style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
    // onChangeText={text => onChangeText(text)}
    // value={value}/>

ProfileScreen.navigationOptions = {
  title: 'Profile',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems:'center'
  },
  image: {
    justifyContent: 'center',
    width: 100, height: 100,
    position: 'relative',
  },
  text: {
    alignItems: 'center'
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  }
});
