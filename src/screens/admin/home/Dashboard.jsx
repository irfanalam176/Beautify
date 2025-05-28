import {View, Text, Image,TouchableOpacity,ScrollView} from 'react-native';
import React, { useCallback, useState } from 'react';
import {style} from '../../../style/style';
import { useFocusEffect } from '@react-navigation/native';
import { url } from '../../../constants';

const Dashboard = ({navigation}) => {

const[todayAppointments,setTodayAppointments] = useState()
  const [dailyData, setDailyData] = useState({});

  async function getAppointmentsToday(){
    const response = await fetch(`${url}/appointment/get-total-appointments-today`,{method:"GET"})
    const result = await response.json()
    setTodayAppointments(result.total) 
  }

      async function getDailyData(){
      const response = await fetch(`${url}/sale/get-dailyProfitLoss`,{method:"GET"})
      const result = await response.json()
      setDailyData(result)
      
    }

  useFocusEffect(useCallback(()=>{
    getAppointmentsToday()
    getDailyData()
  },[]))
  return (
    <ScrollView contentContainerStyle={style.mainBg}>
      {/* header */}
      <View style={style.header}>
        <Image
          source={require('../../../../assets/images/logo.png')}
          style={{width: 50, height: 50}}
        />
        <Text style={style.headerText}>Admin Dashboard</Text>
      </View>

      <View style={style.dashboardCard}>
        <Text style={style.dashboardCardText}>Total Apointments Today</Text>
        <Text style={style.cardAmount}>{todayAppointments}</Text>
      </View>

      <View style={[style.dashboardCard, {backgroundColor: '#C68EFD'}]}>
        <Text style={style.dashboardCardText}>Revenue Generated Today</Text>
        <Text style={style.cardAmount}>{dailyData.total_sales}</Text>
      </View>

      <TouchableOpacity
        style={[style.mainBtn, {marginTop: 5,backgroundColor:"green"}]}
        onPress={()=>navigation.navigate("adminGallery")}
        >
        <Text style={style.mainBtnTxt}>View Gallery</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[style.mainBtn, {marginTop: 5,backgroundColor:"orange"}]}
        onPress={()=>navigation.navigate("appointments")}
        >
        <Text style={style.mainBtnTxt}>View Appointments</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[style.mainBtn, {marginTop: 5,backgroundColor:"purple"}]}
        onPress={()=>navigation.navigate("categoriesList")}
        >
        <Text style={style.mainBtnTxt}>View Products Categores</Text>
      </TouchableOpacity>

<Text style={style.mainTitle}>Profit/Loss</Text>

      <View style={[style.flexRow,{justifyContent:"center",flexWrap:"wrap",gap:10}]}>

        <TouchableOpacity
        style={[style.mainBtn, {marginTop: 5,backgroundColor:"crimson"}]}
        onPress={()=>navigation.navigate("expences")}
        >
        <Text style={style.mainBtnTxt}>Expences</Text>
      </TouchableOpacity>
        <TouchableOpacity
        style={[style.mainBtn, {marginTop: 5,backgroundColor:"crimson"}]}
        onPress={()=>navigation.navigate("saleRecord")}
        >
        <Text style={style.mainBtnTxt}>Sale</Text>
      </TouchableOpacity>


        <TouchableOpacity
        style={[style.mainBtn, {marginTop: 5,backgroundColor:"crimson"}]}
        onPress={()=>navigation.navigate("totalSaleRecord")}
        >
        <Text style={style.mainBtnTxt}>Total Sale Record</Text>
      </TouchableOpacity>

      </View>
    </ScrollView>
  );
};

export default Dashboard;
