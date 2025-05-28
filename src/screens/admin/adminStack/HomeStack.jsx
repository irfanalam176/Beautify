
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Appointments from '../appointments/Appointments'
import Expences from '../expenses/Expences'
import AddExpences from '../expenses/AddExpences'
import SaleRecord from '../sale/SaleRecord'
import TotalSaleRecord from '../sale/TotalSaleRecord'
import CategoriesList from '../categories/CategoriesList'
import AddProductsCategories from '../categories/AddProductsCategories'
import EditExpences from '../expenses/EditExpences'
import EditCategories from '../categories/EditCategories'
import Gallery from '../gallery/Gallery'
import AddGalleryPic from '../gallery/AddGalleryPic'
import Dashboard from '../home/Dashboard'

const HomeStack = () => {
    const Stack = createNativeStackNavigator()
  return (
   <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='dashboard'>
    <Stack.Screen name='dashboard' component={Dashboard}/>
    <Stack.Screen name='appointments' component={Appointments}/>
    <Stack.Screen name='expences' component={Expences}/>
    <Stack.Screen name='addExpences' component={AddExpences}/>
    <Stack.Screen name='editExpences' component={EditExpences}/>
    <Stack.Screen name='categoriesList' component={CategoriesList}/>
    <Stack.Screen name='addCategories' component={AddProductsCategories}/>
    <Stack.Screen name='editCategory' component={EditCategories}/>
    <Stack.Screen name='saleRecord' component={SaleRecord}/>
    <Stack.Screen name='totalSaleRecord' component={TotalSaleRecord}/>
    <Stack.Screen name='adminGallery' component={Gallery}/>
    <Stack.Screen name='addGalleryPic' component={AddGalleryPic}/>
   </Stack.Navigator>
  )
}

export default HomeStack