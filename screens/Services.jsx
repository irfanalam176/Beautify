import {TouchableOpacity, View, Text, Image, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {style} from '../style/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {url} from '../constants';
const Services = ({navigation}) => {
  const [servicesList, setServicesList] = useState([]);

  function goBack() {
    navigation.goBack();
  }

  async function getServices() {
    const response = await fetch(`${url}/services/get-services`, {method: 'GET'});
    const result = await response.json();
    
    setServicesList(result.list);
  }
  useEffect(() => {
    getServices();
  }, []);
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
        <Text style={style.mainTitle}>Our Services</Text>
        <View style={style.serviceGrid}>
          {servicesList.map((item, key) => (
            <TouchableOpacity
              style={style.serviceCard}
              onPress={() => navigation.navigate('viewService',{serviceId:item.service_id,name:item.name,image:item.image,description:item.description,price:item.price})} key={key}>
              <Image
                source={{uri:`${url}/uploads/${item.image}`}}
                style={style.serviceCardImage}
              />
              <Text
                style={style.cardText}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item.name}
              </Text>
              <Text
                style={style.cardText}
                numberOfLines={1}>
                {item.price}PKR
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Services;
