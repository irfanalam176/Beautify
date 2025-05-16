import {TouchableOpacity, View, Text, Image, ScrollView} from 'react-native';
import React from 'react';
import {style} from '../style/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Products = ({navigation}) => {
  function goBack(){
    navigation.goBack()
  }
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
          <TouchableOpacity style={style.serviceCard} onPress={()=>navigation.navigate("viewProduct")}>
            <Image
              source={require('../assets/images/cosmetics.jpg')}
              style={style.serviceCardImage}
            />
            <Text style={style.cardText} numberOfLines={1} ellipsizeMode="tail">
              Beautic
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.serviceCard}>
            <Image
              source={require('../assets/images/cosmetics.jpg')}
              style={style.serviceCardImage}
            />
            <Text style={style.cardText} numberOfLines={1} ellipsizeMode="tail">
              Beautic
            </Text>
            <Text style={style.notAvailable} numberOfLines={1} ellipsizeMode="tail">
              Not Available
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.serviceCard}>
            <Image
              source={require('../assets/images/cosmetics.jpg')}
              style={style.serviceCardImage}
            />
            <Text style={style.cardText} numberOfLines={1} ellipsizeMode="tail">
              Beautic
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.serviceCard}>
            <Image
              source={require('../assets/images/cosmetics.jpg')}
              style={style.serviceCardImage}
            />
            <Text style={style.cardText} numberOfLines={1} ellipsizeMode="tail">
              Beautic
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.serviceCard}>
            <Image
              source={require('../assets/images/cosmetics.jpg')}
              style={style.serviceCardImage}
            />
            <Text style={style.cardText} numberOfLines={1} ellipsizeMode="tail">
              Beautic
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.serviceCard}>
            <Image
              source={require('../assets/images/cosmetics.jpg')}
              style={style.serviceCardImage}
            />
            <Text style={style.cardText} numberOfLines={1} ellipsizeMode="tail">
              Beautic
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.serviceCard}>
            <Image
              source={require('../assets/images/cosmetics.jpg')}
              style={style.serviceCardImage}
            />
            <Text style={style.cardText} numberOfLines={1} ellipsizeMode="tail">
              Beautic
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.serviceCard}>
            <Image
              source={require('../assets/images/cosmetics.jpg')}
              style={style.serviceCardImage}
            />
            <Text style={style.cardText} numberOfLines={1} ellipsizeMode="tail">
              Beautic
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.serviceCard}>
            <Image
              source={require('../assets/images/cosmetics.jpg')}
              style={style.serviceCardImage}
            />
            <Text style={style.cardText} numberOfLines={1} ellipsizeMode="tail">
              Beautic
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.serviceCard}>
            <Image
              source={require('../assets/images/cosmetics.jpg')}
              style={style.serviceCardImage}
            />
            <Text style={style.cardText} numberOfLines={1} ellipsizeMode="tail">
              Beautic
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.serviceCard}>
            <Image
              source={require('../assets/images/cosmetics.jpg')}
              style={style.serviceCardImage}
            />
            <Text style={style.cardText} numberOfLines={1} ellipsizeMode="tail">
              Beautic
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.serviceCard}>
            <Image
              source={require('../assets/images/cosmetics.jpg')}
              style={style.serviceCardImage}
            />
            <Text style={style.cardText} numberOfLines={1} ellipsizeMode="tail">
              Beautic
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.serviceCard}>
            <Image
              source={require('../assets/images/cosmetics.jpg')}
              style={style.serviceCardImage}
            />
            <Text style={style.cardText} numberOfLines={1} ellipsizeMode="tail">
              Beautic
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.serviceCard}>
            <Image
              source={require('../assets/images/cosmetics.jpg')}
              style={style.serviceCardImage}
            />
            <Text style={style.cardText} numberOfLines={1} ellipsizeMode="tail">
              Beautic
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.serviceCard}>
            <Image
              source={require('../assets/images/cosmetics.jpg')}
              style={style.serviceCardImage}
            />
            <Text style={style.cardText} numberOfLines={1} ellipsizeMode="tail">
              Beautic
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Products;
