import React, {useState} from 'react';
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
  import CollectionsList from '../components/Lists/CollectionsList';
  import RecordingsList from '../components/Lists/RecordingsList'
  import axios from 'axios';
  //'proPic': 'https://res.cloudinary.com/dahfjsacf/image/upload/v1579656042/qc35njypmtfvjt9baaxq.jpg',

export default function ProfileScreen() {
  const [proInfo, setInfo] = useState(proData[0].username)
  const [proName, setName] = useState(proData[0].name_display)
  const [proPic, setPic] = useState(proData[0].url_image)
  const [proBio, setBio] = useState(proData[0].bio)
  const [value, onChangeText] = React.useState('new name')
  const [edit, toggleEditMode] = useState('false')
  const [collImg] = useState(collData[0].url_image)
  const [recTitle] = useState(recData[0].title) 
  const [recDescription] = useState(recData[0].description)
  const [recContent] = useState(recData[0].url_recording) 
  const [records] = useState(recData);

 const handleEditMode = ()=> {
   console.log('dot')
    if(edit === 'false'){
      toggleEditMode('true');
    } else{
      toggleEditMode('false');
    }
    console.log(edit)
  }
    const editName =  <TextInput
    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
    onChangeText={text => onChangeText(text)}
    value={value}/>

    return (
      // todo center text and avatar
        <View style={styles.container}>
          <ScrollView>
        {/* {edit === 'true' ? editName:  */}
        {/* //! handleEditMode is not being used for mvp */}
        <Avatar 
        // onPress={() => {handleEditMode()}}
        rounded title ={proName[0].toUpperCase()}
        size="large"
        source={{uri: proPic}}
        style={styles.image}
        />
        <Button onPress={(event) => {
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
        <Text>@{proName}</Text> 
     
        <Card >
        <Text rightIcon={{ name: 'more-horiz' }}> Bio: {proBio}</Text>
        
        </Card>
        <CollectionsList />
     <View>
        <RecordingsList /> 
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
