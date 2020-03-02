// import React, {useState, useEffect} from 'react';
// import { Audio } from "expo-av";
// import axios from 'axios';
// import Colors from '../../constants/Colors';
// import { LinearGradient } from 'expo-linear-gradient';
// import { View, StyleSheet, Modal, Text, ScrollView, Picker, TouchableOpacity  } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { ListItem, Card, Overlay, Button, Icon, CardItem } from 'react-native-elements';

// export default function RecordingsListItem({ recording }) {
//   const [src, setSrc] = useState(recording.url_recording);
//   const [isPlaying, setPlayStatus] = useState('');
//   const [playback, setPlayback] = useState('');
//   const [iconStatus, setIconStatus] = useState('play-circle-filled');
//   const [modalVisible, setModalVisible] = useState(false);
//   const [collectionsModalVisible, setCollectionsVisible] = useState(false);
//   const [collections, setCollections] = useState([]);
//   const [choiceCollection, setChoiceCollection] = useState([]);
//   const [iconColor, setIconColor] = useState('#f90909');
//   const [backgroundColor, setBackground] = useState('#fbf0f2');

//   const fetchCollectionContent = async () => {
//     await axios.get('https://aloud-server.appspot.com/profile/bjork/1')
//       .then(response => {
//         setCollections(response.data[0].collections);
//       })
//       .catch(err => console.log('there was an axios err', err))
//   };


//   const loadAudio = () => {
//     const loadSetup = async() => {
//     try {
//       const playback = new Audio.Sound()
//       const source = {
//         uri: src,
//       }
//       const status = {
//         shouldPlay: isPlaying,
//         isPlaybackAllowed: true
//       }
//       await playback.loadAsync(source, status);
//       return playback;
//     } catch (e) {
//       console.log(e);
//     }
//   }

//   loadSetup()
//   .then(playback => setPlayback(playback))
//   .catch(e => console.error(e));

//   };

//   const setAudioMode = async() => {
//     try {
//       await Audio.setAudioModeAsync({
//         allowsRecordingIOS: false,
//         interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
//         playsInSilentModeIOS: true,
//         interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
//         shouldDuckAndroid: true,
//         staysActiveInBackground: true,
//         playThroughEarpieceAndroid: true
//       })
//       loadAudio()
//     } catch (e) {
//       console.log(e)
//     }
//   };

//   useEffect(() => {

    
//     setAudioMode();
//     fetchCollectionContent();

//   }, []);

//   const handlePlayPause = async () => {
//   if(isPlaying) {
//     await playback.pauseAsync();
//     setIconColor('#f90909');
//     setIconStatus('play-circle-filled');
//     setBackground('#fdfffc');
//   } else {
//     await playback.playAsync();
//     setIconColor('#eac2cd');
//     setIconStatus('pause-circle-filled');
//     setBackground('#fbf0f2');
//   }

//   setPlayStatus(!isPlaying);
//   };
  
//   const openModal = () => {
//     setModalVisible(!modalVisible);
//   }

//   const saveToLibrary = async () => {
//     await axios.post(`https://aloud-server.appspot.com/library/save/recording/${recording.id}`, {
//       "userId": "1"
//     })
//       .then(success => {
//         console.log(success);
//       })
//       .catch(err => console.log('there was an axios err:', err))
//   };

//   const saveToCollection = async () => {
//     await axios.post(`https://aloud-server.appspot.com/recording/${choiceCollection.id}`, {
//       "recordingId": recording.id
//     })
//       .then(success => {
//         console.log(success);
//       })
//       .catch(err => console.log('there was an axios err:', err))
//   };

//   const handleCollectionAdd = () => {
//     saveToCollection();
//   };

//   const handleLibraryAdd = () => {
//     saveToLibrary();
//   };

//   const modalBackdropPress = () => {
//     setModalVisible(false) 
//     setCollectionsVisible(!collectionsModalVisible)
//   }

