import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { style } from '../style/style'

const LogOut = () => {
  return (
    <View style={style.mainBg}>
        <Image source={require("../assets/images/logo.png")} style={{width:300,height:300,marginHorizontal:"auto"}}/>
        <View style={style.logOutCard}>
            <Text style={style.mainTitle}>Do You Want To Log Out?</Text>
            <TouchableOpacity style={[style.mainBtn,{marginTop:20}]}>
                <Text style={style.mainBtnTxt}>Log Out</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default LogOut