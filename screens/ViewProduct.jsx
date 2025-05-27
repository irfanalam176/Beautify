import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import React from 'react';
import {style} from '../style/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { url } from '../constants';
const ViewProduct = ({navigation,route}) => {
 const{prodcutd,name,image,description,price,category,quantity}=route.params
  function goBack(){
    navigation.goBack()
  }
  return (
    <View style={style.mainBg}>
      <View style={style.header}>
        <TouchableOpacity onPress={goBack}>
          <Ionicons
            name="chevron-back-outline"
            size={30}
            style={style.headerIcon}
          />
        </TouchableOpacity>
        <Text style={style.headerText}>{name}</Text>
      </View>

      <ScrollView contentContainerStyle={style.containerPadding}>
        {/* hero image */}
        <Image
          source={{uri:`${url}/uploads/${image}`}}
          style={style.heroImage}
        />

        <Text style={style.mainTitle}>Name</Text>
        <Text style={style.mainText}>{name}</Text>

        <Text style={style.mainTitle}>Category</Text>
        <Text style={style.mainText}>{category}</Text>
        
        <Text style={style.mainTitle}>Price</Text>
        <Text style={style.mainText}>{price}</Text>
      
        <Text style={style.mainTitle}>Availability</Text>
        <Text style={style.mainText}>{quantity<=0?"not Available":"Available"}</Text>

        <Text style={style.mainTitle}>Description</Text>
        <Text style={style.mainText}>
          {description}
        </Text>

       
      </ScrollView>
    </View>
  );
};

export default ViewProduct;
