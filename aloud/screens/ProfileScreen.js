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

  //'proPic': 'https://res.cloudinary.com/dahfjsacf/image/upload/v1579656042/qc35njypmtfvjt9baaxq.jpg',
 

export default function ProfileScreen() {

  const [userInfo, setUserInfo] = useState([]);
  const [collections, setUserCollections] = useState([]);
  const [recordings, setUserRecordings] = useState([]);

  useEffect(() => {
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

 const handleEditMode = ()=> {
    if(edit === 'false'){
      toggleEditMode('true');
    } else{
      toggleEditMode('false');
    }
    console.log(edit)
  }
    // const editName =  <TextInput
    // style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
    // onChangeText={text => onChangeText(text)}
    // value={value}/>

    return (
     
        <View style={styles.container}>
        <ScrollView>
        <Text style={styles.text} >aloud</Text>
        <Avatar 
        rounded title ={userInfo.name_display}
        size="large"
        source={{uri: userInfo.url_image}}
        />
        <Text>@{userInfo.username}</Text>
        <Card >
        <Text rightIcon={{ name: 'more-horiz' }}>Bio: {userInfo.bio}</Text>
        </Card>
        
        {/* <Button onPress={(event) => {
          const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dahfjsacf/upload';
          const CLOUDINARY_UPLOAD_PRESET = 'qna2tpvj';
          const defaultHeaders = {
            'Content-Type': 'application/x-www-form-urlencoded'
          };
          const file = event.target.files;
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
            axios({
              url: CLOUDINARY_URL,
              method: 'POST',
              headers: defaultHeaders,
              data: formData
            })
            .then(res => console.log(res))
            .catch(err => console.log(err))
          }} title='upload photo' color="#841584">
          </Button>
   */}
          <View>
            <CollectionsList collections={collections} />
            <RecordingsList recordings={recordings} />
          </View>
      </ScrollView>
      </View>     
    );
  }


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
  }
});