//   return (
//     <View style={styles.container}>
//       <Overlay
//         onBackdropPress={() => setModalVisible(false)}
//         style={styles.modal}
//         animationType="fade"
//         transparent={true}
//         isVisible={modalVisible}
//         onRequestClose={() => {
//           setModalVisible(!modalVisible)
//         }}>
//         <ScrollView style={{ marginTop: 0, flex: 1, backgroundColor: 'transparent' }}>
//           <View>
//             <LinearGradient
//             colors={['#eac2cd', '#ffefef','#ffefef','#ffefef']}
//               // colors={['#fb5656', '#eac2cd', '#eac2cd', '#eac2cd']}
//             >
//             <Icon
//               name={iconStatus}
//               underlayColor='#fbf0f2'
//               onPress={() => handlePlayPause()}
//               iconStyle={{ marginTop: 65, margin: 22, color: iconColor}}
//               size={60}
//             />
//             <Text style={{ textAlign: "center", fontWeight: 'bold', fontSize: 22, color: '#1e001a'}}>{recording.title}</Text>
//             <Text style={{ textAlign: "center", fontWeight: 'bold', color: '#f90909'}}>@{recording.username}</Text>
//             <Text style={{ marginTop: 11, marginLeft: 22, textAlign: "left" }}>{recording.description}</Text>
//             {/* <Text style={{ marginTop: 11, marginLeft: 22, textAlign: "left", color: '#f90909' }}>google voice to text</Text>
//             <Text style={{ marginLeft: 22, marginBottom: 22, textAlign: "left" }}>{recording.speech_to_text}</Text> */}
//             <TouchableOpacity
//               onPress={() => {
//                 setCollectionsVisible(!collectionsModalVisible);
//               }} 
//               title="add to collection"
//             >
//                 <Text style={{ fontSize: 15, marginTop: 11, marginLeft: 20, fontWeight: 'bold', color: '#f90909', textAlign: "left"}}>add to collection</Text>
//             </TouchableOpacity>
//               <TouchableOpacity
//               onPress={() => {
//                 handleLibraryAdd();
//                 setModalVisible(!setModalVisible);
//               }}
//               title="add to library"
//             >
//             <Text style={{ fontSize: 15, marginLeft: 20, marginTop: 10, marginBottom: 500, fontWeight: 'bold', color: '#f90909', textAlign: "left" }}>save to library</Text>
//             </TouchableOpacity>
         
//             </LinearGradient>
//           </View>
//         </ScrollView>
//       </Overlay>
//       <ListItem
//         containerStyle={{ backgroundColor: 'transparent' }}
//         underlayColor='#f90909'
//         onPress={() => handlePlayPause()}
//         leftIcon={{ name: iconStatus, color: iconColor, size:40 }}
//         title={recording.title}
//         subtitle={recording.username}
//         rightIcon={{ name: 'more-horiz', onPress: () => openModal()}}
//         bottomDivider
//       />
   
//       <Overlay
//       onBackdropPress={() => modalBackdropPress()}
//       style={styles.modal}
//         backgroundColor='#fbf0f2'
//         animationType="fade"
//         transparent={true}
//         isVisible={collectionsModalVisible}
//         onRequestClose={() => {
//           setCollectionsVisible(!collectionsModalVisible)
//         }}>
    
//    <ScrollView>
//     <LinearGradient
//      colors={['#eac2cd', '#ffefef']}>

//          <TouchableOpacity alignItems={'center'}


// onPress={() => {
//   setCollectionsVisible(!collectionsModalVisible);
// }} title="Upload from Device">

//             <Ionicons name={'md-arrow-round-back'}
//             size={50}
//             style={{marginLeft: 20, marginTop: 10}}
//             color='#f90909'
//             />
// </TouchableOpacity>
//         <Text style={{fontSize: 22, marginTop: 15, marginLeft: 20, marginBottom: 25, textAlign: "center", fontWeight: 'bold', color: '#1e001a' }}>Collections</Text>
//         {collections.map((collection, i) => {
//           return (
//             <View key={i}>
//             <TouchableOpacity
//               onPress={() => {
//                 setChoiceCollection(collection)
//                 handleCollectionAdd();
//                 setCollectionsVisible(!collectionsModalVisible);
//               }}
//               title="collection"
//               >
//                 <Card style={{backgroundColor:"pink"}} >
                
 
//               <Text style={{ fontSize: 17, marginBottom: 12, textAlign: "center", fontWeight: 'bold', color: '#fb6262' }}>{collection.title}</Text>
                
