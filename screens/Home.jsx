import React, { useCallback, useState } from 'react';
import { View, Text, Image, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { style } from '../style/style';
import Slider from '../components/Slider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import { useFocusEffect } from '@react-navigation/native';
import { url } from '../constants';

const Home = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const[galleryImages,setGalleryImages] = useState([])

  const openImage = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const getImages = async () => {
    try {
      const response = await fetch(`${url}/gallery/get-images`, { method: 'GET' });
      const result = await response.json();
      if (response.ok) {
        setGalleryImages(result);
      }
    } catch (e) {
      console.log('Error getting images: ' + e);
      Alert.alert('Error', 'Cannot Get Images');
    }
  };
  useFocusEffect(useCallback(()=>{
    getImages()
  },[]))
  return (
    <View style={style.mainBg}>
      {/* header */}
      <View style={style.header}>
        <Image source={require("../assets/images/logo.png")} style={{width:50,height:50}}/>
        <Text style={style.headerText}>Home</Text>
      </View>

      <ScrollView>
        {/* Carousel */}
        <Slider />

        {/* Gallery */}
        <Text style={style.mainTitle}>Our Gallery</Text>
      
    
          <View style={style.galleryGrid}>
            {galleryImages.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => openImage(item.image)}
                activeOpacity={0.8}
                style={[
                  style.galleryPicWrapper
                ]}
              >
                <Image
                  source={{ uri: `${url}/uploads/${item.image}` }}
                  style={style.galleryPic}
                />
              </TouchableOpacity>
            ))}
          </View>
      </ScrollView>

      {/* Full Screen Image Modal with Zoom */}
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={style.fullScreenModal}>
          <TouchableOpacity 
            style={style.closeButton}
            onPress={closeModal}
          >
            <Ionicons name="close" size={30} color="white" />
          </TouchableOpacity>
          
          {selectedImage && (
            <ZoomableView
            maxZoom={1.5}
            minZoom={1}
            zoomStep={0.5}
            initialZoom={1}
            bindToBorders={true}
            captureEvent={true}
              style={style.zoomableView}
            >
              <Image 
                source={{uri:`${url}/uploads/${selectedImage}`}} 
                style={style.fullScreenImage}
                resizeMode="contain"
              />
            </ZoomableView>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default Home;