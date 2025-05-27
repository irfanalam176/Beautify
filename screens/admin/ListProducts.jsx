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
import React, {useCallback, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {style} from '../../style/style';

import {url} from '../../constants';
import {useFocusEffect} from '@react-navigation/native';

const ListProducts = ({navigation}) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [productList, setProductList] = useState([]);
  const [deleteId, setDeleteId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [searchText, setSearchText] = useState('');
  const filteredList = productList.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase()),
  );
  const handleDeleteProduct = async () => {
    if (!deleteId) return;

    try {
      setIsDeleting(true);
      const response = await fetch(
        `${url}/products/delete-product/${deleteId}`,
        {
          method: 'DELETE',
        },
      );

      const result = await response.json();

      if (response.ok) {
        // Refresh product list after successful deletion
        getProducts();
        setDeleteModal(false);
        Alert.alert('Success', 'Product deleted successfully');
      } else {
        Alert.alert('Error', result.message || 'Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      Alert.alert('Error', 'An error occurred while deleting the product');
    } finally {
      setIsDeleting(false);
    }
  };

  function openDeleteModal(productId) {
    setDeleteId(productId);
    setDeleteModal(true);
  }

  const getProducts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${url}/products/get-products`, {
        method: 'GET',
      });
      const result = await response.json();

      setProductList(result.list || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };
  useFocusEffect(
    useCallback(() => {
      getProducts();
    }, []),
  );

  return (
    <View style={style.mainBg}>
      <Text style={style.mainHeading}>Manage Products</Text>

      {/* Search Bar */}
      <View style={{flexDirection: 'row', gap: 5}}>
        <TextInput
          placeholder="Search Product"
          style={[style.input, {paddingLeft: 10, width: '100%'}]}
          placeholderTextColor={'gray'}
          value={searchText}
          onChangeText={text => setSearchText(text)}
        />
      </View>

      {/* Add Product Button */}
      <TouchableOpacity
        style={[style.mainBtn, {marginVertical: 10}]}
        onPress={() => navigation.navigate('addProduct')}>
        <Text style={style.mainBtnTxt}>Add Product</Text>
      </TouchableOpacity>

      {isLoading ? <ActivityIndicator color={'#BE5985'} size={50} /> : ''}
      {/* Product List Table */}
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
            <Text style={style.tableHeading}>Image</Text>
            <Text style={style.tableHeading}>Name</Text>
            <Text style={style.tableHeading}>Description</Text>
            <Text style={style.tableHeading}>Price</Text>
            <Text style={style.tableHeading}>Category</Text>
            <Text style={style.tableHeading}>Quantity</Text>
            <Text style={style.tableHeading}>Action</Text>
          </View>

          {/* Table Body */}
          {filteredList.map((item, key) => (
            <View style={style.tableRow} key={key}>
              <View style={style.tableData}>
                {item.image ? (
                  <Image
                    source={{uri: `${url}/uploads/${item.image}`}}
                    style={style.tableImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={style.noImage}>
                    <Ionicons name="image-outline" size={24} color="gray" />
                  </View>
                )}
              </View>
              <Text style={style.tableData}>{item.name}</Text>
              <Text style={style.tableData}>{item.description}</Text>
              <Text style={style.tableData}>{item.price}PKR</Text>
              <Text style={style.tableData}>{item.category_name}</Text>
              <Text style={style.tableData}>{item.stock_quantity}</Text>
              <View style={style.tableData}>
                <View style={[style.flexRow, {gap: 20}]}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('editProduct', {
                        productId: item.product_id,
                      });
                    }}>
                    <Text style={{color: 'green', fontWeight: 'bold'}}>
                      Edit
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => openDeleteModal(item.product_id)}>
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
            <Text style={style.mainTitle}>Delete Product</Text>
            <Text style={{color: 'white', marginBottom: 20}}>
              Are you sure you want to delete this product?
            </Text>

            <View style={[style.flexRow, {gap: 10}]}>
              <Pressable
                style={[
                  style.mainBtn,
                  style.flexRow,
                  {backgroundColor: 'red', justifyContent: 'center'},
                ]}
                onPress={handleDeleteProduct}
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

export default ListProducts;
