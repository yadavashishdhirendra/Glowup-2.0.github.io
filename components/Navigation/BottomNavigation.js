import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import Foundation from 'react-native-vector-icons/Foundation'
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import { Divider } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { loggedUserBooking } from '../../actions/BookingAction'
import moment from 'moment'

const BottomNavigation = () => {
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const { bookings } = useSelector((state) => state.Bookings)
    const navigation = useNavigation();
    const route = useRoute();

    let todayDate = moment(new Date()).format("DD/MM/YYYY")
    console.log("Today's Date:", todayDate)

    let DynamicBookingLength = []

    bookings && bookings.forEach((booked) => {
        if (booked.status === 'Cancelled') {
            return null
        }
        else if (booked.date === todayDate) {
            DynamicBookingLength.push(booked.date)
        }
    })

    console.log("LENGTH:", DynamicBookingLength.length)

    useEffect(() => {
        if (isFocused) {
            dispatch(loggedUserBooking())
        }
        dispatch(loggedUserBooking())
    }, [dispatch, isFocused])


    return (
        <>
            <Divider style={{ height: 0.5 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 10, paddingVertical: 10, backgroundColor: '#F6F6F6' }}>
                <IconsTabs routeName={route.name} title="Home" style={{ alignSelf: 'center', marginBottom: 5 }} screenName='Home' name='home' size={14} handlePress={() => navigation.navigate('Home')} />
                <IconsTabs routeName={route.name} title="Explore" style={{ alignSelf: 'center', marginBottom: 5 }} screenName='Explore' name='list-bullet' size={14} handlePress={() => navigation.navigate('Explore')} />
                <IconsTabs routeName={route.name} title="Bookings" length={DynamicBookingLength && DynamicBookingLength.length} style={{ alignSelf: 'center', marginBottom: 5 }} screenName='Orders' name='calendar-outline' size={14} handlePress={() => navigation.navigate('Orders')} />
                <IconsTabs routeName={route.name} title="Profile" style={{ alignSelf: 'center', marginBottom: 5 }} screenName='Profile' name='users' size={14} handlePress={() => navigation.navigate('Profile')} />
            </View >
        </>
    )
}

export const IconsTabs = (props) => {
    const activeColor = props.screenName === props.routeName ? '#9B7ABF' : "#2B2B2B"
    return (
        <TouchableOpacity onPress={props.handlePress}>
            {
                props.screenName === "Home" ? <>
                    {
                        props.screenName === props.routeName ? <Entypo name={props.name} style={{ alignSelf: 'center' }} size={22} color={activeColor} /> : <AntDesign name={props.name} style={{ alignSelf: 'center' }} size={22} color={activeColor} />
                    }
                </> : props.screenName === "Explore" ? <>
                    {
                        props.screenName === props.routeName ? <Foundation name='list-bullet' style={{ alignSelf: 'center' }} size={22} color={activeColor} /> : <Foundation name='list-bullet' style={{ alignSelf: 'center' }} size={22} color={activeColor} />
                    }
                </> : props.screenName === 'Orders' ? <>
                    {
                        props.screenName === props.routeName ? <View>
                            <Ionicons name='ios-calendar' style={{ alignSelf: 'center' }} size={22} color={activeColor} />
                            <View style={{ backgroundColor: '#EB1D36', width: 18, height: 18, position: 'absolute', right: 15, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: 10, fontFamily: 'Montserrat-SemiBold', alignSelf: 'center', color: 'white' }}>{props.length}</Text></View>
                        </View> : <View>
                            <Ionicons name='calendar-outline' style={{ alignSelf: 'center' }} size={22} color={activeColor} />
                            <View style={{ backgroundColor: '#EB1D36', width: 18, height: 18, position: 'absolute', right: 15, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: 10, fontFamily: 'Montserrat-SemiBold', alignSelf: 'center', color: 'white' }}>{props.length}</Text></View>
                        </View>
                    }
                </> : props.screenName === "Profile" ? <>
                    {
                        props.screenName === props.routeName ? <FontAwesome name='user' style={{ alignSelf: 'center' }} size={22} color={activeColor} /> : <FontAwesome name='user-o' style={{ alignSelf: 'center' }} size={22} color={activeColor} />
                    }
                </> : null
            }
            <Text style={{ color: activeColor, fontFamily: 'Montserrat-SemiBold', fontSize: 13, marginTop: 2 }}>{props.title}</Text>
        </TouchableOpacity>
    )
}


export default BottomNavigation