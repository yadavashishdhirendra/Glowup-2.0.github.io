import { View, Text, StatusBar, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { useIsFocused } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleService, multipleHours } from '../actions/servicesAction'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Loader from '../components/Loader/Loader'
import moment from 'moment'
import { useState } from 'react'
import { Divider } from 'react-native-paper';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification'
import RazorpayCheckout from 'react-native-razorpay'
import axios from 'axios';
import { API } from '../config/config';
import { createBookingNoRefPayLater, createBookingNoRefPayLaterMultipleServices, createBookings, createBookingsMultipleService, RescheduleBookingWithoutAsignee, RescheduleBookingWithoutAsigneeMultipleServices, resultPreviousDelete } from '../actions/BookingAction'
import { LoadUser } from '../actions/userActions'
import Modal from "react-native-modal";

const NoReferenceCheckout = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.LoadUser)
    const { getService, loading } = useSelector((state) => state.getSingleService);
    const { isPosted, error, loading: BookedLoading } = useSelector((state) => state.createBooking)
    const { serviceData, loading: serviceLoading } = useSelector((state) => state.multipleHour)
    console.log("xyz", getService)
    const isFocused = useIsFocused();
    const { id, shopname, date, intime, selectedDate, result, mobileno, reschedule, bookingId, paymentId, idList } = route.params;
    console.log('PARAMS', id, shopname, intime, selectedDate, result, mobileno)

    const [category, setCategory] = useState('')
    const [servicetype, setServiceType] = useState('')
    const [price, setPrice] = useState('')
    const [servicename, setServiceName] = useState('')
    const [hour, setHour] = useState('')
    const [outtime, setOutTime] = useState('')

    var selectedTime = intime;
    var currentTime = new Date();
    console.log("x", currentTime, selectedTime)
    var selectedTimeStamp = (selectedDate.getMonth() + 1) + "/" + selectedDate.getDate() + "/" + selectedDate.getFullYear() + " " + selectedTime;
    var uservalue = new Date(selectedTimeStamp);
    console.log("user Input", uservalue, "Current value", currentTime)
    if (uservalue < currentTime) {
        console.log("True")
    }
    else {
        console.log("False")
    }


    const [results, setResults] = useState([])
    function intervals(startString, endString) {
        var start = moment(startString, 'hh:mm a');
        var end = moment(endString, 'hh:mm a');

        // round starting minutes up to nearest 15 (12 --> 15, 17 --> 30)
        // note that 59 will round up to 60, and moment.js handles that correctly
        start.minutes(Math.ceil(start.minutes() / 15) * 15);

        var current = moment(start);

        while (current <= end) {
            if (results.includes(current.format('hh:mm a'))) {
                return null
            }
            else {
                results.push(current.format('hh:mm a'));
                current.add(15, 'minutes');
            }
        }
        return results;
    }

    const [serviceId, setServiceId] = useState('')

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    console.log(hour, intime, "New Time")

    useEffect(() => {
        if (isFocused) {
            if (hour || intime) {
                var addTime = moment(intime, ["hh:mm A"]).add(hour, 'minutes').format('hh:mm A');// it will add 11 mins in the current time and will give time in 03:35 PM format; can use m or minutes 
                var subTime = moment(addTime, ["hh:mm A"]).subtract(15, 'minutes').format('hh:mm A');
                setOutTime(subTime);
            }
            if (intime || outtime) {
                intervals(intime, outtime);
            }
        }
    }, [isFocused, intime, outtime, hour])

    const rescheduleWithoutAsignee = async () => {
        if (uservalue < currentTime) {
            return Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'Warning',
                textBody: 'Bookings Not Allowed',
                button: 'close'
            })
        }
        if (results.every(x => result.includes(x))) {
            if (idList && idList.length >= 2) {
                await dispatch(RescheduleBookingWithoutAsigneeMultipleServices(date, category, servicename, results, price, intime, outtime, servicetype, shopname, mobileno, paymentId, selectedDate, idList))
                dispatch(resultPreviousDelete(bookingId))
            }
            else {
                await dispatch(RescheduleBookingWithoutAsignee(date, category, servicename, results, price, intime, outtime, servicetype, shopname, mobileno, paymentId, selectedDate, serviceId))
                dispatch(resultPreviousDelete(bookingId))
            }
        }
        else {
            return Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'Warning',
                textBody: 'Service Time Outside of The Slot',
                button: 'close'
            })
        }
    }

    console.log("DISPATCH DATA:", date, shopname, category, servicetype, servicename, price, outtime, intime, results)

    let paylater = "Pay Later"

    const PaymentLater = () => {
        if (uservalue < currentTime) {
            return Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'Warning',
                textBody: 'Bookings Not Allowed',
                button: 'close'
            })
        }
        if (results.every(x => result.includes(x))) {
            if (idList && idList.length >= 2) {
                dispatch(createBookingNoRefPayLaterMultipleServices(date, category, servicename, results, price, intime, outtime, servicetype, shopname, mobileno, paylater, selectedDate, idList))
                // console.log("SERVICES MULTIPLE FROM PAYMENT LATER")
            }
            else {
                dispatch(createBookingNoRefPayLater(date, category, servicename, results, price, intime, outtime, servicetype, shopname, mobileno, paylater, selectedDate, serviceId))
                // console.log("SERVICE SINGLE FROM PAYMENT LATER")
            }
        }
        else {
            return Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'Warning',
                textBody: 'Service Time Outside of The Slot',
                button: 'close'
            })
        }
    }

    const reschedulePayLaterWithoutAsignee = async () => {
        if (uservalue < currentTime) {
            return Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'Warning',
                textBody: 'Bookings Not Allowed',
                button: 'close'
            })
        }
        if (results.every(x => result.includes(x))) {
            if (idList && idList.length >= 2) {
                await dispatch(createBookingNoRefPayLaterMultipleServices(date, category, servicename, results, price, intime, outtime, servicetype, shopname, mobileno, paylater, selectedDate, idList))
                dispatch(resultPreviousDelete(bookingId))
                // console.log("SERVICES MULTIPLE FROM PAYMENT LATER - RESCHEDULE!")
            }
            else {
                await dispatch(createBookingNoRefPayLater(date, category, servicename, results, price, intime, outtime, servicetype, shopname, mobileno, paylater, selectedDate, serviceId))
                dispatch(resultPreviousDelete(bookingId))
                // console.log("SERVICE SINGLE FROM PAYMENT LATER - RESCHEDULE!")
            }
        }
        else {
            return Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'Warning',
                textBody: 'Service Time Outside of The Slot',
                button: 'close'
            })
        }
    }

    // DISPATCHING DATA
    const PaymentHanlder = async () => {
        if (uservalue < currentTime) {
            return Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'Warning',
                textBody: 'Bookings Not Allowed',
                button: 'close'
            })
        }
        if (results.every(x => result.includes(x))) {
            const { data: { order } } = await axios.post(`${API}/customer/checkout`, { amount: idList ? idList.length >= 2 ? price : getService.price : getService.price });
            var options = {
                description: 'Credits towards consultation',
                image: 'https://i.imgur.com/3g7nmJC.png',
                currency: 'INR',
                key: 'rzp_test_zj8vm7yWwqJReR', // Your api key
                amount: order.amount,
                order_id: order.id,
                name: user.name,
                prefill: {
                    email: user.email,
                    contact: user.phone,
                    name: user.name
                },
                theme: { color: '#9B7ABF' }
            }

            RazorpayCheckout.open(options).then((data) => {
                let paymentId = data.razorpay_payment_id;
                console.log("PAYMENT ID:", paymentId)
                // handle success
                async function verify() {
                    const { datas } = await axios.post(`${API}/customer/payment/verifcation`, { razorpay_order_id: data.razorpay_order_id, razorpay_payment_id: data.razorpay_payment_id, razorpay_signature: data.razorpay_signature })
                    if (idList && idList.length >= 2) {
                        dispatch(createBookingsMultipleService(date, category, servicename, results, price, intime, outtime, servicetype, paymentId, shopname, mobileno, selectedDate, idList))
                        // console.log("SERVICES MULTIPLE FROM PAYMENT NOW")
                    }
                    else {
                        dispatch(createBookings(date, category, servicename, results, price, intime, outtime, servicetype, paymentId, shopname, mobileno, selectedDate, serviceId))
                        // console.log("SERVICE SINGLE FROM PAYMENT NOW")
                    }
                }
                if (data) {
                    verify()
                }
                else {
                    console.log('Error')
                }
            }).catch((error) => {
                // handle failure
                Dialog.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Error',
                    textBody: "Payment Failed",
                    button: 'close'
                });
            });
        }
        else {
            return Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'Warning',
                textBody: 'Service Time Outside of The Slot',
                button: 'close'
            })
        }
    }
    // DISPATCHING DATA

    let lengthy = idList && idList.length;
    console.log(lengthy, "lenght")

    useEffect(() => {
        if (isFocused || id) {
            dispatch(getSingleService(id))
        }
        if (lengthy >= 2) {
            dispatch(multipleHours(idList))
        }
        if (id) {
            setServiceId(id)
        }
        if (isFocused) {
            dispatch(LoadUser())
        }
        if (isPosted) {
            Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Success',
                textBody: "Booking Success",
                button: 'close'
            });
            setModalVisible(false)
            navigation.navigate('Home')
            dispatch({
                type: 'CreateBookingReset'
            })
        }
        if (error) {
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: error,
                button: 'close'
            });
            dispatch({
                type: "ClearError"
            })
        }
    }, [isFocused, id, isPosted, error, lengthy])

    let categorys = '';
    let serviceTypes = '';
    let prices = 0;
    let servicesName = '';
    let hours = 0;
    serviceData && serviceData.forEach((i, index) => {
        categorys += index + 1 + ")" + " " + i.category + '\n';
        serviceTypes += index + 1 + ")" + " " + i.servicetype + '\n';
        prices += parseInt(i.price);
        servicesName += index + 1 + ")" + " " + i.servicename + '\n';
        hours += parseInt(i.hour)
    })

    useEffect(() => {
        if (!getService) {
            dispatch(getSingleService(id))
        }
        else {
            setCategory(getService.category)
            setServiceType(getService.servicetype)
            setPrice(getService.price)
            setServiceName(getService.servicename)
            setHour(getService.hour)
        }
        if (idList && idList.length >= 2) {
            if (categorys || serviceTypes || prices || servicesName || hours) {
                setCategory(categorys)
                setServiceType(serviceTypes)
                setPrice(prices)
                setServiceName(servicesName)
                setHour(hours)
            }
        }
    }, [dispatch, getService, categorys, serviceTypes, prices, servicesName, hours, idList])

    console.log("SERVICEID", serviceData)
    console.log(intime, 'nn')
    console.log(category, servicetype, price, servicename, hour)

    return (
        <>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <StatusBar backgroundColor='#C396D2' barStyle='light-content' />
                <LinearGradient style={{ paddingVertical: 35 }} colors={['#C396D2', '#A27FC2']}></LinearGradient>
                {
                    idList && idList.length >= 2 ?
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {
                                serviceLoading ? <ActivityIndicator size="large" style={{ marginVertical: 10 }} color="#C396D2" /> : <View>
                                    {
                                        serviceData && <View style={{ marginHorizontal: 15, marginVertical: 20, borderWidth: 1, borderColor: '#DBC2F5', borderRadius: 6, paddingHorizontal: 10, paddingBottom: 10, backgroundColor: '#FBF6FF' }}>
                                            <View style={{ backgroundColor: 'white', alignSelf: 'center', marginBottom: 10, paddingHorizontal: 5, paddingVertical: 8, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderWidth: 1, borderColor: '#DBC2F5', borderTopWidth: 0 }}>
                                                <Text style={{ color: '#8669A5', fontFamily: 'Montserrat-SemiBold', textAlign: 'center' }}>{shopname}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <View style={{ borderRightWidth: 1, borderRightColor: '#DBC2F5', flex: 3 }}>
                                                    <Text style={{ marginBottom: 7, fontFamily: 'Montserrat-SemiBold', fontSize: 14,color: '#8669A5', }}>Category:-</Text>
                                                    <Text style={{ color: '#2B2B2B', fontFamily: 'Montserrat-SemiBold', fontSize: 12 }}>{servicetype}</Text>
                                                </View>
                                                <View style={{ flex: 3, paddingLeft: 20 }}>
                                                    <Text style={{ marginBottom: 7, fontFamily: 'Montserrat-SemiBold', fontSize: 14,color: '#8669A5', }}>SubCategory:-</Text>
                                                    <Text style={{ color: '#2B2B2B', fontFamily: 'Montserrat-SemiBold', fontSize: 12 }}>{category}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 12, flexWrap: 'wrap' }}>
                                                <View>
                                                    <Text style={{ marginBottom: 7, fontFamily: 'Montserrat-SemiBold', fontSize: 14,color: '#8669A5', }}>Service Name:-</Text>
                                                    <Text style={{ color: '#2B2B2B', fontFamily: 'Montserrat-Medium', fontSize: 13, textTransform: 'capitalize' }}>{servicename}</Text>
                                                </View>
                                                <Text style={{ color: '#7C7C7C', fontFamily: 'Montserrat-Medium', fontSize: 13 }}>₹ {price}</Text>
                                            </View>
                                            <Divider style={{ height: 0.7 }} />
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
                                                <Text style={{ color: '#000', fontFamily: 'Montserrat-SemiBold', fontSize: 13 }}>Total</Text>
                                                <Text style={{ color: '#000', fontFamily: 'Montserrat-SemiBold', fontSize: 13 }}>₹ {price}</Text>
                                            </View>
                                            <View style={{ marginVertical: 10, flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ color: '#000', fontFamily: 'Montserrat-SemiBold', fontSize: 13 }}>Date:</Text>
                                                <Text style={{ color: '#7C7C7C', fontFamily: 'Montserrat-SemiBold', marginLeft: 5, fontSize: 13 }}>{date}</Text>
                                            </View>
                                            <View style={{ marginVertical: 0, flexDirection: 'row', alignItems: 'center' }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{ color: '#000', fontFamily: 'Montserrat-SemiBold', fontSize: 13 }}>From:</Text>
                                                    <Text style={{ color: '#7C7C7C', fontFamily: 'Montserrat-SemiBold', marginLeft: 5, fontSize: 13 }}>{intime}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', marginLeft: 5 }}>
                                                    <Text style={{ color: '#000', fontFamily: 'Montserrat-SemiBold', fontSize: 13 }}>To:</Text>
                                                    <Text style={{ color: '#7C7C7C', fontFamily: 'Montserrat-SemiBold', marginLeft: 5, fontSize: 13 }}>{outtime}</Text>
                                                </View>
                                            </View>
                                            {/* {
                                            getService.about ? <Text style={{ color: '#7C7C7C', fontFamily: 'Montserrat-SemiBold', color: '#9B7ABF', fontSize: 13, marginTop: 10 }}>Note: {getService.about}</Text> : null
                                        } */}
                                        </View>
                                    }
                                </View>
                            }
                        </ScrollView> : <View>
                            {
                                loading && BookedLoading ? <Loader /> : <View style={{ marginTop: 10 }}>
                                    <ScrollView showsVerticalScrollIndicator={false}>
                                        <View>
                                            {
                                                getService && <View style={{ marginHorizontal: 15, marginVertical: 20, borderWidth: 1, borderColor: '#DBC2F5', borderRadius: 6, paddingHorizontal: 10, paddingVertical: 10, backgroundColor: '#FBF6FF' }}>
                                                    <View>
                                                        <Text style={{ color: '#8669A5', fontFamily: 'Montserrat-SemiBold', marginBottom: 10 }}>{shopname}</Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <MaterialIcons name='category' color={'#2B2B2B'} size={18} />
                                                            <Text style={{ color: '#2B2B2B', marginLeft: 8, fontFamily: 'Montserrat-SemiBold', fontSize: 14 }}>{getService.category}</Text>
                                                        </View>
                                                        <View style={{ borderColor: '#9B7ABF', borderWidth: 1, padding: 3, borderRadius: 3 }}>
                                                            <Text style={{ color: '#9B7ABF', fontFamily: 'Montserrat-SemiBold', fontSize: 12 }}>{getService.servicetype}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 12, flexWrap: 'wrap' }}>
                                                        <Text style={{ color: '#2B2B2B', fontFamily: 'Montserrat-Medium', fontSize: 13, textTransform: 'capitalize' }}>{getService.servicename}</Text>
                                                        <Text style={{ color: '#7C7C7C', fontFamily: 'Montserrat-Medium', fontSize: 13 }}>₹ {getService.price}</Text>
                                                    </View>
                                                    <Divider style={{ height: 0.7 }} />
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
                                                        <Text style={{ color: '#000', fontFamily: 'Montserrat-SemiBold', fontSize: 13 }}>Total</Text>
                                                        <Text style={{ color: '#000', fontFamily: 'Montserrat-SemiBold', fontSize: 13 }}>₹ {getService.price}</Text>
                                                    </View>
                                                    <View style={{ marginVertical: 10, flexDirection: 'row', alignItems: 'center' }}>
                                                        <Text style={{ color: '#000', fontFamily: 'Montserrat-SemiBold', fontSize: 13 }}>Date:</Text>
                                                        <Text style={{ color: '#7C7C7C', fontFamily: 'Montserrat-SemiBold', marginLeft: 5, fontSize: 13 }}>{date}</Text>
                                                    </View>
                                                    <View style={{ marginVertical: 0, flexDirection: 'row', alignItems: 'center' }}>
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <Text style={{ color: '#000', fontFamily: 'Montserrat-SemiBold', fontSize: 13 }}>From:</Text>
                                                            <Text style={{ color: '#7C7C7C', fontFamily: 'Montserrat-SemiBold', marginLeft: 5, fontSize: 13 }}>{intime}</Text>
                                                        </View>
                                                        <View style={{ flexDirection: 'row', marginLeft: 5 }}>
                                                            <Text style={{ color: '#000', fontFamily: 'Montserrat-SemiBold', fontSize: 13 }}>To:</Text>
                                                            <Text style={{ color: '#7C7C7C', fontFamily: 'Montserrat-SemiBold', marginLeft: 5, fontSize: 13 }}>{outtime}</Text>
                                                        </View>
                                                    </View>
                                                    {
                                                        getService.about ? <Text style={{ color: '#7C7C7C', fontFamily: 'Montserrat-SemiBold', color: '#9B7ABF', fontSize: 13, marginTop: 10 }}>Note: {getService.about}</Text> : null
                                                    }
                                                </View>
                                            }
                                        </View>
                                    </ScrollView>
                                </View>
                            }
                        </View>
                }
            </View>
            <View>
                {
                    BookedLoading ?
                        <>
                            <ActivityIndicator size="large" style={{ marginVertical: 10 }} color="#C396D2" />
                            <Text style={{ color: '#2B2B2B', fontSize: 13, fontFamily: 'Montserrat-SemiBold', alignSelf: 'center', marginBottom: 10 }}>Do not press back button</Text>
                        </>
                        : <>
                            <View style={{ backgroundColor: 'white' }}>
                                {
                                    loading ? <Text style={{ color: '#2B2B2B', marginHorizontal: 15, marginVertical: 20, fontFamily: 'Montserrat-Bold', alignSelf: 'center' }}>Loading...</Text> : <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15, alignItems: 'center' }}>
                                        {
                                            getService ? <Text style={{ color: '#1F1F1F', fontFamily: 'Montserrat-SemiBold', fontSize: 16 }}>₹{idList && idList.length >= 2 ? price : getService.price}</Text> : null
                                        }
                                        {
                                            reschedule === 'reschedule' ? <TouchableOpacity style={{ backgroundColor: '#9B7ABF', borderRadius: 5, paddingHorizontal: 18, paddingVertical: 10 }} onPress={() => rescheduleWithoutAsignee()}>
                                                <Text style={{ color: '#FFFFFF', fontFamily: 'Montserrat-Bold', fontSize: 14 }}>Reschedule</Text>
                                            </TouchableOpacity> : reschedule === 'paylater' ? <TouchableOpacity style={{ backgroundColor: '#9B7ABF', borderRadius: 5, paddingHorizontal: 18, paddingVertical: 10 }} onPress={() => reschedulePayLaterWithoutAsignee()}>
                                                <Text style={{ color: '#FFFFFF', fontFamily: 'Montserrat-Bold', fontSize: 14 }}>Reschedule (Pay Later)</Text>
                                            </TouchableOpacity> : <TouchableOpacity style={{ backgroundColor: '#9B7ABF', borderRadius: 5, paddingHorizontal: 18, paddingVertical: 10 }} onPress={() => toggleModal()}>
                                                <Text style={{ color: '#FFFFFF', fontFamily: 'Montserrat-Bold', fontSize: 14 }}>Checkout</Text>
                                            </TouchableOpacity>
                                        }
                                    </View>
                                }
                            </View>
                            <Modal onBackdropPress={toggleModal} onBackButtonPress={toggleModal} style={styles.view} swipeDirection={['up', 'left', 'right', 'down']} isVisible={isModalVisible}>
                                <View style={{ backgroundColor: 'white', paddingVertical: 30, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                                    <ScrollView>
                                        <Text style={{ color: '#2B2B2B', fontFamily: 'Montserrat-Bold', fontSize: 14, marginBottom: 15, alignSelf: 'center' }}>Choose Payment Method</Text>
                                        {
                                            getService && getService.price === '0' ? <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                                <TouchableOpacity style={{ backgroundColor: '#9B7ABF', borderRadius: 5, paddingHorizontal: 18, paddingVertical: 10 }} onPress={() => PaymentLater()}>
                                                    <Text style={{ color: '#FFFFFF', fontFamily: 'Montserrat-Bold', fontSize: 14 }}>Pay Later</Text>
                                                </TouchableOpacity>
                                            </View> : <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                                <TouchableOpacity style={{ backgroundColor: '#9B7ABF', borderRadius: 5, paddingHorizontal: 18, paddingVertical: 10 }} onPress={() => PaymentHanlder()}>
                                                    <Text style={{ color: '#FFFFFF', fontFamily: 'Montserrat-Bold', fontSize: 14 }}>Pay Now</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{ backgroundColor: '#9B7ABF', borderRadius: 5, paddingHorizontal: 18, paddingVertical: 10 }} onPress={() => PaymentLater()}>
                                                    <Text style={{ color: '#FFFFFF', fontFamily: 'Montserrat-Bold', fontSize: 14 }}>Pay Later</Text>
                                                </TouchableOpacity>
                                            </View>
                                        }
                                    </ScrollView>
                                </View>
                            </Modal>
                        </>
                }
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    view: {
        justifyContent: 'flex-end',
        margin: 0
    },
})

export default NoReferenceCheckout;