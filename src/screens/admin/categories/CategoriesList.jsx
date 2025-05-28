import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {style} from '../../../style/style';
import {url} from '../../../constants';
import {useFocusEffect} from '@react-navigation/native';
const CategoriesList = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [categoriesList, setCategoriesList] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState();

  const [searchText, setSearchText] = useState('');
  const filteredList = categoriesList.filter(item =>
    item.category_name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const getCategories = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${url}/products/get-categories`, {
        method: 'GET',
      });
      const result = await response.json();
      setCategoriesList(result.list);
    } catch (e) {
      console.log('Cannot get Categories' + e);
    } finally {
      setIsLoading(false);
    }
  };

  async function deleteRecord() {
    try {
      setIsDeleting(true);
      const response = await fetch(
        `${url}/products/delete-category/${deleteId}`,
        {method: 'DELETE'},
      );
      if (response.ok) {
        getCategories();
        setDeleteModal(false);
      }
    } catch (e) {
      console.log('Cannot Delete' + e);
      Alert.alert('Error', 'Cannot Delete');
    } finally {
      setIsDeleting(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getCategories();
    }, []),
  );

  return (
    <View style={style.mainBg}>
      <Text style={style.mainHeading}>Categories List</Text>
      {/* Search Bar */}
      <View style={{flexDirection: 'row', gap: 5}}>
        <TextInput
          placeholder="Search Categories"
          style={[style.input, {paddingLeft: 10, width: '100%'}]}
          placeholderTextColor={'gray'}
          value={searchText}
          onChangeText={text => setSearchText(text)}
        />
      </View>

      {isLoading ? <ActivityIndicator color={'#BE5985'} size={50} /> : ''}
      <TouchableOpacity
        style={[style.mainBtn, {marginVertical: 10}]}
        onPress={() => navigation.navigate('addCategories')}>
        <Text style={style.mainBtnTxt}>Add Categories</Text>
      </TouchableOpacity>
      <Text style={style.mainTitle}>Categories List</Text>
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
            <Text style={style.tableHeading}>#</Text>
            <Text style={style.tableHeading}>Category Name</Text>
            <Text style={style.tableHeading}>Action</Text>
          </View>
          {/* table body */}
          {filteredList.map((item, key) => (
            <View style={style.tableRow} key={key}>
              <Text style={style.tableData}>{key + 1}</Text>
              <Text style={style.tableData}>{item.category_name}</Text>
              <View style={style.tableData}>
                <View style={[style.flexRow, {gap: 20}]}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('editCategory', {
                        categoryId: item.id,
                      })
                    }>
                    <Text style={{color: 'green', fontWeight: 'bold'}}>
                      Edit
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setDeleteId(item.id);
                      setDeleteModal(true);
                    }}>
                    <Text style={{color: 'red', fontWeight: 'bold'}}>
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
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

export default CategoriesList;
