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
    RefreshControl
  } from 'react-native';
  import {Card} from 'react-native-elements'
  import proData  from '../src/sampleProData';
  import collData  from '../src/sampleCollData';
  import recData  from '../src/sampleRecData';
  import {Avatar} from 'react-native-elements'
  import { Ionicons } from '@expo/vector-icons';
  import axios from 'axios';
  import ProfileBio from '../components/ProfileBio'
  import CollectionsList from '../components/Lists/CollectionsList';
  import RecordingsList from '../components/Lists/RecordingsList'
  import {UserContext} from '../App'
  import * as ImagePicker from 'expo-image-picker';
  import AddCollection from '../components/AddCollection'

export default function ProfileScreen() {
  const {userName, userId, photoUrl} = useContext(UserContext)
  const [userInfo, setUserInfo] = useState([]);
  const [collections, setUserCollections] = useState([]);
  const [recordings, setUserRecordings] = useState([]);
  const [selectedImage, setSelectedImage] = React.useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const [isVisible, setVisibility] = useState(false);

  function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchContent();
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);


  const fetchContent = async () => {
    await axios.get(`https://aloud-server.appspot.com/profile/bjork/1`)
    // await axios.get(`https://aloud-server.appspot.com/profile/${userName}/${userId}`)
      .then(response => {
        console.log('response', response.data[0].collections)
        setUserInfo(response.data[0].user[0]);
        setUserCollections(response.data[0].collections);
        setUserRecordings(response.data[0].recordings);
      })
      .then(()=> console.log('then'))
      .catch(err => console.error(err));
  };

  useEffect(() => {
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
      }).then(() => {

      })
      .catch(err=>console.log(err))
      //send post rq to DB to store profile pic using (data.secure_url)
    };
  //   if (selectedImage !== null) {
  //     return (
  //       <View style={styles.container}>
  //         <ScrollView >
  //         <View alignItems='center'>
  //           <Avatar
  //             rounded title ={userInfo.name_display}
  //             size="large"
  //             source={{uri: selectedImage.localUri}}
  //           />
  //           <Text style={styles.buttonText} onPress={openImagePickerAsync}>Upload a new photo</Text> 
  //           <Text>@{userInfo.username}</Text>
  //           <Card >
  //             <Text rightIcon={{ name: 'more-horiz' }}>Bio: {userInfo.bio}</Text>
  //           </Card>
  //           <View>
  //             <CollectionsList collections={collections} />
  //             <RecordingsList recordings={recordings} />
  //          </View>
  //          </View>
  //       </ScrollView>
  //     </View>
  //   )
  // } else {
    return (
    <View style={styles.container}>
      <ScrollView
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View alignItems='center'>
          <Text></Text>
        <Avatar
          rounded title ={userInfo.name}
          size="large"
          source={{uri: userInfo.url_image}}
          onLongPress={()=>{openImagePickerAsync()}}
        />
        <Text></Text>
        <Text style={styles.name}> @{userInfo.username}</Text>
        </View>
        <Card containerStyle={{ borderWidth: 0, elevation: 0}}>
          <Text>{userInfo.bio}</Text>
        </Card>
          <Text style={styles.titleText}> Collections </Text>
          <AddCollection style={styles}isVisible={isVisible}/>
          <CollectionsList collections={collections} />
          <Text style={styles.titleText}> Recordings </Text>
          <RecordingsList recordings={recordings} />
       
    </ScrollView>
  </View>
    );
  }
// }

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
    flex:2
  },
  text: {
    alignItems: 'center',
    color:'#1e001a', 
  },
  titleText: {
    alignItems: 'center',
    color:'#1e001a',
    fontWeight:'bold',
    marginBottom: 10,
    alignItems:'center',
    justifyContent:'center',
    marginLeft: 15,
    marginTop: 10
  },
  name:{
    color:'#f90909',
    alignItems:'center',
    fontWeight:'bold',
    fontSize: 25

  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  }
});
