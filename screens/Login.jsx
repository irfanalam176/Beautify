import {
  View,
  Text,
  ImageBackground,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {url} from '../constants';
import Toast from 'react-native-toast-message';
import { style } from '../style/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const Login = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      email: '',
      password: '',
    };

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }

    // Password validation (min 8 chars, upper, lower, number)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        'Password must be at least 8 characters with uppercase, lowercase and number';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = async () => {
    
    if (validateForm()) {
      try {
        setIsLoading(true)
        const options = {
          method: 'POST',
          headers: {"content-type": "application/json"},
          body: JSON.stringify(formData),
        };
        const response = await fetch(`${url}/auth/login`, options);
        const result = await response.json();
        if (result.status == 'error') {
          Toast.show({
            type: 'error',
            text1: 'Login Failed',
            text2: result.message,
            position: 'top',
            visibilityTime: 10000,
            swipeable: true,
          });
        }
        if (result.status == 'success') {
          Toast.show({
            type: 'success',
            text1: 'Login Successfull',
            text2: result.message,
            position: 'top',
            visibilityTime: 10000,
            swipeable: true,
          });
          await AsyncStorage.setItem("isLogin", JSON.stringify(true)); 
          await AsyncStorage.setItem("userData",JSON.stringify(result.data))
          checkLoginStatus()
          
        }
      } catch (e) {
        console.log("Login Failed"+e);
      }finally{
        setIsLoading(false)
      }
    }
  };

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

    async function checkLoginStatus(){
      const isLogin = await AsyncStorage.getItem("isLogin")
      if(isLogin){
        navigation.replace("layout")
      }
      
  }
  useFocusEffect(useCallback(()=>{
    checkLoginStatus()
  },[]))

  return (
    <ImageBackground
      source={require('../assets/images/background.jpg')}
      style={style.wrapper}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1, justifyContent: 'center'}}
        keyboardVerticalOffset={10}>
        {/* form  */}
        <View style={style.form}>
          <ScrollView>
            <View
              style={[style.flexRow, style.flexAlignCenter, style.flexBetween]}>
              <View>
                <Text style={[style.mainHeading]}>Login as Customer</Text>
                <TouchableOpacity
                  style={[style.flexRow, {gap: 5, marginBottom: 20}]}
                  onPress={() => navigation.navigate('register')}>
                  <Text style={style.anchor}>Create An Account?</Text>
                  <Text style={style.anchorBtn}>Register</Text>
                </TouchableOpacity>
              </View>
              <Image
                source={require('../assets/images/logo.png')}
                style={{width: 70, height: 70}}
              />
            </View>

            <TouchableOpacity
              style={[style.flexRow, {gap: 5, marginBottom: 20}]}
              onPress={() => navigation.navigate('loginAdmin')}>
              <Text style={style.anchor}>Login As</Text>
              <Text style={style.anchorBtn}>Admin ?</Text>
            </TouchableOpacity>

            <Text style={style.lable}>Enter Your Email</Text>
            <View style={style.inputBox}>
              <Ionicons name="mail" size={30} style={style.formIcon} />
              <TextInput
                style={style.input}
                selectionColor={'#FFEDFA'}
                keyboardType="email-address"
                value={formData.email}
                onChangeText={text => handleInputChange('email', text)}
              />
            </View>
            {errors.email ? (
              <Text style={style.errorText}>{errors.email}</Text>
            ) : null}

            <Text style={style.lable}>Enter Your Password</Text>
            <View style={[style.inputBox, style.passwordInput]}>
              <Ionicons name="lock-closed" size={30} style={style.formIcon} />
              <TextInput
                style={style.input}
                selectionColor={'#FFEDFA'}
                secureTextEntry={isHidden}
                value={formData.password}
                onChangeText={text => handleInputChange('password', text)}
              />
              <Pressable
                onPress={() => setIsHidden(!isHidden)}
                style={style.eyeIcon}>
                {isHidden ? (
                  <Ionicons name="eye" size={30} color="white" />
                ) : (
                  <Ionicons name="eye-off" size={30} color="white" />
                )}
              </Pressable>
            </View>
            {errors.password ? (
              <Text style={style.errorText}>{errors.password}</Text>
            ) : null}

            <TouchableOpacity
              style={[style.mainBtn, style.flexRow,style.flexAlignCenter, {marginTop: 20,justifyContent:"center"}]}
              onPress={handleLogin}
              disabled={isLoading}>
              <Text style={style.mainBtnTxt}>Login</Text>
              {isLoading ? <ActivityIndicator color={'white'} /> : ''}
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default Login;
