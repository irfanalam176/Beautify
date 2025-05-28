import {View, Text, TouchableOpacity, Image, ScrollView, Modal, Pressable, Platform, Alert, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {style} from '../../style/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { url } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ViewService = ({navigation,route}) => {
  const [bookingModalVisible, setBookingModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [showPicker, setShowPicker] = useState(false);
  const[userId,setUserId] = useState()
  const[isLoading,setIsLoading] = useState(false)
const{serviceId,name,image,description,price}=route.params

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios'); // Keep picker open on iOS
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShowPicker(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  function goBack(){
    navigation.goBack()
  }

  useEffect(()=>{getUserId()},[])
  async function getUserId(){
    const userData = await AsyncStorage.getItem("userData")
    const customerData = JSON.parse(userData)
    setUserId(customerData.customerId)
    
  }

  async function confirmBooking(){
    
    const options = {
      method:"POST",
      headers:{"content-type":"application/json"},
      body:JSON.stringify({serviceId,userId,date})
    }
    try{
      setIsLoading(true)
      const response = await fetch(`${url}/appointment/create-appointment`,options)
      if(response.ok){
        Alert.alert("success","Appointment fixed")
          setBookingModalVisible(false);
      }
    }catch(e){
      console.log("Cannot confirm appointment" + e);
      Alert.alert("Error","Appointment cannot fixed")
    
   }finally{
    setIsLoading(false)
   }
  }
  return (
    <View style={style.mainBg}>
      {/* Header with back button */}
      <View style={style.header}>
        <TouchableOpacity onPress={goBack}>
          <Ionicons
            name="chevron-back-outline"
            size={30}
            style={style.headerIcon}
          />
        </TouchableOpacity>
        <Text style={style.headerText}>{name}</Text>
      </View>

      <ScrollView contentContainerStyle={style.containerPadding}>
        {/* Service Image */}
        <Image
          source={{uri:`${url}/uploads/${image}`}}
          style={style.heroImage}
        />

        {/* Service Details */}
        <Text style={style.mainTitle}>Name</Text>
        <Text style={style.mainText}>{name}</Text>
        
        <Text style={style.mainTitle}>Price</Text>
        <Text style={style.mainText}>{price}PKR</Text>

        <Text style={style.mainTitle}>Description</Text>
        <Text style={style.mainText}>
         {description}
        </Text>

        {/* Book Service Button */}
        <TouchableOpacity 
          style={[style.mainBtn, {marginTop: 20}]}
          onPress={() => setBookingModalVisible(true)}>
          <Text style={style.mainBtnTxt}>Book Service</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Booking Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={bookingModalVisible}
        onRequestClose={() => setBookingModalVisible(false)}>
        <View style={style.centeredView}>
          <View style={[style.modalView, {width: '90%'}]}>
            <Text style={style.modalTitle}>Schedule Booking</Text>
            
            <Text style={{marginBottom: 15, fontSize: 16}}>Select date and time for your appointment:</Text>
            
            {/* Date Picker Button */}
            <TouchableOpacity 
              style={[style.pickerButton, {marginBottom: 15}]}
              onPress={showDatepicker}>
              <Text style={style.pickerButtonText}>Select Date</Text>
              <Text style={style.pickerSelectedText}>
                {date.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
            
            {/* Time Picker Button */}
            <TouchableOpacity 
              style={style.pickerButton}
              onPress={showTimepicker}>
              <Text style={style.pickerButtonText}>Select Time</Text>
              <Text style={style.pickerSelectedText}>
                {date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </Text>
            </TouchableOpacity>
            
            {/* DateTimePicker */}
            {showPicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
                minimumDate={new Date()} // Prevent selecting past dates
              />
            )}
            
            <View style={style.modalButtonContainer}>
              <Pressable
                style={[style.modalButton, {backgroundColor: '#ccc'}]}
                onPress={() => setBookingModalVisible(false)}
                disabled={isLoading}
                >
                <Text style={style.modalButtonText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[style.modalButton,style.flexRow, {justifyContent:"center",backgroundColor: 'green'}]}
                onPress={() => {
                 confirmBooking()

                }}>
                <Text style={style.modalButtonText}>Confirm Booking</Text>
                {isLoading?<ActivityIndicator color={"white"}/>:""}
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ViewService;