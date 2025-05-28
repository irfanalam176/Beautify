import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useCallback, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { url } from '../../constants';
import { style } from '../../style/style';

const Booking = ({navigation}) => {
  const [customerId, setCustomerId] = useState('');
  const [appointments, setAppointments] = useState([]);
  function goBack() {
    navigation.goBack();
  }

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

  async function getAppointments() {
    try {
      const data = await AsyncStorage.getItem('userData');
      const userData = JSON.parse(data);
      const id = userData.customerId;
      setCustomerId(id);

      const response = await fetch(
        `${url}/appointment/get-appointments-by-id/${id}`,
        {method: 'GET'},
      );
      const result = await response.json();
      setAppointments(result.data);
    } catch (e) {
      console.log(e);
    }
  }
  useFocusEffect(
    useCallback(() => {
      getAppointments();
    }, []),
  );
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
        <Text style={style.headerText}>Booking</Text>
      </View>

      <ScrollView contentContainerStyle={style.containerPadding}>
        {appointments.map((item, key) => (
          <TouchableOpacity
            style={style.bookingCard}
            onPress={() => {
              navigation.navigate('viewBooking', {
                name: item.service_name,
                bookingTime: item.created_at,
                appointmentTime: item.appointment_date,
                appointmentId: item.appointment_id,
                customerId: item.customer_id,
              });
            }}
            key={key}>
            <Text style={style.bookingCardText}>{item.service_name}</Text>
            <Text style={style.smText}>
              Booking on {formatDate(item.created_at)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Booking;
