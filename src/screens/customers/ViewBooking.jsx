import {View, Text, TouchableOpacity, ScrollView, Modal, Pressable, ActivityIndicator, Alert} from 'react-native';
import React, {useState} from 'react';
import {style} from '../../style/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { url } from '../../constants';
const ViewBooking = ({navigation,route}) => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [scheduleModalVisible, setScheduleModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [showPicker, setShowPicker] = useState(false);
  const[isDeleting,setIsDeleting]=useState(false)
  const[isLoading,setIsLoading]=useState(false)

  const{name,bookingTime,appointmentTime,appointmentId,customerId}=route.params

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


    function formatDate(dateString) {
    const date = new Date(dateString);

    const day = date.getDate(); // 1-31
    const month = date.toLocaleString('en-US', {month: 'long'}); // "April"
    const year = date.getFullYear(); // 2025

    let hours = date.getHours(); // 0-23
    const minutes = date.getMinutes().toString().padStart(2, '0'); // "04"
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12; // convert to 12-hour format

    return `${day} ${month} ${year} / ${hours}:${minutes} ${ampm}`;
  }

async function deleteAppointment(){
  try{
    setIsDeleting(true)
    const response = await fetch(`${url}/appointment/delete-appointment/${appointmentId}`,{method:"DELETE"})
    if(response.ok){
     goBack()
     setDeleteModalVisible(false)
    }
  }catch(e){
    console.log("cannot delete appointment" + e);
    
  }finally{
    setIsDeleting(false)
  }
}


async function reshedule(){
  try{
    setIsLoading(true)
    const options={
      method:"PUT",
      headers:{"content-type":"application/json"},
      body:JSON.stringify({date})
    }
    const response = await fetch(`${url}/appointment/reshedule/${appointmentId}`,options)
    if(response.ok){
      goBack()
      setScheduleModalVisible(false)
    }
  }catch(e){
    console.log("Cannot reshedule" + e);
    Alert.alert("Error","Cannot Reshedule")
  }finally{
    setIsLoading(false)
  }
}

  function goBack(){
    navigation.goBack()
  }
  return (
    <View style={style.mainBg}>
      {/* header */}
      <View style={style.header}>
        <TouchableOpacity onPress={goBack}>
          <Ionicons
            name="chevron-back-outline"
            size={30}
            style={style.headerIcon}
          />
        </TouchableOpacity>
        <Text style={style.headerText}>Booking Detail</Text>
      </View>

      <ScrollView contentContainerStyle={style.containerPadding}>
        <Text style={style.mainTitle}>Service Name</Text>
        <Text style={style.mainText}>{name}</Text>
      
        <Text style={style.mainTitle}>Booking On</Text>
        <Text style={style.mainText}>{formatDate(bookingTime)}</Text>

        <Text style={style.mainTitle}>Booking Schedule</Text>
        <Text style={style.mainText}>{formatDate(appointmentTime)}</Text>

        <View style={[style.flexRow, {gap: 10, justifyContent: "center", marginTop: 30}]}>
          <TouchableOpacity 
            style={[style.mainBtn, {backgroundColor: "red"}]}
            onPress={() => setDeleteModalVisible(true)}>
            <Text style={style.mainBtnTxt}>Delete Booking</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[style.mainBtn, {backgroundColor: "green"}]}
            onPress={() => setScheduleModalVisible(true)}>
            <Text style={style.mainBtnTxt}>Change Schedule</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
{/* delete booking modal */}
      {/* Delete Booking Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}>
        <View style={style.centeredView}>
          <View style={style.modalView}>
            <Text style={style.modalTitle}>Confirm Deletion</Text>
            <Text style={style.modalText}>
              Are you sure you want to delete this booking?
            </Text>
            <View style={style.modalButtonContainer}>
              <Pressable
                style={[style.modalButton, {backgroundColor: '#ccc'}]}
                onPress={() => setDeleteModalVisible(false)}>
                <Text style={style.modalButtonText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[style.modalButton,style.flexRow, {backgroundColor: 'red',justifyContent:"center"}]}
                onPress={() => {
                  deleteAppointment()
                }}
                disabled={isDeleting}
                >
                <Text style={style.modalButtonText}>Delete</Text>
                {isDeleting?<ActivityIndicator color={"white"}/>:""}
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
{/* edit schedule modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={scheduleModalVisible}
        onRequestClose={() => setScheduleModalVisible(false)}>
        <View style={style.centeredView}>
          <View style={[style.modalView, {width: '90%'}]}>
            <Text style={style.modalTitle}>Change Booking Schedule</Text>
            
            <Text style={{marginBottom: 15, fontSize: 16}}>Select new date and time:</Text>
            
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
                onPress={() => setScheduleModalVisible(false)}>
                <Text style={style.modalButtonText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[style.modalButton,style.flexRow, {backgroundColor: 'green',justifyContent:"center"}]}
                onPress={() => {
                  reshedule()
                }}
                disabled={isLoading}
                >
                <Text style={style.modalButtonText}>Confirm Change</Text>
                {isLoading?<ActivityIndicator color={"white"}/>:""}
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ViewBooking;