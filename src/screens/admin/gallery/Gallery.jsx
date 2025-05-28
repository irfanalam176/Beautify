import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  Image,
} from 'react-native';
import { style } from '../../../style/style';
import { url } from '../../../constants';
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';

const Gallery = ({ navigation }) => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  const openImage = (image) => {
    if (selectionMode) return;
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

  const handleLongPress = (item) => {
    setSelectionMode(true);
    setSelectedImages([item.image_id]);
  };

const toggleSelection = (item) => {
  if (!selectionMode) {
    openImage(item.image);
    return;
  }

  setSelectedImages((prev) => {
    const isSelected = prev.includes(item.image_id);
    const updated = isSelected
      ? prev.filter((id) => id !== item.image_id)
      : [...prev, item.image_id];

    // If no images remain selected, exit selection mode
    if (updated.length === 0) {
      setSelectionMode(false);
    }

    return updated;
  });
};

  const deleteImage = async () => {
    if (selectedImages.length === 0) return;

    try {
      const response = await fetch(`${url}/gallery/delete-images`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image_ids: selectedImages }),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Images deleted successfully');
        setSelectionMode(false);
        setSelectedImages([]);
        getImages();
      } else {
        Alert.alert('Error', result.message || 'Failed to delete images');
      }
    } catch (e) {
      console.log('Delete error:', e);
      Alert.alert('Error', 'An error occurred while deleting images');
    }
  };

  useFocusEffect(
    useCallback(() => {
      getImages();
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={style.mainBg}>
      <View style={[style.flexBetween, style.flexRow]}>
        <Text style={style.mainHeading}>Gallery Record</Text>
        {selectionMode && (
          <TouchableOpacity onPress={deleteImage}>
            <Ionicons name="trash" size={30} color="red" />
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity
        style={[style.mainBtn, { marginVertical: 10 }]}
        onPress={() => navigation.navigate('addGalleryPic')}
      >
        <Text style={style.mainBtnTxt}>Add Image</Text>
      </TouchableOpacity>

      <View style={style.galleryGrid}>
        {galleryImages.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => toggleSelection(item)}
            onLongPress={() => handleLongPress(item)}
            activeOpacity={0.8}
            style={[
              style.galleryPicWrapper,
              selectionMode &&
                selectedImages.includes(item.image_id) && {
                 opacity:0.4
                },
            ]}
          >
            <Image
              source={{ uri: `${url}/uploads/${item.image}` }}
              style={style.galleryPic}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Full Screen Image Modal with Zoom */}
      <Modal visible={modalVisible} transparent={true} onRequestClose={closeModal}>
        <View style={style.fullScreenModal}>
          <TouchableOpacity style={style.closeButton} onPress={closeModal}>
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
                source={{ uri: `${url}/uploads/${selectedImage}` }}
                style={style.fullScreenImage}
                resizeMode="contain"
              />
            </ZoomableView>
          )}
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Gallery;
