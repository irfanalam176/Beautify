import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ListServices from '../services/ListServices'
import AddServices from '../services/AddServices'
import EditService from '../services/EditService'


const ManageServices = () => {
    const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='listServices'>
        <Stack.Screen name='listServices' component={ListServices}/>
        <Stack.Screen name='addServices' component={AddServices}/>
        <Stack.Screen name='editService' component={EditService}/>
    </Stack.Navigator> 
  )
}

export default ManageServices