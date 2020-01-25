import React, {useState, useEffect} from 'react';
import {
    Image,
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
      // todo center text and avatar
        <View style={styles.container}>
        <ScrollView>
        <Text style={styles.text} >aloud</Text>
        {/* {edit === 'true' ? editName:  */}
        {/* //! handleEditMode is not being used for mvp */}
        <Avatar 
        // onPress={() => {handleEditMode()}}
        rounded title ={userInfo.name_display}
        size="large"
        source={{uri: userInfo.url_image}}
        />
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
    width: 50, height: 50
  },
  text: {
    alignItems: 'center'
  }
});
