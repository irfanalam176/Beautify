import {View, Text, Image,TouchableOpacity,ScrollView} from 'react-native';
import React from 'react';
import {style} from '../../style/style';

const Dashboard = () => {
  return (
    <ScrollView style={style.mainBg}>
      {/* header */}
      <View style={style.header}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={{width: 50, height: 50}}
        />
        <Text style={style.headerText}>Admin Dashboard</Text>
      </View>

      <View style={style.dashboardCard}>
        <Text style={style.dashboardCardText}>Total Apointments Today</Text>
        <Text style={style.cardAmount}>30</Text>
      </View>

      <View style={[style.dashboardCard, {backgroundColor: '#C68EFD'}]}>
        <Text style={style.dashboardCardText}>Revenue Generated</Text>
        <Text style={style.cardAmount}>15000</Text>
      </View>

      <TouchableOpacity
        style={[style.mainBtn, {marginTop: 5}]}>
        <Text style={style.mainBtnTxt}>View Overall History</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Dashboard;
