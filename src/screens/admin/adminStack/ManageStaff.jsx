import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ListStaff from '../beauticians/ListStaff'
import AddBeautician from '../beauticians/AddBeautician'
import EditBeautician from '../beauticians/EditBeautician'

const ManageStaff = () => {
    const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='listStaff' component={ListStaff}/>
        <Stack.Screen name='addBeautician' component={AddBeautician}/>
        <Stack.Screen name='editBeautician' component={EditBeautician}/>
   
    </Stack.Navigator> 
  )
}

export default ManageStaff