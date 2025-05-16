import {View, Text, TouchableOpacity, ScrollView, Modal, Pressable} from 'react-native';
import React, {useState} from 'react';
import {style} from '../style/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
const ViewBooking = ({navigation}) => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [scheduleModalVisible, setScheduleModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [showPicker, setShowPicker] = useState(false);

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
        <Text style={style.mainText}>Service Name</Text>
      
        <Text style={style.mainTitle}>Booking On</Text>
        <Text style={style.mainText}>1 April 2025 / 12:00 PM</Text>

        <Text style={style.mainTitle}>Booking Schedule</Text>
        <Text style={style.mainText}>1 April 2025 / 3:00 PM</Text>

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
                style={[style.modalButton, {backgroundColor: 'red'}]}
                onPress={() => {
                  // Handle delete booking logic here
                  setDeleteModalVisible(false);
                  // navigation.goBack(); // Optional: navigate back after deletion
                }}>
                <Text style={style.modalButtonText}>Delete</Text>
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
                style={[style.modalButton, {backgroundColor: 'green'}]}
                onPress={() => {
                  // Here you would save the selected date/time
                  console.log('Selected DateTime:', date);
                  setScheduleModalVisible(false);
                }}>
                <Text style={style.modalButtonText}>Confirm Change</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ViewBooking;