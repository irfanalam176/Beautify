import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Booking from '../Booking';
import ViewBooking from '../ViewBooking';
function BookingStack() {
    const bookingStack = createNativeStackNavigator();
  return (
    <bookingStack.Navigator screenOptions={{headerShown: false}} >
      <bookingStack.Screen name="bookingList" component={Booking} />
      <bookingStack.Screen name="viewBooking" component={ViewBooking} />

    </bookingStack.Navigator>
  );
}

export default BookingStack