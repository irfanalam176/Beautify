import {
  View,
  Text,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import React, {useCallback, useState} from 'react';
import {style} from '../../style/style';
import {url} from '../../constants';
import {useFocusEffect} from '@react-navigation/native';
const Appointments = () => {
  const [appointmentList, setAppointmentList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [action, setAction] = useState(null);
  const actionList = [
    {label: 'Completed', value: 'Completed'},
    {label: 'Cancelled', value: 'Cancelled'},
  ];

  const [searchText, setSearchText] = useState('');
  const filteredList = appointmentList.filter(item =>
    item.customer_name.toLowerCase().includes(searchText.toLowerCase()),
  );

  async function getAppointments() {
    try {
      setIsLoading(true);
      const response = await fetch(`${url}/appointment/get-appointment`, {
        method: 'GET',
      });
      const result = await response.json();
      setAppointmentList(result);
    } catch (e) {
      console.log('cannot get appointments' + e);
      Alert('Cannot Get Appointments');
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getAppointments();
    }, []),
  );

  async function executeAction(actionName, appointmentId, customerId) {
    try {
      const options = {
        method: 'PUT',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({actionName, customerId}),
      };
      const response = await fetch(
        `${url}/appointment/edit-appointment/${appointmentId}`,
        options,
      );
      if (response.ok) {
        getAppointments();
      }
    } catch (e) {
      Alert.alert('Error', 'Cannot Edit Appointmnet');
      console.log('cannot edit appointemnt' + e);
    }
  }
  return (
    <View style={style.mainBg}>
      <Text style={style.mainHeading}>Appointments</Text>

      {/* Search Bar */}
      <View style={{flexDirection: 'row', gap: 5}}>
        <TextInput
          placeholder="Search Appointment"
          style={[style.input, {paddingLeft: 10, width: '100%'}]}
          placeholderTextColor={'gray'}
          value={searchText}
          onChangeText={text => setSearchText(text)}
        />
      </View>

      {isLoading ? <ActivityIndicator color={'#BE5985'} size={50} /> : ''}
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
            <Text style={style.tableHeading}>Name</Text>
            <Text style={style.tableHeading}>Contact</Text>
            <Text style={style.tableHeading}>Service</Text>
            <Text style={style.tableHeading}>Appointment date</Text>
            <Text style={style.tableHeading}>Resheduled</Text>
            <Text style={style.tableHeading}>Status</Text>
            <Text style={[style.tableHeading, {width: 200}]}>Action</Text>
          </View>
          {/* Table Body */}
          {filteredList.map((item, key) => (
            <View style={style.tableRow} key={key}>
              <Text style={style.tableData}>{item.customer_name}</Text>
              <Text style={style.tableData}>{item.phone}</Text>
              <Text style={style.tableData}>{item.service_name}</Text>
              <Text style={style.tableData}>{item.appointment_date}</Text>
              <Text style={style.tableData}>{item.resheduled}</Text>
              <Text style={style.tableData}>{item.status}</Text>
              <View style={[style.tableData, {width: 200}]}>
                <Dropdown
                  style={[
                    style.input,
                    {
                      height: 40,
                      marginVertical: 5,
                      width: 150,
                      paddingLeft: 10,
                    },
                  ]}
                  placeholderStyle={style.placeholderStyle}
                  selectedTextStyle={style.selectedTextStyle}
                  inputSearchStyle={style.inputSearchStyle}
                  iconStyle={style.iconStyle}
                  data={actionList}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Action"
                  searchPlaceholder="Search..."
                  value={action}
                  onChange={action => {
                    executeAction(
                      action.value,
                      item.appointment_id,
                      item.customer_id,
                    );
                  }}
                />
              </View>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
};
export default Appointments;
