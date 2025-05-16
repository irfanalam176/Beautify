import React, { useState } from 'react';
import { View, Text, Image, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { style } from '../style/style';
import Slider from '../components/Slider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';

const Home = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const galleryImages = [
    require("../assets/images/service.jpg"),
    require("../assets/images/service.jpg"),
    require("../assets/images/service.jpg"),
    require("../assets/images/service.jpg"),
  ];

  const openImage = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

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
          {galleryImages.map((image, index) => (
            <TouchableOpacity 
              key={index} 
              onPress={() => openImage(image)}
              activeOpacity={0.8}
            >
              <Image source={image} style={style.galleryPic} />
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
                source={selectedImage} 
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