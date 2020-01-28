import React, {useState, useEffect} from 'react';
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
  import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {

  const [userInfo, setUserInfo] = useState([]);
  const [collections, setUserCollections] = useState([]);
  const [recordings, setUserRecordings] = useState([]);
   //Profile image hook uploader
  const [selectedImage, setSelectedImage] = React.useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      await axios.get(`https://aloud-server.appspot.com/profile/`)
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
      let pickerResult = await ImagePicker.launchImageLibraryAsync();
      if (pickerResult.cancelled === true) {
        return;
      }
      setSelectedImage({ localUri: pickerResult.uri });
    };
    if (selectedImage !== null) {
      return (
        <View style={styles.container}>
        <ScrollView>
        <Text style={styles.text} >aloud</Text>
        <Avatar
        rounded title ={userInfo.name_display}
        size="large"
        source={{uri: selectedImage.localUri}}
        />
        <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
        <Text style={styles.buttonText}>Upload a new photo</Text>
        </TouchableOpacity>
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
    <Text style={styles.text} >aloud</Text>
    <Avatar
    rounded title ={userInfo.name_display}
    size="large"
    source={{uri: userInfo.url_image}}
    />
    <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
    <Text style={styles.buttonText}>Upload a new photo</Text>
    </TouchableOpacity>
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
    width: 50, height: 50,
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