//                 </Card>
//             </TouchableOpacity>
//             </View>
//           )
//         })}
//        </LinearGradient>
//         </ScrollView>

//       </Overlay>
//     </View>
//   );
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'transparent',
//   },
//   playIcon: {
//     marginBottom: 20,
//     color: 'rgba(0,0,0,0.4)',
//     fontSize: 14,
//     lineHeight: 19,
//     textAlign: 'center',
//   },
//   modal: {
//     backgroundColor: '#eac3cd',
//     margin: 0, 
//     alignItems: undefined,
//     justifyContent: undefined,
//   },
  
// });

import React, {useState, useEffect} from 'react';
import { Audio } from "expo-av";
import axios from 'axios';
import Colors from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { View, StyleSheet, Modal, Text, ScrollView, Picker, TouchableOpacity  } from 'react-native';
import { ListItem, Button, Icon } from 'react-native-elements';

export default function RecordingsListItem({ recording }) {
  const [src, setSrc] = useState(recording.url_recording);
  const [isPlaying, setPlayStatus] = useState('');
  const [playback, setPlayback] = useState('');
  const [iconStatus, setIconStatus] = useState('play-circle-filled');
  const [modalVisible, setModalVisible] = useState(false);
  const [collectionsModalVisible, setCollectionsVisible] = useState(false);
  const [collections, setCollections] = useState([]);
  const [choiceCollection, setChoiceCollection] = useState([]);
  const [iconColor, setIconColor] = useState('#f90909');
  const [backgroundColor, setBackground] = useState('#fdfffc');

  const fetchCollectionContent = async () => {
    await axios.get('https://aloud-server.appspot.com/profile/bjork/1')
      .then(response => {
        setCollections(response.data[0].collections);
      })
      .catch(err => console.log('there was an axios err', err))
  };


  const loadAudio = () => {
    const loadSetup = async() => {
    try {
      const playback = new Audio.Sound()
      const source = {
        uri: src,
      }
      const status = {
        shouldPlay: isPlaying,
        isPlaybackAllowed: true
      }
      await playback.loadAsync(source, status);
      return playback;
    } catch (e) {
      console.log(e);
    }
  }

  loadSetup()
  .then(playback => setPlayback(playback))
  .catch(e => console.error(e));

  };

  const setAudioMode = async() => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
        shouldDuckAndroid: true,
        staysActiveInBackground: true,
        playThroughEarpieceAndroid: true
      })
      loadAudio()
    } catch (e) {
      console.log(e)
    }
  };

  useEffect(() => {

    
    setAudioMode();
    fetchCollectionContent();

  }, []);

  const handlePlayPause = async () => {
  if(isPlaying) {
    await playback.pauseAsync();
    setIconColor('#f90909');
    setIconStatus('play-circle-filled');
    setBackground('#fdfffc');
  } else {
    await playback.playAsync();
    setIconColor('#eac2cd');
    setIconStatus('pause-circle-filled');
    setBackground('#fbf0f2');
  }

  setPlayStatus(!isPlaying);
  };
  
  const openModal = () => {
    setModalVisible(!modalVisible);
  }

  const saveToLibrary = async () => {
    await axios.post(`https://aloud-server.appspot.com/library/save/recording/${recording.id}`, {
      "userId": "1"
    })
      .then(success => {
        console.log(success);
      })
      .catch(err => console.log('there was an axios err:', err))
  };

  const saveToCollection = async () => {
    await axios.post(`https://aloud-server.appspot.com/recording/${choiceCollection.id}`, {
      "recordingId": recording.id
    })
      .then(success => {
        console.log(success);
      })
      .catch(err => console.log('there was an axios err:', err))
  };

  const handleCollectionAdd = () => {
    saveToCollection();
  };

  const handleLibraryAdd = () => {
    saveToLibrary();
  };

  return (
    <View style={styles.container}>
      <Modal
        style={styles.modal}
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}>
        <ScrollView style={{ marginTop: 0, flex: 1, backgroundColor: 'transparent' }}>
          <View>
            <LinearGradient
              colors={['#fb5656', '#eac2cd', '#eac2cd', '#eac2cd']}
            >
            <Icon
              name={iconStatus}
              underlayColor='#fbf0f2'
              onPress={() => handlePlayPause()}
              iconStyle={{ marginTop: 70, margin: 22, color: iconColor}}
              size={60}
            />
            <Text style={{ textAlign: "center", fontWeight: 'bold', fontSize: 22, color: '#1e001a'}}>{recording.title}</Text>
            <Text style={{ textAlign: "center", fontWeight: 'bold', color: '#f90909'}}>@{recording.username}</Text>
            <Text style={{ marginTop: 11, marginLeft: 22, textAlign: "left" }}>{recording.description}</Text>
            <Text style={{ marginTop: 11, marginLeft: 22, textAlign: "left", color: '#f90909' }}>google voice to text</Text>
            <Text style={{ marginLeft: 22, marginBottom: 22, textAlign: "left" }}>{recording.speech_to_text}</Text>
            <TouchableOpacity
              onPress={() => {
                setCollectionsVisible(!collectionsModalVisible);
              }} 
              title="add to collection"
            >
                <Text style={{ marginLeft: 20, fontWeight: 'bold', color: '#f90909', textAlign: "left"}}>add to collection</Text>
            </TouchableOpacity>
              <TouchableOpacity
              onPress={() => {
                handleLibraryAdd();
                setModalVisible(!setModalVisible);
              }}
              title="add to library"
            >
            <Text style={{ marginLeft: 20, marginTop: 10, marginBottom: 500, fontWeight: 'bold', color: '#f90909', textAlign: "left" }}>save to library</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              title="go to artist"
            >
              <Text style={{ marginTop: 30, marginBottom: 10, fontWeight: 'bold', color: '#fb6262', textAlign: "center" }}>go to artist</Text>
            </TouchableOpacity> */}
            </LinearGradient>
          </View>
        </ScrollView>
      </Modal>
      <ListItem
        containerStyle={{ backgroundColor: 'transparent' }}
        underlayColor='#f90909'
        onPress={() => handlePlayPause()}
        leftIcon={{ name: iconStatus, color: iconColor }}
        title={recording.title}
        subtitle={recording.username}
        rightIcon={{ name: 'more-horiz', onPress: () => openModal()}}
        bottomDivider
      />
    {/* collections modal */}
      <Modal
        backgroundColor='#fbf0f2'
        animationType="fade"
        transparent={false}
        visible={collectionsModalVisible}
        onRequestClose={() => {
          setCollectionsVisible(!collectionsModalVisible)
        }}>
        <LinearGradient
          colors={['#eac2cd', '#ffefef']}
        >
        <Text style={{ marginTop: 54, marginLeft: 20, marginBottom: 20, textAlign: "left", fontWeight: 'bold', color: '#1e001a' }}>collections</Text>
        {collections.map((collection, i) => {
          return (
            <View key={i}>
            <TouchableOpacity
              onPress={() => {
                setChoiceCollection(collection)
                handleCollectionAdd();
                setCollectionsVisible(!collectionsModalVisible);
              }}
              title="collection"
            >
              <Text style={{ marginBottom: 20, fontWeight: 'bold', color: '#fb6262', marginLeft: 20 }}>{collection.title}</Text>
            </TouchableOpacity>
            </View>
          )
        })}
        <TouchableOpacity
          onPress={() => {
            setCollectionsVisible(!collectionsModalVisible);
          }}
          title="x"
        >
          <Text style={{ marginLeft: 20, marginBottom: 1000, fontSize: 24, fontWeight: 'bold', color: '#fb6262' }}>x</Text>
        </TouchableOpacity>
       </LinearGradient>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  playIcon: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  modal: {
    backgroundColor: '#eac3cd',
    margin: 0, 
    alignItems: undefined,
    justifyContent: undefined,
  },
  
});