import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ListProducts from '../products/ListProducts'
import AddProduct from '../products/AddProduct'
import EditProduct from '../products/EditProduct'

const ManageProduct = () => {
    const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='listProducts' component={ListProducts}/>
        <Stack.Screen name='addProduct' component={AddProduct}/>
        <Stack.Screen name='editProduct' component={EditProduct}/>
    </Stack.Navigator> 
  )
}

export default ManageProduct