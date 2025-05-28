import React, {useCallback, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {style} from '../../../style/style';
import {url} from '../../../constants';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';

const TotalSaleRecord = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [monthlyData, setMonthlyData] = useState([]);
  const [dailyData, setDailyData] = useState({});

  async function getMonthlyData() {
    const response = await fetch(`${url}/sale/get-monthlyProfitLoss`, {
      method: 'GET',
    });
    const result = await response.json();
    setMonthlyData(result);
  }

    async function getDailyData(){
      const response = await fetch(`${url}/sale/get-dailyProfitLoss`,{method:"GET"})
      const result = await response.json()
      setDailyData(result)
      
    }

  useFocusEffect(
    useCallback(() => {
      getDailyData()
      getMonthlyData();
    }, []),
  );
  return (

    <View style={style.mainBg}>
      <Text style={style.mainHeading}>Daily Sale Record</Text>

      {isLoading ? <ActivityIndicator color={'#BE5985'} size={50} /> : ''}

      <Text style={style.mainTitle}>Daily Sale Record</Text>
 
            {/* Table Head */}
      <View style={style.dailyPLtable}>
            <View style={style.tableHeader}>
            <Text style={[style.tableHeading,style.dailySaleTableHeading]}>Total Sale</Text>
            <Text style={[style.tableHeading,style.dailySaleTableHeading]}>Total Expenses</Text>
            <Text style={[style.tableHeading,style.dailySaleTableHeading]}>Profit/Loss</Text>
          </View>
          {/* table body */}
          <View style={style.tableRow}>
            <Text style={[style.tableData,style.dailySaleTableData]}>{dailyData.total_sales}</Text>
            <Text style={[style.tableData,style.dailySaleTableData]}>{dailyData.total_expenses}</Text>
            <Text style={[style.tableData,style.dailySaleTableData]}>{dailyData.profit_or_loss}</Text>
          </View>
      </View>
    

      <Text style={[style.mainHeading,{marginTop:30}]}>Monthly Sale Record</Text>

      {isLoading ? <ActivityIndicator color={'#BE5985'} size={50} /> : ''}

      <Text style={style.mainTitle}>Monthly Sale Record</Text>
      <ScrollView
        contentContainerStyle={style.tableContainer}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        <ScrollView
          contentContainerStyle={[
            style.table,
            {paddingBottom: 20, paddingRight: 100},
          ]}
          showsVerticalScrollIndicator={false}>
          {/* Table Head */}
          <View style={style.tableHeader}>
            <Text style={style.tableHeading}>Date</Text>
            <Text style={style.tableHeading}>Total Sale</Text>
            <Text style={style.tableHeading}>Total Expenses</Text>
            <Text style={style.tableHeading}>Profit/Loss</Text>
          </View>
          {/* table body */}
          {monthlyData.map((item, key) => (
            <View style={style.tableRow} key={key}>
              <Text style={style.tableData}>{item.label}</Text>
              <Text style={style.tableData}>{item.total_sales}</Text>
              <Text style={style.tableData}>{item.total_expenses}</Text>
              <Text style={style.tableData}>{item.profit_or_loss}</Text>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default TotalSaleRecord;
