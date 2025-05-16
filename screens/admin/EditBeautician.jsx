import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {style} from '../../style/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {url} from '../../constants';

const EditBeautician = ({navigation, route}) => {
  const beauticianId = route.params.id;
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [showPicker, setShowPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newBeautician, setNewBeautician] = useState({
    name: '',
    specialization: '',
    contact: '',
    schedule: '',
  });

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setDate(currentDate);
    handleInputChange(
      'schedule',
      currentDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    );
  };

  const showMode = currentMode => {
    setShowPicker(true);
    setMode(currentMode);
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const pakistaniNumberRegex = /^(\+92|92|0)?(3[0-9]{2})[0-9]{7}$/;

  async function handleEditBeautician() {
    if (
      !newBeautician.name ||
      !newBeautician.specialization ||
      !newBeautician.contact ||
      !newBeautician.schedule
    ) {
      return Alert.alert('Error', 'Please Fill All The Fields');
    }

    if (!pakistaniNumberRegex.test(newBeautician.contact)) {
      return Alert.alert(
        'Error',
        'Please enter a valid Pakistani contact number',
      );
    }

    try {
      setIsLoading(true);
      const options = {
        method: 'PUT',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(newBeautician),
      };
      const response = await fetch(
        `${url}/beautician/update-beautician/${beauticianId}`,
        options,
      );
      if (response.ok) {
        Alert.alert('Success', 'Beautician updated');
        navigation.goBack();
      }
    } catch (e) {
      Alert.alert('Error', 'Cannot update Beautician');
      console.log('Cannot update beautician: ' + e);
    } finally {
      setIsLoading(false);
    }
  }

  function resetForm() {
    setNewBeautician({
      name: '',
      specialization: '',
      contact: '',
      schedule: '',
    });
  }
  const handleInputChange = (field, value) => {
    setNewBeautician(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // get beautician by id
  useEffect(e => {
    getBeautician();
  }, []);

  async function getBeautician() {
    try {
      const response = await fetch(
        `${url}/beautician/get-beautician-by-id/${beauticianId}`,
      );
      const result = await response.json();
      setNewBeautician({
        name: result.name,
        specialization: result.specialization,
        contact: result.phone,
      });
    } catch (e) {
      console.log('cannot get beautician' + e);
    }
  }

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
        <Text style={style.headerText}>Edit Beautician</Text>
      </View>

      <View style={style.form}>
        <Text style={style.mainTitle}>Edit Beautician</Text>
        <View style={style.inputBox}>
          <TextInput
            placeholder="Name"
            style={style.input}
            placeholderTextColor={'gray'}
            value={newBeautician.name}
            onChangeText={text => handleInputChange('name', text)}
          />
        </View>

        <View style={style.inputBox}>
          <TextInput
            placeholder="Specialization"
            style={style.input}
            placeholderTextColor={'gray'}
            value={newBeautician.specialization}
            onChangeText={text => handleInputChange('specialization', text)}
          />
        </View>
        <View style={style.inputBox}>
          <TextInput
            placeholder="Contact"
            style={style.input}
            placeholderTextColor={'gray'}
            value={newBeautician.contact}
            onChangeText={text => handleInputChange('contact', text)}
            keyboardType="phone-pad"
          />
        </View>

        <View style={style.inputBox}>
          {/* Date Picker Button */}
          <TouchableOpacity
            style={[style.pickerButton, {marginBottom: 15}]}
            onPress={showTimepicker}>
            <Text style={style.pickerButtonText}>Select Time</Text>
            <Text style={style.pickerSelectedText}>
              {date.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </TouchableOpacity>
        </View>
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

        <View style={[style.flexRow, {gap: 10}]}>
          <Pressable
            style={[
              style.mainBtn,
              style.flexRow,
              {justifyContent: 'center', width: '50%'},
            ]}
            onPress={handleEditBeautician}
            disabled={isLoading}
            >
            <Text style={style.mainBtnTxt}>Update</Text>
            {isLoading ? <ActivityIndicator color={'white'} /> : ''}
          </Pressable>
          <Pressable
            style={[style.mainBtn, {backgroundColor: 'red', width: '50%'}]}
            onPress={() => resetForm()}>
            <Text style={style.mainBtnTxt}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default EditBeautician;
