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
ActivityIndicator
} from 'react-native';
import React, {useState} from 'react';
import {style} from '../style/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { url } from '../constants';
import Toast from 'react-native-toast-message';

const Register = ({navigation}) => {
  const[isLoading,setIsLoading] = useState(false)
  const[isHidden,setIsHidden] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: '',
      email: '',
      phone: '',
      password: '',
    };

    // Name validation (min 3 characters)
    if (formData.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
      valid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }

    // Pakistani phone number validation
    const phoneRegex = /^(\+92|0)[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid Pakistani phone number';
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

  const handleRegister = async() => {
    if (validateForm()) {
      // Form is valid, proceed with registration
      const options={
        method:"POST",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify(formData)
      }

     try{
      setIsLoading(true)
      const response = await fetch(`${url}/auth/register`,options)
      const result = await response.json()
      if(result.status=="error"){  
        Toast.show({
          type:"error",
          text1:"Registration Failed",
          text2:result.message,
          position:"top",
          visibilityTime:10000,
          swipeable:true
        })
      }
      if(result.status=="success"){  
        Toast.show({
          type:"success",
          text1:"Registration Successfull",
          text2:result.message,
          position:"top",
          visibilityTime:10000,
          swipeable:true
        })
        navigation.navigate("login")
      }
      
     }catch(e){
      console.log("error Inserting Data"+ e);
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

  return (
    <ImageBackground
      source={require('../assets/images/background.jpg')}
      style={style.wrapper}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1, justifyContent: 'center'}}
        keyboardVerticalOffset={10}>
        
        
        {/* form */}
        <View style={style.form}>
          <ScrollView>

           <View style={[style.flexRow,style.flexAlignCenter,style.flexBetween]}>
           <View>
           <Text style={[style.mainHeading]}>Register as Customer</Text>
            <TouchableOpacity
              style={[style.flexRow, {gap: 5, marginBottom: 20}]}
              onPress={() => navigation.navigate('login')}>
              <Text style={style.anchor}>Already Have An Account?</Text>
              <Text style={style.anchorBtn}>Login</Text>
            </TouchableOpacity>
           </View>
           <Image source={require("../assets/images/logo.png")} style={{width:70,height:70}}/>
           </View>


            <Text style={style.lable}>Enter Your Name</Text>
            <View style={style.inputBox}>
              <Ionicons name="person-circle" size={30} style={style.formIcon} />
              <TextInput
                style={style.input}
                selectionColor={'#FFEDFA'}
                value={formData.name}
                onChangeText={text => handleInputChange('name', text)}
              />
            </View>
            {errors.name ? (
              <Text style={style.errorText}>{errors.name}</Text>
            ) : null}

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

            <Text style={style.lable}>Enter Your Phone</Text>
            <View style={style.inputBox}>
              <Ionicons
                name="phone-portrait"
                size={30}
                style={style.formIcon}
              />
              <TextInput
                style={style.input}
                selectionColor={'#FFEDFA'}
                keyboardType="phone-pad"
                value={formData.phone}
                onChangeText={text => handleInputChange('phone', text)}
              />
            </View>
            {errors.phone ? (
              <Text style={style.errorText}>{errors.phone}</Text>
            ) : null}

            <Text style={style.lable}>Enter Your Password</Text>
            <View style={[style.inputBox,style.passwordInput]}>
              <Ionicons name="lock-closed" size={30} style={style.formIcon} />
              <TextInput
                style={style.input}
                selectionColor={'#FFEDFA'}
                secureTextEntry={isHidden}
                value={formData.password}
                onChangeText={text => handleInputChange('password', text)}
              />
              <Pressable onPress={()=>setIsHidden(!isHidden)} style={style.eyeIcon}>
               {isHidden? <Ionicons name="eye" size={30} color="white"/>:
                <Ionicons name="eye-off" size={30} color="white" />}
                </Pressable>
             
            </View>
            {errors.password ? (
              <Text style={style.errorText}>{errors.password}</Text>
            ) : null}

            <TouchableOpacity
              style={[style.mainBtn,style.flexRow,style.flexAlignCenter, {marginTop: 20,justifyContent:"center"}]}
              onPress={handleRegister} disabled={isLoading}>
              <Text style={style.mainBtnTxt}>Register</Text>
              {isLoading?<ActivityIndicator color={"white"}/>:""}
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default Register;
