import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useLoginStatus = ({navigation}) => {
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const isLogin = await AsyncStorage.getItem("isLogin");
        const isCustomer = await AsyncStorage.getItem("isCustomer");
        const isAdmin = await AsyncStorage.getItem("isAdmin");

        if (isLogin && isCustomer) {
          navigation.replace("layout");
        } else if (isLogin && isAdmin) {
          navigation.replace("adminLayout");
        }
      } catch (e) {
        console.log(e + " Cannot get async storage data");
      }
    };

    checkLoginStatus();
  }, [navigation]);
};
