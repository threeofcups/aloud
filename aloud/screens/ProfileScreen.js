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

export default function ProfileScreen() {
  // const [proInfo, setInfo] = useState(0)
  // const [proName, setName] = useState(0)
  // const [proPic, setPic] = useState(0)
  // const [proBio, setBio] = useState(0)
  const [value, onChangeText] = React.useState('new name')
  const [edit, toggleEditMode] = useState('false')
  // toggleEditMode(false)
  state = { 
    'proInfo': proData[0].username,
    'proName': proData[1].name_display,
    'proPic': 'https://res.cloudinary.com/dahfjsacf/image/upload/v1579656042/qc35njypmtfvjt9baaxq.jpg',
    'proBio': proData[1].bio,
  };
  // handleEditMode = handleEditMode.bind(this)

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
        <Text style={styles.instructions}>{this.state['proInfo']}'s Profile</Text>
        
        {edit === 'true' ? editName: <Text>@{this.state['proName']}</Text> }
        <Avatar onPress={() => {handleEditMode()}}
        rounded title ="Dot"
        size="large"
        source={{uri: this.state.proPic}}
        /> 
        <Text>Bio: {this.state['proBio']}</Text>
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
