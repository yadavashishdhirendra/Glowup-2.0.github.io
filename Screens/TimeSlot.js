import { View, Text, StatusBar, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllSlot, getPartnersAllSlot } from '../actions/BookingAction';
import Loader from '../components/Loader/CircleLoader'
import { useIsFocused } from '@react-navigation/native';
import Fontisto from 'react-native-vector-icons/Fontisto'

const TimeSlot = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const { bookedTime, error, loading } = useSelector((state) => state.getBooking)
    const { bookedTime: partnersBooking } = useSelector((state) => state.partnerBooking)
    const isFocused = useIsFocused()

    const { intime, outtime, minutes, id, serviceid, shopname, mobileno, reschedule, bookingId, paymentId } = route.params;
    console.log("ID", id)
    console.log(intime, outtime, "Service ID");

    console.log("SHOPNAME:", shopname, mobileno)

    let result = []

    // DATE PICKER
    let todayDate = moment(new Date()).format("DD/MM/YYYY")
    console.log(todayDate)


    const [selectedDate, setSelectedDate] = useState(new Date());
    const [datePickerVisible, setDatePickerVisible] = useState(false);

    let date = moment(selectedDate).format("DD/MM/YYYY")

    const showDatePicker = () => {
        setDatePickerVisible(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisible(false);
    };

    const handleConfirm = (dates) => {
        date = dates ? moment(dates).format("DD/MM/YYYY") : moment(new Date()).format("DD/MM/YYYY")
        console.log("MPH", date)
        // if (isFocused) {
        dispatch(getAllSlot(id, date))
        dispatch(getPartnersAllSlot(id, date))
        // }
        setSelectedDate(dates);
        hideDatePicker();
    };

    // console.log("Moment", date)

    function intervals(startString, endString) {
        var start = moment(startString, 'hh:mm a');
        var end = moment(endString, 'hh:mm a');

        start.minutes(Math.ceil(start.minutes() / 15) * 15);

        var current = moment(start);

        while (current <= end) {
            if (result.includes(current.format('hh:mm a'))) {
                return null
            }
            else {
                result.push(current.format('hh:mm a'));
                current.add(15, 'minutes');
            }
        }

        return result;
    }

    let d = moment().format('DD/MM/YYYY');
    let dnew = moment().format('DD/MM/YYYY');

    const [count, setcount] = useState(false)


    if (count) {
        intervals(moment().format('hh:mm a'), outtime);
    }
    else {
        intervals(intime, outtime);
    }

    console.log(count);

    console.log(selectedDate, 'mmm')

    // console.log(id, date)


    useEffect(() => {
        if (id || date) {
            dispatch(getAllSlot(id, date))
            dispatch(getPartnersAllSlot(id, date))
        }

        if (intime && intime < moment().format('hh:mm a') && new Date().toDateString() <= selectedDate.toDateString()) {
            setcount(true)
            console.log(true)
        }
        else if (intime <= "12:00 am") {
            setcount(false)
        }
        else {
            setcount(false)
            console.log(false)
        }
    }, [dispatch, isFocused, id, date])

    console.log("PARTNERS BOOKING", partnersBooking, id)
    console.log(result, "minute")

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar backgroundColor='#C396D2' barStyle='light-content' />
            <LinearGradient style={{ paddingVertical: 35 }} colors={['#C396D2', '#A27FC2']}></LinearGradient>
            <ScrollView showsVerticalScrollIndicator={false} style={{ marginVertical: 20, marginHorizontal: 15 }}>
                {
                    loading ? <Loader /> : <View>
                        <TouchableOpacity style={{ backgroundColor: '#D4A3DB', alignSelf: 'center', paddingHorizontal: 18, paddingVertical: 10, marginBottom: 15, borderRadius: 5 }} onPress={showDatePicker}>
                            <Text style={{ color: 'white', fontFamily: 'Montserrat-Bold', fontSize: 13 }}>{moment(selectedDate).format("DD/MM/YYYY")}</Text>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            date={selectedDate}
                            isVisible={datePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                            minimumDate={new Date()}
                        />
                        <View style={styles.container}>
                            {
                                result && result.length > 0 ? result.map((time, i) => {
                                    return (
                                        bookedTime && bookedTime.length > 0 && bookedTime.includes(time) || partnersBooking && partnersBooking.length > 0 && partnersBooking.includes(time) ? <TouchableOpacity style={styles.item} key={i}>
                                            <Text style={{ color: '#725593', fontFamily: 'Montserrat-SemiBold', fontSize: 12 }}>{time}</Text>
                                        </TouchableOpacity> :
                                            <TouchableOpacity onPress={() => navigation.navigate('Checkout', {
                                                intime: time,
                                                minutes: minutes,
                                                id: serviceid,
                                                selectedDate: selectedDate,
                                                result: result,
                                                bookedTime: bookedTime,
                                                employeeId: id,
                                                shopname: shopname,
                                                partnersBooking: partnersBooking,
                                                mobileno: mobileno,
                                                reschedule: reschedule,
                                                bookingId: bookingId,
                                                paymentId: paymentId
                                            })} style={styles.items} key={i}>
                                                <Text style={{ color: '#725593', fontFamily: 'Montserrat-SemiBold', fontSize: 12 }}>{time}</Text>
                                            </TouchableOpacity>
                                    )
                                }) : <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 15 }}>
                                    <Fontisto name='locked' size={32} color='#2B2B2B' style={{ marginBottom: 8 }} />
                                    <Text style={{ fontSize: 18, color: '#2B2B2B', fontFamily: 'Montserrat-SemiBold' }}>No Time Slots Available</Text>
                                </View>
                            }
                        </View>
                        {/* <Text style={{ color: '#2B2B2B', fontFamily: 'Montserrat-SemiBold' }}>Minutes: {minutes} ServiceId: {id}</Text> */}
                    </View>
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    items: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '30%', // is 50% of container width
        marginVertical: 10,
        backgroundColor: '#F8F8F8',
        marginHorizontal: 5,
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 9
    },
    item: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '30%', // is 50% of container width
        marginVertical: 10,
        backgroundColor: '#EDE7F2',
        marginHorizontal: 5,
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 9
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center', // if you want to fill rows left to right,
        justifyContent: 'center',
        marginBottom: 20
    }
})

export default TimeSlot