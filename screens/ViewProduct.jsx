import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import React from 'react';
import {style} from '../style/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
const ViewProduct = ({navigation}) => {
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
        <Text style={style.headerText}>Product Name</Text>
      </View>

      <ScrollView contentContainerStyle={style.containerPadding}>
        {/* hero image */}
        <Image
          source={require('../assets/images/cosmetics.jpg')}
          style={style.heroImage}
        />

        <Text style={style.mainTitle}>Name</Text>
        <Text style={style.mainText}>Beautic</Text>

        <Text style={style.mainTitle}>Category</Text>
        <Text style={style.mainText}>Skin Care</Text>
        
        <Text style={style.mainTitle}>Price</Text>
        <Text style={style.mainText}>200 PKR</Text>
      
        <Text style={style.mainTitle}>Availability</Text>
        <Text style={style.mainText}>Available</Text>

        <Text style={style.mainTitle}>Description</Text>
        <Text style={style.mainText}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quod
          odit est maiores tenetur! Iste, in iusto! Laborum, accusamus vitae
          quam totam corrupti qui blanditiis! Assumenda ad asperiores aperiam
          distinctio?
        </Text>

       
      </ScrollView>
    </View>
  );
};

export default ViewProduct;
