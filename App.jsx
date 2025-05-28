
import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import LoginAdmin from './src/screens/admin/auth/LoginAdmin'
import Toast from 'react-native-toast-message'
import Layout from './src/screens/customers/layout/Layout'
import Register from './src/screens/customers/Register'
import Login from './src/screens/customers/Login'
import AdminLayout from './src/screens/admin/layout/AdminLayOut'
import SplashScreen from 'react-native-splash-screen'
import { useLoginStatus } from './src/hooks/LoginStatus'
const App = () => {
  useEffect(()=>{
    SplashScreen.hide()
  },[])
  const Stack = createNativeStackNavigator()
  return (
      <NavigationContainer >
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='loginStatus'>
          {/* customer screens */}
          <Stack.Screen name='loginStatus' component={useLoginStatus}/>
          <Stack.Screen name='login' component={Login}/>
          <Stack.Screen name='register' component={Register} />
          <Stack.Screen name='layout' component={Layout} />
          {/* admin screens */}
          <Stack.Screen name='loginAdmin' component={LoginAdmin}/>
          <Stack.Screen name='adminLayout' component={AdminLayout} />
        </Stack.Navigator>
        <Toast/>
      </NavigationContainer>
  )
}

export default App