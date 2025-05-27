import {TouchableOpacity, View, Text, Image, ScrollView} from 'react-native';
import React, { useCallback, useState } from 'react';
import {style} from '../style/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import { url } from '../constants';
const Products = ({navigation}) => {
  const[products,setProducts]=useState([])
  function goBack(){
    navigation.goBack()
  }
    async function getProducts() {
      try{
        const response = await fetch(`${url}/products/get-products`, {method: 'GET'});
      const result = await response.json();
      setProducts(result.list);
      
      }catch(e){
        console.log("Cannot get Products" + e);
        Alert.alert("Error","Cannot Get Products")
        
      }
      
    }
   useFocusEffect(useCallback(()=>{
    getProducts()
   },[]))
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
        <Text style={style.headerText}>Services</Text>
      </View>

      {/* cards */}
      <ScrollView contentContainerStyle={style.containerPadding}>
        <Text style={style.mainTitle}>Products</Text>
        <View style={style.serviceGrid}>
         {
          products.map((item,key)=>(
             <TouchableOpacity style={style.serviceCard} onPress={()=>navigation.navigate("viewProduct",{productId:item.product_id,name:item.name,image:item.image,description:item.description,price:item.price,category:item.category_name,quantity:item.stock_quantity})} key={key}>
            <Image
              source={{uri:`${url}/uploads/${item.image}`}}
              style={style.serviceCardImage}
            />
            <Text style={style.cardText} numberOfLines={1} ellipsizeMode="tail">
              {item.name}
            </Text>
          </TouchableOpacity>
          ))
         }
        </View>
      </ScrollView>
    </View>
  );
};

export default Products;
