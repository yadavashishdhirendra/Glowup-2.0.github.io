import { View, StatusBar, ScrollView, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import RazorpayCheckout from 'react-native-razorpay'
import axios from 'axios';
import { API } from '../config/config';
import { Dialog, ALERT_TYPE } from 'react-native-alert-notification';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleService, refundPay } from '../actions/servicesAction';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Loader from '../components/Loader/Loader'
import { Divider } from 'react-native-paper';
import { createBooking, createBookingPayLater, RescheduleBookingAsignee, resultPreviousDelete } from '../actions/BookingAction';
import { LoadUser } from '../actions/userActions';
import Modal from "react-native-modal";

const Checkout = ({ route, navigation }) => {
    const isFocused = useIsFocused();
    const { intime, minutes, id, selectedDate, result, bookedTime, employeeId, shopname, partnersBooking, mobileno, reschedule, bookingId, paymentId } = route.params;
    console.log("Booked", shopname, mobileno, reschedule)
    const { getService, loading } = useSelector((state) => state.getSingleService);
    const { isPosted, error, loading: bookingLoading } = useSelector((state) => state.createBooking)
    console.log("Selected Date", selectedDate);
    const dispatch = useDispatch();
    console.log(id);
    const { user } = useSelector((state) => state.LoadUser)

    console.log("SLOT MANAGEMENT", result)

    const [serviceId, setServiceId] = useState('')


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

    const [razorpay_order_id, setrazorpay_order_id] = useState('')
    const [razorpay_payment_id, setrazorpay_payment_id] = useState('')
    const [razorpay_signature, setrazorpay_signature] = useState('')

    const [outtime, setOutTime] = useState('');

    const [category, setCategory] = useState('')
    const [servicename, setServicename] = useState('')
    const [servicetype, setServicetype] = useState('')
    const [price, setPrice] = useState('')
    const [asignee, setAsignee] = useState('')

    let date;
    if (selectedDate) {
        date = moment(selectedDate).format('DD/MM/YYYY')
    }

    // console.log(intime, outtime)


    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

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

    intervals(intime, outtime);

    const rescheduleWithAsignee = async () => {
        if (bookedTime.some(r => results.includes(r)) || partnersBooking.some(r => results.includes(r))) {
            return Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'Warning',
                textBody: 'Already Booked',
                button: 'close'
            })
        }
        if (uservalue < currentTime) {
            return Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'Warning',
                textBody: 'Bookings Not Allowed',
                button: 'close'
            })
        }
        if (results.every(x => result.includes(x))) {
            await dispatch(RescheduleBookingAsignee(date, category, asignee, servicename, results, price, intime, outtime, servicetype, shopname, mobileno, paymentId, selectedDate, serviceId))
            dispatch(resultPreviousDelete(bookingId))
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


    console.log("Array", results)

    useEffect(() => {
        if (isFocused || id) {
            dispatch(getSingleService(id))
        }
    }, [dispatch, isFocused, id])

    let paylater = "Pay Later"

    const reschedulePayLaterWithAsignee = async () => {
        console.log("Ashish")
        if (bookedTime.some(r => results.includes(r)) || partnersBooking.some(r => results.includes(r))) {
            return Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'Warning',
                textBody: 'Already Booked',
                button: 'close'
            })
        }
        if (uservalue < currentTime) {
            return Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'Warning',
                textBody: 'Bookings Not Allowed',
                button: 'close'
            })
        }
        if (results.every(x => result.includes(x))) {
            await dispatch(createBookingPayLater(date, category, asignee, servicename, results, price, intime, outtime, servicetype, shopname, mobileno, paylater, selectedDate, serviceId))
            dispatch(resultPreviousDelete(bookingId))
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

    const PaymentLater = () => {
        if (bookedTime.some(r => results.includes(r)) || partnersBooking.some(r => results.includes(r))) {
            return Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'Warning',
                textBody: 'Already Booked',
                button: 'close'
            })
        }
        if (uservalue < currentTime) {
            return Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'Warning',
                textBody: 'Bookings Not Allowed',
                button: 'close'
            })
        }
        if (results.every(x => result.includes(x))) {
            dispatch(createBookingPayLater(date, category, asignee, servicename, results, price, intime, outtime, servicetype, shopname, mobileno, paylater, selectedDate, serviceId))
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

    const PaymentHanlder = async () => {
        if (bookedTime.some(r => results.includes(r)) || partnersBooking.some(r => results.includes(r))) {
            return Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'Warning',
                textBody: 'Already Booked',
                button: 'close'
            })
        }
        if (uservalue < currentTime) {
            return Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'Warning',
                textBody: 'Bookings Not Allowed',
                button: 'close'
            })
        }
        if (results.every(x => result.includes(x))) {
            const { data: { order } } = await axios.post(`${API}/customer/checkout`, { amount: getService.price });
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
                    dispatch(createBooking(date, category, asignee, servicename, results, price, intime, outtime, servicetype, paymentId, shopname, mobileno, selectedDate, serviceId))
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


    // console.log("RAZORPAY ORDER ID:", razorpay_order_id, "RAZORPAY PAYMENT ID:", razorpay_payment_id, "RAZORPAY SIGNATURE:", razorpay_signature)

    useEffect(() => {
        if (isFocused) {
            if (minutes || intime) {
                var addTime = moment(intime, ["hh:mm A"]).add(minutes, 'minutes').format('hh:mm A');// it will add 11 mins in the current time and will give time in 03:35 PM format; can use m or minutes 
                var subTime = moment(addTime, ["hh:mm A"]).subtract(15, 'minutes').format('hh:mm A');
                setOutTime(subTime);
            }
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
        if (employeeId) {
            setAsignee(employeeId)
        }
        if (id) {
            setServiceId(id)
        }
        if (!getService) {
            dispatch(getSingleService(id))
        }
        else {
            setCategory(getService.category)
            setPrice(getService.price)
            setServicename(getService.servicename)
            setServicetype(getService.servicetype)
        }
    }, [dispatch, isFocused, employeeId, isPosted, error, id, getService])
    console.log("DISPATCH DATA:", category, servicename, servicetype, price, asignee, results, date, intime, outtime)
    console.log('ServiceID', serviceId)

    return (
        <>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <StatusBar backgroundColor='#C396D2' barStyle='light-content' />
                <LinearGradient style={{ paddingVertical: 35 }} colors={['#C396D2', '#A27FC2']}></LinearGradient>
                {
                    loading ? <Loader /> : <View>
                        <ScrollView showsVerticalScrollIndicator={false}>
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
                        </ScrollView>
                    </View>
                }
            </View>
            <View>
                {
                    bookingLoading ? <>
                        <ActivityIndicator size="large" style={{ marginVertical: 10 }} color="#C396D2" />
                        <Text style={{ color: '#2B2B2B', fontSize: 13, fontFamily: 'Montserrat-SemiBold', alignSelf: 'center', marginBottom: 10 }}>Do not press back button</Text>
                    </>
                        : <>
                            <View style={{ backgroundColor: 'white' }}>
                                {
                                    loading ? <Text style={{ color: '#2B2B2B', marginHorizontal: 15, marginVertical: 20, fontFamily: 'Montserrat-Bold', alignSelf: 'center' }}>Loading...</Text> : <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15, alignItems: 'center' }}>
                                        {
                                            getService ? <Text style={{ color: '#1F1F1F', fontFamily: 'Montserrat-SemiBold', fontSize: 16 }}>₹{getService.price}</Text> : null
                                        }
                                        {
                                            reschedule === 'reschedule' ? <TouchableOpacity style={{ backgroundColor: '#9B7ABF', borderRadius: 5, paddingHorizontal: 18, paddingVertical: 10 }} onPress={() => rescheduleWithAsignee()}>
                                                <Text style={{ color: '#FFFFFF', fontFamily: 'Montserrat-Bold', fontSize: 14 }}>Reschedule</Text>
                                            </TouchableOpacity> : reschedule === 'paylater' ? <TouchableOpacity style={{ backgroundColor: '#9B7ABF', borderRadius: 5, paddingHorizontal: 18, paddingVertical: 10 }} onPress={() => reschedulePayLaterWithAsignee()}>
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

export default Checkout