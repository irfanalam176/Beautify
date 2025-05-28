import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, {useState} from 'react';
import {style} from '../../../style/style';
import ImagePicker from 'react-native-image-crop-picker';
import {url} from '../../../constants';

const AddGalleryPic = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [newImage, setNewImage] = useState({
    image: null,
  });

  function pickImage() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setNewImage(prevData => ({
        ...prevData,
        image: {
          uri: image.path,
          name: image.path.split('/').pop(),
          mime: image.mime,
        },
      }));
    });
  }

  const resetForm = () => {
    setNewImage({
      image: null,
    });
  };

  const handleAddService = async () => {
    
    if (
      !newImage.image
    ) {
      Alert.alert('Fields are Required', 'Please fill all required fields');
      return;
    }

    const formData = new FormData();
    formData.append('image', {
      uri: newImage.image.uri,
      type: newImage.image.mime,
      name: newImage.image.name,
    });

    try {
        
      setIsLoading(true);
      const response = await fetch(`${url}/gallery/add-image`, {
        method: 'POST',
        headers: {},
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        resetForm();
        Alert.alert('Success', 'image added successfully');
      } else {
        Alert.alert('Error', result.message || 'Failed to add image');
      }
    } catch (error) {
      console.error('Error adding image:', error);
      Alert.alert('Error', 'An error occurred while adding the image');
    } finally {
      setIsLoading(false);
    }
  };


  function goBack() {
    navigation.goBack();
  }
  return (

      <ScrollView contentContainerStyle={style.wrapper}>
        <View style={style.header}>
          <TouchableOpacity onPress={goBack}>
            <Ionicons
              name="chevron-back-outline"
              size={30}
              style={style.headerIcon}
            />
          </TouchableOpacity>
          <Text style={style.headerText}>Add Image</Text>
        </View>

        <View style={style.form}>
          <View style={[style.flexBetween, style.flexRow, {marginBottom: 20}]}>
            <Text style={style.mainTitle}>Add New Image</Text>
          </View>
            {newImage.image && (
              <Image
                source={{uri: newImage.image.uri}}
                style={{width: 200, height: 200, objectFit: 'fill',marginBottom:20,marginHorizontal:"auto"}}
              />
            )}




          <TouchableOpacity style={style.mainBtn} onPress={pickImage}>
            <Text style={style.mainBtnTxt}>Select Image</Text>
          </TouchableOpacity>

          <View style={[style.flexRow, {gap: 10, marginTop: 10}]}>
            <Pressable
              style={[
                style.mainBtn,
                style.flexRow,
                {
                  backgroundColor: 'green',
                  width: '50%',
                  justifyContent: 'center',
                },
              ]}
              onPress={handleAddService}
              disabled={isLoading}
              >
              <Text style={style.mainBtnTxt}>Add Image</Text>
              {isLoading ? <ActivityIndicator color={'white'} /> : ''}
            </Pressable>
            <Pressable
              style={[style.mainBtn, {backgroundColor: 'red', width: '50%'}]}
              onPress={() => {
                resetForm();
              }}>
              <Text style={style.mainBtnTxt}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
  );
};

export default AddGalleryPic;
