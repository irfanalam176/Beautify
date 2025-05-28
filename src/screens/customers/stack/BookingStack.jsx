import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ViewBooking from '../ViewBooking';
import Booking from '../Booking';
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