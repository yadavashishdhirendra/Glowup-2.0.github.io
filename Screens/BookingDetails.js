import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useEffect } from 'react';
import { getBookingDetails } from '../actions/BookingAction';
import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'
import Loader from '../components/Loader/Loader';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { Divider } from 'react-native-paper'
import { LoadUser } from '../actions/userActions';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification'
import { cancelResult, refundPay } from '../actions/servicesAction';

const BookingDetails = ({ route, navigation }) => {
    const isFocused = useIsFocused();
    const { id } = route.params;
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.LoadUser)
    const { message, error: resultError, loading: resultLoading } = useSelector((state) => state.cancelBooking)
    const { error: refundError, loading: refundLoading } = useSelector((state) => state.refundPayment)
    const { bookings, error, loading } = useSelector((state) => state.bookingDetails)

    let status = 'Cancelled';

    let paymentId = bookings && bookings.paymentId;
    let price = bookings && bookings.price

    const handleCancelOrder = async () => {
        await dispatch(cancelResult(id, status))
        dispatch(refundPay(paymentId, price))
    }

    const handlePayLaterCancelOrder = () => {
        dispatch(cancelResult(id, status))
    }

    console.log(paymentId, price)

    useEffect(() => {
        if (message) {
            Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Success',
                textBody: message,
                button: 'close'
            })
            dispatch({
                type: "clearMessage"
            })
        }
        if (refundError) {
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: 'Contact our Team For Refund',
                button: 'close'
            })
            dispatch({
                type: "ClearError"
            })
        }
        if (resultError) {
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: resultError,
                button: 'close'
            })
            dispatch({
                type: "clearErrors"
            })
        }
        if (isFocused) {
            dispatch(getBookingDetails(id))
            dispatch(LoadUser())
        }
    }, [dispatch, isFocused, id, message, refundError, resultError])

    console.log(user)


    let intime = bookings && bookings.intime;
    let newDate = bookings && bookings.selectedDate;

    let n = new Date(newDate)

    let now = new Date();
    console.log(now, 'new Timestamp')
    let dt = (n.getMonth() + 1) + "/" + n.getDate() + "/" + n.getFullYear() + " " + intime;
    let enddate = new Date(dt)

    if (enddate > now) {
        console.log('TRUE')
    }
    else {
        console.log('FALSE')
    }

    console.log(bookings,"NNNN")

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {
                loading && resultLoading ? <Loader /> : <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                    <View style={{ backgroundColor: '#CFCFCF', alignSelf: 'flex-end', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 30, paddingVertical: 8, borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }}>
                        <AntDesign name='calendar' size={22} color='#000' />
                        <Text style={{ color: 'black', fontFamily: 'Montserrat-Bold', fontSize: 14, marginLeft: 10 }}>Booking Date: {bookings && bookings.date}</Text>
                    </View>
                    <Text style={{ alignSelf: 'center', marginTop: 15, borderColor: '#F7F7F7', borderWidth: 1, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, color: '#8669A5', fontFamily: 'Montserrat-SemiBold', fontSize: 14, }}>{bookings && bookings.servicetype}</Text>
                    <View style={{ paddingHorizontal: 15, marginTop: 20 }}>
                        {
                            bookings && bookings.asignee.length > 0 ? bookings.asignee.map((i) => {
                                return (
                                    <View key={i._id}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                                            <View style={{ flex: 1 }}>
                                                <Image style={{ width: 80, height: 80, borderRadius: 50, resizeMode: 'contain' }} source={{ uri: i.avatar.url }} />
                                            </View>
                                            <View style={{ flex: 3, marginLeft: 10 }}>
                                                <Text style={{ color: '#000', fontFamily: 'Montserrat-SemiBold', textTransform: 'capitalize' }}>{i.firstname}</Text>
                                                {
                                                    bookings && bookings.idList.length >= 2 ? <>
                                                        <View style={{ flexDirection: 'column', marginTop: 3 }}>
                                                            <Text style={{ color: '#8669A5', fontFamily: 'Montserrat-SemiBold', fontSize: 14, marginBottom: 5 }}>Category:</Text>
                                                            <Text style={{ color: '#2B2B2B', fontSize: 13, fontFamily: 'Montserrat-Regular', marginLeft: 5, textTransform: 'capitalize' }}>{bookings && bookings.category}</Text>
                                                        </View>
                                                        <View style={{ flexDirection: 'column', marginTop: 3 }}>
                                                            <Text style={{ color: '#8669A5', fontFamily: 'Montserrat-SemiBold', fontSize: 14, marginBottom: 5 }}>Category:</Text>
                                                            <Text style={{ color: '#2B2B2B', fontSize: 13, fontFamily: 'Montserrat-Regular', marginLeft: 5, textTransform: 'capitalize' }}>{bookings && bookings.servicename}</Text>
                                                        </View>
                                                    </> : <>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
                                                            <MaterialIcons name='category' size={13} color='#2B2B2B' />
                                                            <Text style={{ color: '#2B2B2B', fontSize: 13, fontFamily: 'Montserrat-Regular', marginLeft: 5, textTransform: 'capitalize' }}>{bookings && bookings.category}</Text>
                                                        </View>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
                                                            <Feather name='settings' size={13} color='#2B2B2B' />
                                                            <Text style={{ color: '#2B2B2B', fontSize: 13, fontFamily: 'Montserrat-Regular', marginLeft: 5, textTransform: 'capitalize' }}>{bookings && bookings.servicename}</Text>
                                                        </View>
                                                    </>
                                                }
                                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
                                                    <Entypo name='clock' size={13} color='#2B2B2B' />
                                                    <Text style={{ color: '#2B2B2B', fontSize: 13, fontFamily: 'Montserrat-Regular', textTransform: 'uppercase', marginLeft: 5, }}>{bookings && bookings.intime} - {bookings && bookings.outtime}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <Divider />
                                    </View>
                                )
                            }) : <View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                                    <View style={{ flex: 1 }}>
                                        <Image style={{ width: 80, height: 80, borderRadius: 50, resizeMode: 'contain' }} source={require('../assets/Image/Preview.jpg')} />
                                    </View>
                                    <View style={{ flex: 3, marginLeft: 10 }}>
                                        <Text style={{ color: '#000', fontFamily: 'Montserrat-SemiBold' }}>Employee</Text>
                                        {
                                            bookings && bookings.idList.length >= 2 ? <>
                                                <View style={{ flexDirection: 'column', marginTop: 3 }}>
                                                    <Text style={{ color: '#8669A5', fontFamily: 'Montserrat-SemiBold', fontSize: 14, marginBottom: 5 }}>Category:</Text>
                                                    <Text style={{ color: '#2B2B2B', fontSize: 13, fontFamily: 'Montserrat-Regular', marginLeft: 5, textTransform: 'capitalize' }}>{bookings && bookings.category}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'column', marginTop: 3 }}>
                                                    <Text style={{ color: '#8669A5', fontFamily: 'Montserrat-SemiBold', fontSize: 14, marginBottom: 5 }}>Servicename:</Text>
                                                    <Text style={{ color: '#2B2B2B', fontSize: 13, fontFamily: 'Montserrat-Regular', marginLeft: 5, textTransform: 'capitalize' }}>{bookings && bookings.servicename}</Text>
                                                </View>
                                                {/* <Text></Text> */}
                                            </> : <>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
                                                    <MaterialIcons name='category' size={13} color='#2B2B2B' />
                                                    <Text style={{ color: '#2B2B2B', fontSize: 13, fontFamily: 'Montserrat-Regular', marginLeft: 5, textTransform: 'capitalize' }}>{bookings && bookings.category}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
                                                    <Feather name='settings' size={13} color='#2B2B2B' />
                                                    <Text style={{ color: '#2B2B2B', fontSize: 13, fontFamily: 'Montserrat-Regular', marginLeft: 5, textTransform: 'capitalize' }}>{bookings && bookings.servicename}</Text>
                                                </View>
                                            </>
                                        }
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
                                            <Entypo name='clock' size={13} color='#2B2B2B' />
                                            <Text style={{ color: '#2B2B2B', fontSize: 13, fontFamily: 'Montserrat-Regular', textTransform: 'uppercase', marginLeft: 5, }}>{bookings && bookings.intime} - {bookings && bookings.outtime}</Text>
                                        </View>
                                    </View>
                                </View>
                                <Divider />
                            </View>
                        }
                        <View style={{ marginBottom: 18 }}>
                            <Text style={{ color: '#2B2B2B', fontFamily: 'Montserrat-SemiBold', fontSize: 16, marginTop: 15 }}>User Details</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                <FontAwesome name='user' size={16} color='#2B2B2B' style={{ flex: 0.3 }} />
                                <Text style={{ color: '#2B2B2B', fontSize: 14, marginLeft: 5, fontFamily: 'Montserrat-Regular', flex: 5 }}>Mr. {user && user.name}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                <Ionicons name='call' size={16} color='#2B2B2B' style={{ flex: 0.3 }} />
                                <Text style={{ color: '#2B2B2B', fontSize: 14, marginLeft: 5, fontFamily: 'Montserrat-Regular', flex: 5 }}>+91 {user && user.phone}</Text>
                            </View>
                        </View>
                        <Divider />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15, marginBottom: 15 }}>
                            <View>
                                <Text style={{ color: '#2B2B2B', fontFamily: 'Montserrat-SemiBold', fontSize: 16, }}>Total</Text>
                            </View>
                            <View>
                                <Text style={{ color: '#2B2B2B', fontFamily: 'Montserrat-SemiBold', fontSize: 16, }}>{bookings && bookings.price}₹</Text>
                            </View>
                        </View>
                        <Divider />
                        {
                            bookings && bookings.status === 'Cancelled' ? null : <View>
                                {
                                    loading || refundLoading || resultLoading ? <Text style={{ color: '#2B2B2B', fontFamily: 'Montserrat-SemiBold', fontSize: 16, alignSelf: 'center', marginBottom: 15, marginTop: 15 }}>Loading...</Text> : <View>
                                        {
                                            bookings && bookings.paylater ? <View>
                                                {
                                                    enddate > now ? <TouchableOpacity onPress={() => navigation.navigate('Stylist', {
                                                        id: bookings && bookings.serviceId,
                                                        shopname: bookings && bookings.shopname,
                                                        mobileno: bookings && bookings.mobileno,
                                                        reschedule: "paylater",
                                                        bookingId: id,
                                                        idList: bookings && bookings.idList
                                                    })} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15, marginBottom: 15 }}>
                                                        <FontAwesome name='undo' size={16} color='#2B2B2B' />
                                                        <Text style={{ color: '#2B2B2B', fontFamily: 'Montserrat-SemiBold', fontSize: 16, marginLeft: 8 }}>Reschedule</Text>
                                                    </TouchableOpacity> : null
                                                }
                                            </View> : <View>
                                                {
                                                    enddate > now ? <TouchableOpacity onPress={() => navigation.navigate('Stylist', {
                                                        id: bookings && bookings.serviceId,
                                                        shopname: bookings && bookings.shopname,
                                                        mobileno: bookings && bookings.mobileno,
                                                        reschedule: "reschedule",
                                                        bookingId: id,
                                                        paymentId: bookings && bookings.paymentId,
                                                        idList: bookings && bookings.idList
                                                    })} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15, marginBottom: 15 }}>
                                                        <FontAwesome name='undo' size={16} color='#2B2B2B' />
                                                        <Text style={{ color: '#2B2B2B', fontFamily: 'Montserrat-SemiBold', fontSize: 16, marginLeft: 8 }}>Reschedule</Text>
                                                    </TouchableOpacity> : null
                                                }
                                            </View>
                                        }
                                    </View>
                                }
                            </View>
                        }
                        {
                            bookings && bookings.price === 0 ? <>
                                <Divider />
                                <Text style={{ color: '#2B2B2B', fontFamily: 'Montserrat-Medium', fontSize: 13, marginTop: 10 }}>Note: Price will be Discussed at the Salon.</Text>
                            </> : null
                        }
                    </View>
                </ScrollView>
            }
            {/* <View>
                {
                    bookings && bookings.status === 'Cancelled' && bookings && bookings.paylater !== 'Pay Later' ? <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 15 }}>
                        <Text style={{ color: '#2B2B2B', fontFamily: 'Montserrat-SemiBold', fontSize: 14, alignItems: 'center', marginRight: 8 }}>Refund In Progress</Text>
                        <Entypo color='#2B2B2B' name='back-in-time' size={16} />
                    </View> : null
                }
            </View> */}
            {
                enddate > now ? <View>
                    {
                        loading || refundLoading || resultLoading ? <Text style={{ color: '#2B2B2B', fontFamily: 'Montserrat-SemiBold', fontSize: 16, alignSelf: 'center', marginBottom: 15 }}>Loading...</Text> : <View>
                            <View>
                                {
                                    bookings && bookings.status === 'Cancelled' ? null : <View>
                                        {
                                            bookings && bookings.paylater === 'Pay Later' ? <TouchableOpacity onPress={() => handlePayLaterCancelOrder()} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 15 }}>
                                                <MaterialCommunityIcons name='cancel' size={16} color='#2B2B2B' />
                                                <Text style={{ color: '#2B2B2B', fontFamily: 'Montserrat-SemiBold', fontSize: 16, alignSelf: 'center', marginLeft: 8 }}>Cancel Order</Text>
                                            </TouchableOpacity> : <TouchableOpacity onPress={() => handleCancelOrder()} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 15 }}>
                                                <MaterialCommunityIcons name='cancel' size={16} color='#2B2B2B' />
                                                <Text style={{ color: '#2B2B2B', fontFamily: 'Montserrat-SemiBold', fontSize: 16, alignSelf: 'center', marginLeft: 8 }}>Cancel Order</Text>
                                            </TouchableOpacity>
                                        }
                                    </View>
                                }
                            </View>
                        </View>
                    }
                </View> : null
            }
        </View >
    )
}

export default BookingDetails