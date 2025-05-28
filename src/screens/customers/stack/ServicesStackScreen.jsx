import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Services from '../Services';
import ViewService from '../ViewService';
function ServicesStackScreen() {
    const ServicesStack = createNativeStackNavigator();
  return (
    <ServicesStack.Navigator screenOptions={{headerShown: false}} >
      <ServicesStack.Screen name="ServicesList" component={Services} />
      <ServicesStack.Screen name="viewService" component={ViewService} />

    </ServicesStack.Navigator>
  );
}

export default ServicesStackScreen