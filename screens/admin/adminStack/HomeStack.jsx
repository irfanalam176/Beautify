
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Dashboard from '../Dashboard'
import Appointments from '../Appointments'
import Expences from '../Expences'
import AddExpences from '../AddExpences'
import SaleRecord from '../SaleRecord'
import TotalSaleRecord from '../TotalSaleRecord'
import CategoriesList from '../CategoriesList'
import AddProductsCategories from '../AddProductsCategories'
import EditExpences from '../EditExpences'
import EditCategories from '../EditCategories'
import Gallery from '../Gallery'
import AddGalleryPic from '../AddGalleryPic'

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