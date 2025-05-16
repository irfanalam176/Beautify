
import React from 'react'
import Login from './screens/Login'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Layout from './layout/Layout'
import LoginAdmin from './screens/admin/LoginAdmin'
import AdminLayOut from './screens/admin/AdminLayOut'
import Toast from 'react-native-toast-message'
import Register from './screens/Register'
const App = () => {
  const Stack = createNativeStackNavigator()
  return (
      <NavigationContainer >
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='login'>
          {/* customer screens */}
          <Stack.Screen name='login' component={Login}/>
          <Stack.Screen name='register' component={Register} />
          <Stack.Screen name='layout' component={Layout} />
          {/* admin screens */}
          <Stack.Screen name='loginAdmin' component={LoginAdmin}/>
          <Stack.Screen name='adminLayout' component={AdminLayOut} />
        </Stack.Navigator>
        <Toast/>
      </NavigationContainer>
  )
}

export default App