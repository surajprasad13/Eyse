import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CameraSmartSearch = ({navigation}) => {
  const camera = useRef(null);
  const [type, setType] = useState(true);
  const [fullImage, setFullImage] = useState(false);
  const [image, setImage] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);

  const pickImage = async () => {
    launchImageLibrary(
      {
        mediaTypes: '',
        allowsEditing: true,
        title: 'Choose an Image',
        aspect: [4, 3],
        maxWidth: 1024,
        maxHeight: 1024,
        quality: 1,
      },
      result => {
        if (!result.cancelled) {
          setImage(result.assets[0].uri);
        }
      },
    );
  };
  const takePicture = async camera => {
    launchCamera({quality: 1, includeBase64: true}, data => {
      if (data.assets) {
        setImage(data.assets[0].uri);
        setFullImage(true);
        data.uri;
      }
    });
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Modal visible={fullImage} transparent={true}>
        <TouchableOpacity
          onPress={() => {
            setFullImage(false);
          }}
          style={styles.imageContainer}>
          <Image source={{uri: image}} style={styles.image} />
          <View style={styles.imageBottomBar}>
            <TouchableOpacity
              onPress={() => {
                setFullImage(false);
                setImage(null);
              }}
              style={styles.resetButton}>
              <Text style={{color: 'white'}}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFullImage(false);
                navigation.navigate('ImageSearch', {image: image});
              }}
              style={styles.searchButton}>
              <Text style={{color: 'white'}}>Search</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
        <TouchableOpacity onPress={() => setType(!type)} style={styles.capture}>
          <Ionicons name={'camera-reverse'} color={'#fff'} size={40} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => takePicture(camera)}
          style={styles.capture}>
          <MaterialCommunityIcons name="circle" size={60} color={'red'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={pickImage} style={styles.capture}>
          <Ionicons name="md-images-outline" size={40} color={'#fff'} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => setFullImage(true)}
        onLongPress={() => setImage(null)}>
        <Image source={{uri: image}} style={styles.imagePreview} />
      </TouchableOpacity>
      {/* <Camera
        style={styles.preview}
        type={type ? 'back' : 'front'}
        ref={camera}>
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={() => setType(!type)}
            style={styles.capture}>
            <Ionicons name={'camera-reverse'} color={'#fff'} size={40} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => takePicture(camera)}
            style={styles.capture}>
            <MaterialCommunityIcons name="circle" size={60} color={'red'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={pickImage} style={styles.capture}>
            <Ionicons name="md-images-outline" size={40} color={'#fff'} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => setFullImage(true)}
          onLongPress={() => setImage(null)}>
          <Image source={{uri: image}} style={styles.imagePreview} />
        </TouchableOpacity>
      </Camera> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,

    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  resetButton: {
    backgroundColor: '#FF9E00',
    justifyContent: 'center',

    width: 150,
    height: 45,
    marginRight: 20,
    borderRadius: 30,
    alignItems: 'center',
  },
  searchButton: {
    backgroundColor: '#FF9E00',
    justifyContent: 'center',
    marginLeft: 20,
    width: 150,
    height: 45,
    borderRadius: 30,
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    width: Dimensions.get('screen').width - 50,
    alignSelf: 'center',
    height: Dimensions.get('screen').height,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  image: {
    alignSelf: 'flex-start',
    width: Dimensions.get('screen').width - 50,
    height: Dimensions.get('screen').height - 500,
  },
  imageBottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 50,
    marginBottom: 80,
  },
  imagePreview: {width: 80, height: 80, alignSelf: 'flex-end'},
});

export default CameraSmartSearch;
