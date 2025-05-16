import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { style } from '../style/style'
import Ionicons from 'react-native-vector-icons/Ionicons';
const Booking = ({navigation}) => {
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
            <Text style={style.headerText}>Booking</Text>
          </View>

          <ScrollView contentContainerStyle={style.containerPadding}>
                <TouchableOpacity style={style.bookingCard} onPress={()=>{navigation.navigate("viewBooking")}}>
                    <Text style={style.bookingCardText}>Service Name</Text>
                    <Text style={style.smText}>Booking on 1 April 2015 / 12:00 PM</Text>
                </TouchableOpacity>
          </ScrollView>
    </View>
  )
}

export default Booking