import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, {useState, useEffect} from 'react';
import {style} from '../../../style/style';
import {url} from '../../../constants';

const AddExpences = ({navigation}) => {
      const [isLoading, setIsLoading] = useState(false);
      const [newExpences, setNewExpences] = useState({
        description: '',
        price: '',
      });

  const resetForm = () => {
    setNewExpences({
      description: '',
      price: '',
    });
  };

  const handleAddExpences = async () => {
    
    if (
      !newExpences.price ||
      !newExpences.description
    ) {
      Alert.alert('Fields are Required', 'Please fill all required fields');
      return;
    }

    try {
        
      setIsLoading(true);
      const response = await fetch(`${url}/expences/add-expences`, {
        method: 'POST',
        headers: {"content-type":"application/json"},
        body: JSON.stringify(newExpences),
      });

      const result = await response.json();

      if (response.ok) {
        resetForm();
        Alert.alert('Success', 'expences added successfully');
      } else {
        Alert.alert('Error', result.message || 'Failed to add expences');
      }
    } catch (error) {
      console.error('Error adding expences:', error);
      Alert.alert('Error', 'An error occurred while adding the expences');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setNewExpences(prev => ({
      ...prev,
      [field]: value,
    }));
  };
      function goBack(){
        navigation.goBack()
      }
  return (
     <ScrollView contentContainerStyle={style.wrapper}>
           <View style={style.header}>
             <TouchableOpacity onPress={goBack}>
               <Ionicons
                 name="chevron-back-outline"
                 size={30}
                 style={style.headerIcon}
               />
             </TouchableOpacity>
             <Text style={style.headerText}>Add Expences</Text>
           </View>
   
           <View style={style.form}>   
             <View style={style.inputBox}>
               <TextInput
                 placeholder="Description"
                 style={[style.input, {height: 80, textAlignVertical: 'top'}]}
                 value={newExpences.description}
                 onChangeText={text => handleInputChange('description', text)}
                 multiline
               />
             </View>
   
             <View style={style.inputBox}>
               <TextInput
                 placeholder="Price *"
                 style={style.input}
                 value={newExpences.price}
                 onChangeText={text => handleInputChange('price', text)}
                 keyboardType="numeric"
               />
             </View>
   
   
             <View style={[style.flexRow, {gap: 10, marginTop: 10}]}>
               <Pressable
                 style={[
                   style.mainBtn,
                   style.flexRow,
                   {
                     backgroundColor: 'green',
                     width: '50%',
                     justifyContent: 'center',
                   },
                 ]}
                 onPress={handleAddExpences}
                 disabled={isLoading}
                 >
                 <Text style={style.mainBtnTxt}>Add Expences</Text>
                 {isLoading ? <ActivityIndicator color={'white'} /> : ''}
               </Pressable>
               <Pressable
                 style={[style.mainBtn, {backgroundColor: 'red', width: '50%'}]}
                 onPress={() => {
                   resetForm();
                 }}>
                 <Text style={style.mainBtnTxt}>Cancel</Text>
               </Pressable>
             </View>
           </View>
         </ScrollView>
  )
}

export default AddExpences