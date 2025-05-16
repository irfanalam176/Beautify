import { View,  Text, ImageBackground} from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper'
import { style } from '../style/style'
const Slider = () => {
  return (
    <ImageBackground source={require("../assets/images/swiper.jpg")} style={{borderRadius:20,overflow:"hidden",height:200}}>
    <Swiper  style={{height:200}} autoplay autoplayTimeout={6}
    dotColor='#FFEDFA'
    activeDotColor='#BE5985'
    >
      <View  style={style.sliderItem}>
        <Text style={style.sliderText}>
        Beauty begins the moment you decide to be yourself.
        </Text>
      </View>
      <View  style={style.sliderItem}>
        <Text style={style.sliderText}>
        Glow from the inside out—your beauty deserves the best care.
        </Text>
      </View>
      <View  style={style.sliderItem}>
        <Text style={style.sliderText}>
        A visit to the salon is a step toward self-love and confidence.
        </Text>
      </View>
      <View style={style.sliderItem}>
        <Text style={style.sliderText}>
        Invest in your hair and skin, it's the crown you never take off.
        </Text>
      </View>
    </Swiper>
    </ImageBackground>
  )
}

export default Slider