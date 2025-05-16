import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Products from '../Products';
import ViewProduct from '../ViewProduct';
import AddProduct from '../admin/AddProduct';
function ProductStack() {
    const productStack = createNativeStackNavigator();
  return (
    <productStack.Navigator screenOptions={{headerShown: false}} >
      <productStack.Screen name="productsList" component={Products} />
      <productStack.Screen name="viewProduct" component={ViewProduct} />

    </productStack.Navigator>
  );
}

export default ProductStack