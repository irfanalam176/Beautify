import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ManageProduct from '../adminStack/ManageProduct';
import ManageStaff from '../adminStack/ManageStaff';
import ManageServices from '../adminStack/ManageServices';
import HomeStack from '../adminStack/HomeStack';
import LogOutAdmin from '../auth/LogOutAdmin';
import { style } from '../../../style/style';

const AdminLayout = () => {
    const Tab = createBottomTabNavigator();
    
    return (
        <View style={{flex: 1}}>
            <Tab.Navigator 
                screenOptions={{headerShown: false}} 
                initialRouteName='home'
            >
                <Tab.Screen 
                    name='staff' 
                    component={ManageStaff} 
                    options={{
                        tabBarIcon: ({focused}) => (
                            <View style={{alignItems: 'center'}}>
                                <Ionicons name="people" size={30} color="black"/>
                                {focused && (
                                    <View style={[style.activeTab,style.activeTabDashBoard]} />
                                )}
                            </View>
                        ),
                        tabBarLabel: 'Staff',
                        tabBarLabelStyle: {fontSize: 12, marginBottom: 5,color:"gray"}
                    }}
                />
                <Tab.Screen 
                    name='services' 
                    component={ManageServices} 
                    options={{
                        tabBarIcon: ({focused}) => (
                            <View style={{alignItems: 'center'}}>
                                <Ionicons name="cut-outline" size={30} color="black"/>
                                {focused && (
                                    <View style={[style.activeTab,style.activeTabDashBoard]} />
                                )}
                            </View>
                        ),
                        tabBarLabel: 'Services',
                        tabBarLabelStyle: {fontSize: 12, marginBottom: 5,color:"gray"}
                    }}
                />
                <Tab.Screen 
                    name='home' 
                    component={HomeStack} 
                    options={{
                      tabBarLabelStyle: {display:"none"},
                        tabBarIcon: ({focused}) => (
                            <View style={style.bottomHomeIcon}>
                                <Ionicons name="pie-chart" size={30} color="white"/>
                                {focused && (
                                    <View style={style.activeTab} />
                                )}
                            </View>
                        ),
                    }}
                />
                <Tab.Screen 
                    name='products' 
                    component={ManageProduct} 
                    options={{
                        tabBarIcon: ({focused}) => (
                            <View style={{alignItems: 'center'}}>
                                <Ionicons name="cube" size={30} color="black"/>
                                {focused && (
                                    <View style={[style.activeTab,style.activeTabDashBoard]} />
                                )}
                            </View>
                        ),
                        tabBarLabel: 'Products',
                        tabBarLabelStyle: {fontSize: 12, marginBottom: 5,color:"gray"}
                    }}
                />
                <Tab.Screen 
                    name='logOut' 
                    component={LogOutAdmin} 
                    options={{
                        tabBarIcon: ({focused}) => (
                            <View style={{alignItems: 'center'}}>
                                <Ionicons name="log-out-outline" size={30} color="black"/>
                                {focused && (
                                    <View style={[style.activeTab,style.activeTabDashBoard]} />
                                )}
                            </View>
                        ),
                        tabBarLabel: 'Logout',
                        tabBarLabelStyle: {fontSize: 12, marginBottom: 5,color:"gray"}
                    }}
                />
            </Tab.Navigator>
        </View>
    );
};

export default AdminLayout;