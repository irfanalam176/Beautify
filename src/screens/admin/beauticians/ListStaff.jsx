import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {style} from '../../../style/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useFocusEffect} from '@react-navigation/native';
import {url} from '../../../constants';
const ListStaff = ({navigation}) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [beauticianList, setBeauticianList] = useState([]);
  const [deleteId, setDeleteId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

    const [searchText, setSearchText] = useState('');
    const filteredList = beauticianList.filter(item =>
      item.name.toLowerCase().includes(searchText.toLowerCase()),
    );
  async function getBeauticians() {
    try {
      setIsLoading(true);
      const response = await fetch(`${url}/beautician/get-beauticians`, {
        method: 'GET',
      });
      const result = await response.json();
      setBeauticianList(result || []);
    } catch (e) {
      console.log('Cannot get Beauticians' + e);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteBeautician() {
    try {
      setIsDeleting(true);
      const response = await fetch(
        `${url}/beautician/delete-beautician/${deleteId}`,
        {method: 'DELETE'},
      );
      if (response.ok) {
        getBeauticians();
        setDeleteModal(false);
        Alert('Success', 'Beautician Deleted');
      }
    } catch (e) {
      Alert('Error', 'Cannot Delete');
      console.log('cannot delete beautician' + e);
    } finally {
      setIsDeleting(false);
    }
  }
  useFocusEffect(
    useCallback(() => {
      getBeauticians();
    }, []),
  );

  return (
    <View style={style.mainBg}>
      <Text style={style.mainHeading}>Manage Staff</Text>
      <View style={{flexDirection: 'row', gap: 5}}>
        <TextInput
          placeholder="Search Beautician"
          style={[style.input, {paddingLeft: 10, width: '100%'}]}
          placeholderTextColor={'gray'}
            value={searchText}
           onChangeText={text => setSearchText(text)}
        />
      </View>

      {/* Add Beautician Button */}
      <TouchableOpacity
        style={[style.mainBtn, {marginVertical: 10}]}
        onPress={() => navigation.navigate('addBeautician')}>
        <Text style={style.mainBtnTxt}>Add Beautician</Text>
      </TouchableOpacity>

      {isLoading ? <ActivityIndicator color={'#BE5985'} /> : ''}
      {/* Beautician List Table */}
      <ScrollView
        contentContainerStyle={style.tableContainer}
        horizontal={true}>
        <ScrollView contentContainerStyle={[style.table, {paddingBottom: 100}]}>
          {/* table head */}
          <View style={style.tableHeader}>
            <Text style={style.tableHeading}>Name</Text>
            <Text style={style.tableHeading}>specialization</Text>
            <Text style={style.tableHeading}>Contact</Text>
            <Text style={style.tableHeading}>Schedule</Text>
            <Text style={style.tableHeading}>Action</Text>
          </View>
          {/* table body */}
          {filteredList.map((item, key) => (
            <View style={style.tableRow} key={key}>
              <Text style={style.tableData}>{item.name}</Text>
              <Text style={style.tableData}>{item.specialization}</Text>
              <Text style={style.tableData}>{item.phone}</Text>
              <Text style={style.tableData}>{item.availability_schedule}</Text>
              <Text style={style.tableData}>
                <View style={[style.flexRow, {gap: 20}]}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('editBeautician', {
                        id: item.beautician_id,
                      })
                    }>
                    <Text style={{color: 'green', fontWeight: 'bold'}}>
                      Edit
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setDeleteModal(true);
                      setDeleteId(item.beautician_id);
                    }}>
                    <Text style={{color: 'red', fontWeight: 'bold'}}>
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              </Text>
            </View>
          ))}
        </ScrollView>
      </ScrollView>

      {/* Delete Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={deleteModal}
        onRequestClose={() => {
          setModalVisible(!deleteModal);
        }}>
        <View style={style.centeredView}>
          <View style={style.modalView}>
            <Text style={style.mainTitle}>Delete Beautician</Text>

            <View style={[style.flexRow, {gap: 10}]}>
              <Pressable
                style={[
                  style.mainBtn,
                  style.flexRow,
                  {backgroundColor: 'red', justifyContent: 'center'},
                ]}
                onPress={deleteBeautician}
                disabled={isDeleting}
                >
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

export default ListStaff;
