import { View, Text, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { style } from '../../../style/style'
import AsyncStorage from '@react-native-async-storage/async-storage'


const LogOutAdmin = ({navigation}) => {
const [isLoading,setIsLoading]=useState(false)
async function logOut(){
  try{
    setIsLoading(true)
    await AsyncStorage.removeItem("isLogin")
    await AsyncStorage.removeItem("isAdmin")
    navigation.replace("login")
  }catch(e){
    Alert("Oops, Some error occured" + e)
  }finally{
    setIsLoading(false)
  }
}

  return (
    <View style={style.mainBg}>
        <Image source={require("../../../../assets/images/logo.png")} style={{width:300,height:300,marginHorizontal:"auto"}}/>
        <View style={style.logOutCard}>
            <Text style={style.mainTitle}>Do You Want To Log Out?</Text>
            <TouchableOpacity style={[style.mainBtn,style.flexRow,{marginTop:20,justifyContent:"center"}]} onPress={logOut}>
                <Text style={style.mainBtnTxt}>Log Out</Text>
                {isLoading?<ActivityIndicator color={"white"}/>:""}
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default LogOutAdmin