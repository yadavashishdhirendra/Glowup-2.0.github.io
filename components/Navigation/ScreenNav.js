import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from '../../Screens/Signup';
import Verify from '../../Screens/Verify';
import Login from '../../Screens/Login';
// import Location from '../../Screens/Location';
import { LoadUser } from '../../actions/userActions';
import store from '../../store';
import Home from '../../Screens/Home';
import SaloonList from '../../Screens/SaloonList';
import SaloonDetails from '../../Screens/SaloonDetails';
import ChooseService from '../../Screens/ChooseService';
import { Text } from 'react-native';
import ChooseStylist from '../../Screens/ChooseStylist';
import TimeSlot from '../../Screens/TimeSlot';
import Checkout from '../../Screens/Checkout';
import MyOrders from '../../Screens/MyOrders';
import Profile from '../../Screens/Profile';
import SearchSaloon from '../../Screens/SearchSaloon';
import SavedSaloon from '../../Screens/SavedSaloon';
import NoReferenceCheckout from '../../Screens/NoReferenceCheckout';
import NoReferenceSlot from '../../Screens/NoReferenceSlot';
import ExploreSaloons from '../../Screens/ExploreSaloons';
import BookingDetails from '../../Screens/BookingDetails';
import Faqs from '../../Screens/Faqs';
import LoginUserDemo from '../../Screens/LoginUserDemo';
import { useSelector } from 'react-redux';
import OneSignal from 'react-native-onesignal';

