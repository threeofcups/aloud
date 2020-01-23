import React, {useState} from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput
  } from 'react-native';
  import proData  from '../src/sampleProData';
  import collData  from '../src/sampleCollData';
  import recData  from '../src/sampleRecData';
  import {Avatar} from 'react-native-elements'
  import SoundsListItem from '../components/SoundsListItem'
  //     'proPic': 'https://res.cloudinary.com/dahfjsacf/image/upload/v1579656042/qc35njypmtfvjt9baaxq.jpg',

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
      <View style={styles.container}>
        <Text style={styles.welcome}>aloud</Text>
        <Text style={styles.instructions}>{proInfo}'s Profile</Text>
        
        {edit === 'true' ? editName: <Text>@{proName}</Text> }
        {/* //! handleEditMode is not being used for mvp */}
        <Avatar onPress={() => {handleEditMode()}}
        rounded title ="Dot"
        size="large"
        source={{uri: proPic}}
        />
        <Text>Bio: {proBio}</Text>

        {/* // sidescrollview for collections */}
        <Text> {proInfo}'s Collections</Text> 
      <Image
      source={{uri: collImg, width: 64, height: 64}} />
     <Text> {proInfo}'s Sounds</Text>

     {/* componet for recording list */}
     <ScrollView>
       {records.map(record => {
         <SoundsListItem record={record}/>
       })}
      <Text>{recTitle}</Text>
      <Text>{recDescription} </Text>
      <View
      source={{uri: recContent, width: 64, height: 64}} />
      </ScrollView>
        {/* <Text style={styles.instructions}>{instructions}</Text> */}
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
  }
});
