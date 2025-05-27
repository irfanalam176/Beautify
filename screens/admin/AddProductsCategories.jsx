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
import React, {useState} from 'react';
import {style} from '../../style/style';
import {url} from '../../constants';

const AddProductsCategories = ({navigation}) => {
      const [isLoading, setIsLoading] = useState(false);
      const [newCategory, setNewCategory] = useState({
        name:""
      });

  const resetForm = () => {
    setNewCategory({
      name:""
    });
  };

  const handleAddCategory = async () => {
    
    if (
      !newCategory.name
    ) {
      Alert.alert('Fields are Required', 'Please fill all required fields');
      return;
    }

    try {
        
      setIsLoading(true);
      const response = await fetch(`${url}/products/add-categories`, {
        method: 'POST',
        headers: {"content-type":"application/json"},
        body: JSON.stringify(newCategory),
      });

      const result = await response.json();

      if (response.ok) {
        resetForm();
        Alert.alert('Success', 'Category added successfully');
      } else {
        Alert.alert('Error', result.message || 'Failed to add Category');
      }
    } catch (error) {
      console.error('Error adding Category:', error);
      Alert.alert('Error', 'An error occurred while adding the Category');
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
             <Text style={style.headerText}>Add Categories</Text>
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
                 onPress={handleAddCategory}
                 disabled={isLoading}
                 >
                 <Text style={style.mainBtnTxt}>Add Category</Text>
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

export default AddProductsCategories