const Stack = createStackNavigator();
const ScreenNav = () => {
  const { isAuthenticated,user } = useSelector((state) => state.LoadUser)
  useEffect(() => {
   if(isAuthenticated){
    OneSignal.setExternalUserId(user?._id, (results)=>{
      console.log(results,"Neywork")
    })
   }
    store.dispatch(LoadUser())
  }, [isAuthenticated])

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={`${isAuthenticated ? 'Home' : 'Login'}`} screenOptions={{ headerShadowVisible: false }}>
        <Stack.Screen name='Login' component={Login} options={{
            headerShown: false
          }} />
          <Stack.Screen name='Signup' component={Signup} options={{
            headerShown: false
          }} />
          <Stack.Screen name='Verify' component={Verify} options={{
            headerShown: false
          }} />
          <Stack.Screen name='Home' component={Home} initialParams={{
            formatted_address: 0,
            city: 0
          }} options={{
            headerShown: false
          }} />
          <Stack.Screen name='Salons' component={SaloonList} options={{
            headerShown: false
          }} />
          <Stack.Screen name='SaloonDetail' component={SaloonDetails} options={{
            title: '',
            headerTransparent: true,
            headerTitleStyle: {
              fontFamily: 'Montserrat-Bold',
              color: 'white',
            },
            headerTintColor: '#725593'
          }} />
          <Stack.Screen name='Service' component={ChooseService} options={{
            title: "Select Services",
            headerTransparent: true,
            headerTitleStyle: {
              fontFamily: 'Montserrat-Bold',
              color: 'white',
              fontSize: 18
            },
            headerRight: () => (
              <Text style={{ marginRight: 15, color: 'white', fontFamily: 'Montserrat-Medium', fontSize: 12 }}>Step 1 of 4</Text>
            ),
            headerTintColor: '#FFFF'
          }} />
          <Stack.Screen name='Stylist' initialParams={{ reschedule: "ok", bookingId: 'none' }} component={ChooseStylist} options={{
            title: "Select Your Stylist",
            headerTransparent: true,
            headerTitleStyle: {
              fontFamily: 'Montserrat-Bold',
              color: 'white',
              fontSize: 18
            },
            headerRight: () => (
              <Text style={{ marginRight: 15, color: 'white', fontFamily: 'Montserrat-Medium', fontSize: 12 }}>Step 2 of 4</Text>
            ),
            headerTintColor: '#FFFF'
          }} />
          <Stack.Screen name='Slot' initialParams={{ reschedule: "ok", bookingId: 'none' }} component={TimeSlot} options={{
            title: "Lock Your Time Slot",
            headerTransparent: true,
            headerTitleStyle: {
              fontFamily: 'Montserrat-Bold',
              color: 'white',
              fontSize: 18
            },
            headerRight: () => (
              <Text style={{ marginRight: 15, color: 'white', fontFamily: 'Montserrat-Medium', fontSize: 12 }}>Step 3 of 4</Text>
            ),
            headerTintColor: '#FFFF'
          }} />
          <Stack.Screen name='NoPreferenceSlot' initialParams={{ reschedule: "ok", bookingId: 'none' }} component={NoReferenceSlot} options={{
            title: "Lock Your Time Slot",
            headerTransparent: true,
            headerTitleStyle: {
              fontFamily: 'Montserrat-Bold',
              color: 'white',
              fontSize: 18
            },
            headerRight: () => (
              <Text style={{ marginRight: 15, color: 'white', fontFamily: 'Montserrat-Medium', fontSize: 12 }}>Step 3 of 4</Text>
            ),
            headerTintColor: '#FFFF'
          }} />
          <Stack.Screen name='NoPreferenceCheckout' initialParams={{ reschedule: "ok", bookingId: 'none' }} component={NoReferenceCheckout} options={{
            title: "Review & Confirm",
            headerTransparent: true,
            headerTitleStyle: {
              fontFamily: 'Montserrat-Bold',
              color: 'white',
              fontSize: 18
            },
            headerRight: () => (
              <Text style={{ marginRight: 15, color: 'white', fontFamily: 'Montserrat-Medium', fontSize: 12 }}>Step 4 of 4</Text>
            ),
            headerTintColor: '#FFFF'
          }} />
          <Stack.Screen name='Checkout' initialParams={{ reschedule: "ok", bookingId: 'none' }} component={Checkout} options={{
            title: "Review & Confirm",
            headerTransparent: true,
            headerTitleStyle: {
              fontFamily: 'Montserrat-Bold',
              color: 'white',
              fontSize: 18
            },
            headerRight: () => (
              <Text style={{ marginRight: 15, color: 'white', fontFamily: 'Montserrat-Medium', fontSize: 12 }}>Step 4 of 4</Text>
            ),
            headerTintColor: '#FFFF'
          }} />
          <Stack.Screen name='Orders' component={MyOrders} options={{
            title: "My Appointments",
            headerTitleStyle: {
              fontFamily: 'Montserrat-Bold',
              color: '#000',
              fontSize: 18
            }
          }} />
          <Stack.Screen name='Profile' component={Profile} options={{
            title: "My Profile",
            headerTransparent: true,
            headerTitleStyle: {
              fontFamily: 'Montserrat-Bold',
              color: 'white',
              fontSize: 18
            },
            headerTintColor: '#FFFF'
          }} />
          <Stack.Screen name='SearchSaloons' component={SearchSaloon} options={{
            title: "Salons",
            headerTitleStyle: {
              fontFamily: 'Montserrat-Bold',
              color: '#000',
              fontSize: 18
            },
          }} />
          <Stack.Screen name='Saved' component={SavedSaloon} options={{
            title: "Liked Salon",
            headerTitleStyle: {
              fontFamily: 'Montserrat-Bold',
              color: '#000',
              fontSize: 18
            },
          }} />
          <Stack.Screen name='Explore' component={ExploreSaloons} options={{
            title: "Explore Salons",
            headerTitleStyle: {
              fontFamily: 'Montserrat-Bold',
              color: '#000',
              fontSize: 18
            },
          }} />
          <Stack.Screen name='BookingDetails' component={BookingDetails} options={{
            title: "Booking Details",
            headerTitleStyle: {
              fontFamily: 'Montserrat-Bold',
              color: '#000',
              fontSize: 18
            },
          }} />
          <Stack.Screen name='Faqs' component={Faqs} options={{
            title: "FAQs",
            headerTitleStyle: {
              fontFamily: 'Montserrat-Bold',
              color: '#000',
              fontSize: 18
            },
          }} />
          <Stack.Screen name='LoginDemo' component={LoginUserDemo} options={{
            headerShown: false
          }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

export default ScreenNav