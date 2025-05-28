import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProductStack from '../stack/ProductStack';
import BookingStack from '../stack/BookingStack';
import ServicesStackScreen from '../stack/ServicesStackScreen';
import LogOut from '../LogOut';
import { style } from '../../../style/style';
import Home from '../Home';


const Tab = createBottomTabNavigator();

const Layout = () => {
  return (
    <View style={{flex: 1}}>
      <Tab.Navigator screenOptions={{headerShown: false}} initialRouteName='home'>
      <Tab.Screen
          name="services"
          component={ServicesStackScreen} 
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center'}}>
                <Ionicons name="cut-outline" size={30} color="black"/>
                {focused && (
                  <View style={style.activeTab} />
                )}
              </View>
            ),
            tabBarShowLabel: false,
          }}
        />
        <Tab.Screen
          name="booking"
          component={BookingStack}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center'}}>
                <Ionicons name="calendar-outline" size={30} color="black"/>
                {focused && (
                  <View style={style.activeTab} />
                )}
              </View>
            ),
            tabBarShowLabel: false,
          }}
        />
        <Tab.Screen
          name="home"
          component={Home}
          options={{
            tabBarIcon: () => <View style={style.bottomHomeIcon}><Ionicons name="home" size={30} color="white"/></View>,
            tabBarShowLabel: false,
          }}
        />
        <Tab.Screen
          name="products"
          component={ProductStack}
          options={{
            tabBarIcon: 
            ({focused}) => (
              <View style={{alignItems: 'center'}}>
                <Ionicons name="bag-handle-outline" size={30} color="black"/>
                {focused && (
                  <View style={style.activeTab} />
                )}
              </View>
            ),
            tabBarShowLabel: false,
          }}
        />
        <Tab.Screen
          name="logout"
          component={LogOut}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center'}}>
                <Ionicons name="log-out-outline" size={30} color="black"/>
                {focused && (
                  <View style={style.activeTab} />
                )}
              </View>
            ),
            tabBarShowLabel: false,
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default Layout;