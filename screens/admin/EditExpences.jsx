import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, {useState, useEffect} from 'react';
import {style} from '../../style/style';
import {url} from '../../constants';

const EditExpences = ({navigation,route}) => {
    const expenceId = route.params.expenceId
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

  const handleEditExpences = async () => {
    
    if (
      !newExpences.price ||
      !newExpences.description
    ) {
      Alert.alert('Fields are Required', 'Please fill all required fields');
      return;
    }

    try {
        
      setIsLoading(true);
      const response = await fetch(`${url}/expences/edit-expences/${expenceId}`, {
        method: 'PUT',
        headers: {"content-type":"application/json"},
        body: JSON.stringify(newExpences),
      });

      const result = await response.json();

      if (response.ok) {
        resetForm();
        Alert.alert('Success', 'expences Update successfully');
        navigation.goBack()
      } else {
        Alert.alert('Error', result.message || 'Failed to Update expences');
      }
    } catch (error) {
      console.error('Error adding expences:', error);
      Alert.alert('Error', 'An error occurred while Updating the expences');
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

    async function getExpenses() {
      try {
        setIsLoading(true)
        const response = await fetch(`${url}/expences/get-expences-by-id/${expenceId}`, {
          method: 'GET',
        });
        const result = await response.json();
        if (response.ok) {
          setNewExpences({
            description:result.description,
            price:result.amount
          });
        }
      } catch (e) {
        console.log('Cannot get Expenses' + e);
        Alert.alert('Error', 'Cannot Get Expenses');
      }finally{
        setIsLoading(false)
      }
    }
  useEffect(()=>{
getExpenses()
  },[])
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
             <Text style={style.headerText}>Update Expences</Text>
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
                 onPress={handleEditExpences}
                 disabled={isLoading}
                 >
                 <Text style={style.mainBtnTxt}>Update Expences</Text>
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

export default EditExpences