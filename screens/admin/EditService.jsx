import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, {useState,useEffect} from 'react'
import { style } from '../../style/style';
import ImagePicker from 'react-native-image-crop-picker';
import { url } from '../../constants';

const EditService = ({navigation,route}) => {
      const serviceId = route.params?.serviceId
  const [selectedServiceId, setSelectedServicetId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
  });

        function pickImage() {
          ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
          }).then(image => {
            setNewService(prevData => ({
              ...prevData,
              image: {
                uri: image.path,
                name: image.path.split("/").pop(),
                mime: image.mime,
                isLocal: true,
              },
            }));
          });
        }

          const resetForm = () => {
    setNewService({
      name: '',
      description: '',
      price: '',
      image: null,
    });
    setSelectedServicetId(null);
  };

  const handleUpdateService = async () => {
    if (!newService.name || !newService.price || !newService.description || !newService.image) {
      Alert.alert('Fields are Required', 'Please fill all required fields');
      return;
    }

    const formData = new FormData();
    formData.append('name', newService.name);
    formData.append('description', newService.description);
    formData.append('price', newService.price);
    
    if(newService.image?.isLocal){
      formData.append('image', {
      uri: newService.image.uri,
      type: newService.image.mime,
      name: newService.image.name,
    });
    }

    try {
      setIsLoading(true)
      
      const response = await fetch(`${url}/services/update-service/${serviceId}`, {
        method: "PUT",
        headers: {
        
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        resetForm();
        Alert.alert('Success', 'Service Updated successfully');
        navigation.goBack()
      } else {
        Alert.alert('Error', result.message || 'Failed to update service');
      }
    } catch (error) {
      console.error('Error updating service:', error);
      Alert.alert('Error', 'An error occurred while updating the service');
    }finally{
      setIsLoading(false)
    }
  };

    const handleInputChange = (field, value) => {
    setNewService(prev => ({
      ...prev,
      [field]: value,
    }));
  };



    async function getData(){
      try{
        
        const response = await fetch(`${url}/services/get-service-by-id/${serviceId}`,{method:"GET"})
        const result = await response.json()
        setNewService({
          name:result.name,
          description:result.description,
          price:result.price,
          image:{
            uri: `${url}/uploads/${result.image}`,
            name: result.image,
            mime: 'image/jpeg', 
            isLocal:false
          }
        })
      }catch(e){
        Alert.alert("error","Cannot Get Data")
        console.log("Cannot Get Data" + e);
        
      }
    }

      useEffect(() => {
        getData()
      }, []);
      function goBack(){
    navigation.goBack()
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
                    <Text style={style.headerText}>Edit Service</Text>
                  </View>
          
         <View style={style.form}>
             <View style={[style.flexBetween,style.flexRow,{marginBottom:20}]}>
              <Text style={style.mainTitle}>Edit Service</Text>
                {newService.image && (
              <Image
                source={{uri: newService.image.uri}}
                style={{width:50,height:50,objectFit:"fill"}}
              />
            )}
          </View>
            <View style={style.inputBox}>
              <TextInput
                placeholder="Service Name *"
                style={style.input}
                value={newService.name}
                onChangeText={text => handleInputChange('name', text)}
              />
            </View>

            <View style={style.inputBox}>
              <TextInput
                placeholder="Description"
                style={[style.input, {height: 80, textAlignVertical: 'top'}]}
                value={newService.description}
                onChangeText={text => handleInputChange('description', text)}
                multiline
              />
            </View>

            <View style={style.inputBox}>
              <TextInput
                placeholder="Price *"
                style={style.input}
                value={newService.price}
                onChangeText={text => handleInputChange('price', text)}
                keyboardType="numeric"
              />
            </View>


            <TouchableOpacity style={style.mainBtn} onPress={pickImage}>
              <Text style={style.mainBtnTxt}>Select Image</Text>
            </TouchableOpacity>

        

            <View style={[style.flexRow, {gap: 10, marginTop: 10}]}>
              <Pressable
                style={[
                  style.mainBtn,
                  style.flexRow,
                  {backgroundColor: 'green', width: '50%',justifyContent:"center"},
                ]}
                onPress={handleUpdateService}
                disabled={isLoading}
                >
                <Text style={style.mainBtnTxt}>Update Service</Text>
                {isLoading?<ActivityIndicator color={"white"}/>:""}
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
  )
}

export default EditService