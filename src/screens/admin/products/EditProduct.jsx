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
import React, {useState,useEffect} from 'react'
import { style } from '../../../style/style';
import ImagePicker from 'react-native-image-crop-picker';
import {Dropdown} from 'react-native-element-dropdown';
import { url } from '../../../constants';
const EditProduct = ({navigation,route}) => {
      const productId = route.params?.productId
      const [selectedProductId, setSelectedProductId] = useState(null);
      const [categoriesList, setCategoriesList] = useState([]);
      const [category, setCategory] = useState(null);
  const[isLoading,setIsLoading]=useState(false)
      const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
        quantity: '',
        image: null,
      });

        function pickImage() {
          ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
          }).then(image => {
            setNewProduct(prevData => ({
              ...prevData,
              image: {
                uri: image.path,
                name: image.path.split("/").pop(),
                mime: image.mime,
                isLocal: true,
              },
            }));
          });
        }

          const resetForm = () => {
    setNewProduct({
      name: '',
      description: '',
      price: '',
      quantity:'',
      image: null,
    });
    setCategory(null);
    setSelectedProductId(null);
  };

  const handleUpdateProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.description || !newProduct.image || !category) {
      Alert.alert('Fields are Required', 'Please fill all required fields');
      return;
    }

    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('description', newProduct.description);
    formData.append('price', newProduct.price);
    formData.append('quantity', parseInt(newProduct.quantity));
    formData.append('category_id', category);
    
    if(newProduct.image?.isLocal){
      formData.append('image', {
      uri: newProduct.image.uri,
      type: newProduct.image.mime,
      name: newProduct.image.name,
    });
    }

    try {
      setIsLoading(true)
      
      const response = await fetch(`${url}/products/update-product/${productId}`, {
        method: "PUT",
        headers: {
        
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        resetForm();
        Alert.alert('Success', 'Product Updated successfully');
        navigation.goBack()
      } else {
        Alert.alert('Error', result.message || 'Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      Alert.alert('Error', 'An error occurred while updating the product');
    }finally{
      setIsLoading(false)
    }
  };

    const handleInputChange = (field, value) => {
    setNewProduct(prev => ({
      ...prev,
      [field]: value,
    }));
  };

    const getCategories = async () => {
      try {
        const response = await fetch(`${url}/products/get-categories`);
        const result = await response.json();
        
        setCategoriesList(result.list || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };


    async function getData(){
      try{

        const response = await fetch(`${url}/products/get-product-by-id/${productId}`,{method:"GET"})
        const result = await response.json()
        setNewProduct({
          name:result.name,
          description:result.description,
          price:result.price,
          quantity:result.quantity.toString(),
          image:{
            uri: `${url}/uploads/${result.image}`,
            name: result.image,
            mime: 'image/jpeg', 
            isLocal:false
          }
        })
        setCategory(result.category)
      }catch(e){
        Alert.alert("error","Cannot Get Data")
        console.log("Cannot Get Data" + e);
        
      }
    }

      useEffect(() => {
        getCategories();
        getData()
      }, []);
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
                    <Text style={style.headerText}>Edit Product</Text>
                  </View>
          
         <View style={style.form}>
             <View style={[style.flexBetween,style.flexRow,{marginBottom:20}]}>
              <Text style={style.mainTitle}>Edit Product</Text>
                {newProduct.image && (
              <Image
                source={{uri: newProduct.image.uri}}
                style={{width:50,height:50,objectFit:"fill"}}
              />
            )}
          </View>
            <View style={style.inputBox}>
              <TextInput
                placeholder="Product Name *"
                style={style.input}
                value={newProduct.name}
                onChangeText={text => handleInputChange('name', text)}
              />
            </View>

            <View style={style.inputBox}>
              <TextInput
                placeholder="Description"
                style={[style.input, {height: 80, textAlignVertical: 'top'}]}
                value={newProduct.description}
                onChangeText={text => handleInputChange('description', text)}
                multiline
              />
            </View>

            <View style={style.inputBox}>
              <TextInput
                placeholder="Price *"
                style={style.input}
                value={newProduct.price}
                onChangeText={text => handleInputChange('price', text)}
                keyboardType="numeric"
              />
            </View>

            <View style={style.inputBox}>
              <TextInput
                placeholder="Quantity *"
                style={style.input}
                value={newProduct.quantity}
                onChangeText={text => handleInputChange('quantity', text)}
                keyboardType="numeric"
              />
            </View>

            <View style={style.inputBox}>
              <Dropdown
                style={style.input}
                placeholderStyle={style.placeholderStyle}
                selectedTextStyle={style.selectedTextStyle}
                inputSearchStyle={style.inputSearchStyle}
                iconStyle={style.iconStyle}
                containerStyle={style.dropdownContainer}
                itemTextStyle={style.dropdownText}
                data={categoriesList}
                search
                maxHeight={300}
                labelField="category_name"
                valueField="id"
                placeholder={'Select Category'}
                searchPlaceholder="Search..."
                value={category}
                onChange={item => {
                  setCategory(item.id);
                }}
              />
            </View>

            <TouchableOpacity style={style.mainBtn} onPress={pickImage}>
              <Text style={style.mainBtnTxt}>Select Image</Text>
            </TouchableOpacity>

        

            <View style={[style.flexRow, {gap: 10, marginTop: 10}]}>
              <Pressable
                style={[
                  style.mainBtn,
                  style.flexRow,
                  {backgroundColor: 'green', width: '50%',justifyContent:"center"},
                ]}
                onPress={handleUpdateProduct}
                disabled={isLoading}
                >
                <Text style={style.mainBtnTxt}>Update Product</Text>
                {isLoading?<ActivityIndicator color={"white"}/>:""}
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

export default EditProduct