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
import React, {useEffect, useState} from 'react';
import {style} from '../../../style/style';
import {url} from '../../../constants';

const EditCategories = ({navigation,route}) => {
    const categoryId = route.params.categoryId
      const [isLoading, setIsLoading] = useState(false);
      const [newCategory, setNewCategory] = useState({
        name:""
      });

  const resetForm = () => {
    setNewCategory({
      name:""
    });
  };

  const handleUpdateCategory = async () => {
    
    if (
      !newCategory.name
    ) {
      Alert.alert('Fields are Required', 'Please fill all required fields');
      return;
    }

    try {
        
      setIsLoading(true);
      const response = await fetch(`${url}/products/update-categories/${categoryId}`, {
        method: 'PUT',
        headers: {"content-type":"application/json"},
        body: JSON.stringify(newCategory),
      });

      const result = await response.json();
  
      if (response.ok) {
       navigation.goBack()
        Alert.alert('Success', 'Category updated successfully');
      } else {
        Alert.alert('Error', result.message || 'Failed to update Category');
      }
    } catch (error) {
      console.error('Error adding Category:', error);
      Alert.alert('Error', 'An error occurred while updating the Category');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setNewCategory(prev => ({
      ...prev,
      [field]: value,
    }));
  };


    const getCategories = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`${url}/products/get-categories-by-id/${categoryId}`, {
          method: 'GET',
        });
        const result = await response.json();
        
       setNewCategory({name:result.category_name})
       
      } catch (e) {
        console.log('Cannot get Categories' + e);
      }finally{
        setIsLoading(false)
      }
    };
  useEffect(()=>{
    getCategories()
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
             <Text style={style.headerText}>Update Categories</Text>
           </View>
   
           <View style={style.form}>      
             <View style={style.inputBox}>
               <TextInput
                 placeholder="Category"
                 style={style.input}
                 value={newCategory.name}
                 onChangeText={text => handleInputChange('name', text)}
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
                 onPress={handleUpdateCategory}
                 disabled={isLoading}
                 >
                 <Text style={style.mainBtnTxt}>Update Category</Text>
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

export default EditCategories