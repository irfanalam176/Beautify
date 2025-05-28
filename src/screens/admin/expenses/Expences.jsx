import React, {useCallback, useEffect, useState} from 'react';
import {style} from '../../../style/style';
import {url} from '../../../constants';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Modal,
  Pressable
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const Expences = ({navigation}) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [expences, setExpences] = useState([]);
  const [total, setTotal] = useState();

  async function getExpenses() {
    try {
      setIsLoading(true)
      const response = await fetch(`${url}/expences/get-expences`, {
        method: 'GET',
      });
      
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        setExpences(result.expenses);
        setTotal(result.total);
      }
    } catch (e) {
      console.log('Cannot get Expenses' + e);
      Alert.alert('Error', 'Cannot Get Expenses');
    }finally{
      setIsLoading(false)
    }
  }

  async function deleteRecord() {
    try{
      setIsDeleting(true)
      const response = await fetch(`${url}/expences/delete-expences/${deleteId}`,{method:"DELETE"})
      if(response.ok){
        getExpenses()
        setDeleteModal(false)
      }
    }catch(e){
      console.log("Cannot Delete" + e);
      Alert.alert("Error","Cannot Delete")
    }finally{
      setIsDeleting(false)
    }
  }

 useFocusEffect(
  useCallback(() => {
    getExpenses();
  }, [])
);
  return (
    <View style={style.mainBg}>
      <Text style={style.mainHeading}>Expences Record</Text>

      {isLoading ? <ActivityIndicator color={'#BE5985'} size={50} /> : ''}
      <TouchableOpacity
        style={[style.mainBtn, {marginVertical: 10}]}
        onPress={() => navigation.navigate('addExpences')}>
        <Text style={style.mainBtnTxt}>Add Expences</Text>
      </TouchableOpacity>
      <Text style={style.mainTitle}>Expences Record</Text>
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
            <Text style={style.tableHeading}>Description</Text>
            <Text style={style.tableHeading}>Amount</Text>
            <Text style={style.tableHeading}>Date</Text>
            <Text style={style.tableHeading}>Action</Text>
          </View>
          {/* Table body */}
          {expences.map((item, key) => (
            <View style={style.tableRow} key={key}>
              <Text style={style.tableData}>{item.description}</Text>
              <Text style={style.tableData}>{Math.floor(item.amount)}</Text>
              <Text style={style.tableData}>{item.expense_date}</Text>
              <View style={style.tableData}>
                <View style={[style.flexRow, {gap: 20}]}>
                  <TouchableOpacity onPress={()=>navigation.navigate("editExpences",{expenceId:item.expense_id})}>
                    <Text style={{color: 'green', fontWeight: 'bold'}}>
                      Edit
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setDeleteId(item.expense_id)
                      setDeleteModal(true)
                    }}>
                    <Text style={{color: 'red', fontWeight: 'bold'}}>
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
          <View style={style.tableHeader}>
            <Text style={style.tableHeading}>Total</Text>
            <Text style={style.tableHeading}>{total}</Text>
          </View>
        </ScrollView>
      </ScrollView>

      {/* Delete Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={deleteModal}
        onRequestClose={() => {
          setDeleteModal(false);
        }}>
        <View style={style.centeredView}>
          <View style={style.modalView}>
            <Text style={style.mainTitle}>Delete Record</Text>
            <Text style={{color: 'white', marginBottom: 20}}>
              Are you sure you want to delete this Record?
            </Text>

            <View style={[style.flexRow, {gap: 10}]}>
              <Pressable
                style={[
                  style.mainBtn,
                  style.flexRow,
                  {backgroundColor: 'red', justifyContent: 'center'},
                ]}
                onPress={deleteRecord}
                disabled={isDeleting}>
                <Text style={style.mainBtnTxt}>Delete</Text>
                {isDeleting ? <ActivityIndicator color={'white'} /> : ''}
              </Pressable>
              <Pressable
                style={[style.mainBtn]}
                onPress={() => setDeleteModal(false)}>
                <Text style={style.mainBtnTxt}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Expences;
