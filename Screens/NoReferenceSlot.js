import { View, Text, StatusBar, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllSlot } from '../actions/BookingAction';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useIsFocused } from '@react-navigation/native';

const NoReferenceSlot = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const { bookedTime, error, loading } = useSelector((state) => state.getBooking)
    const isFocused = useIsFocused()
    console.log(bookedTime)
    const { id, shopname, mobileno, reschedule, bookingId, paymentId,idList } = route.params;
    console.log('PARAMS', id, shopname)
    const [result, setResult] = useState([])

    // DATE PICKER
    let todayDate = moment(new Date()).format("DD/MM/YYYY")
    console.log(todayDate)


    const [selectedDate, setSelectedDate] = useState(new Date());
    const [datePickerVisible, setDatePickerVisible] = useState(false);

    let date = selectedDate ? moment(selectedDate).format("DD/MM/YYYY") : moment(new Date()).format("DD/MM/YYYY")

    const showDatePicker = () => {
        setDatePickerVisible(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisible(false);
    };

    const handleConfirm = (dates) => {
        date = dates ? moment(dates).format("DD/MM/YYYY") : moment(new Date()).format("DD/MM/YYYY")
        console.log("MPH", date)
        setSelectedDate(dates);
        hideDatePicker();
    };

    console.log(selectedDate, 'New Timestamp')


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

    intervals('11:00 am', '07:00 pm');

    console.log(result, date);


    useEffect(() => {
        if (isFocused) {
            dispatch(getAllSlot(id, date))
        }
    }, [dispatch, isFocused, id, date])


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar backgroundColor='#C396D2' barStyle='light-content' />
            <LinearGradient style={{ paddingVertical: 35 }} colors={['#C396D2', '#A27FC2']}></LinearGradient>
            <ScrollView showsVerticalScrollIndicator={false} style={{ marginVertical: 20, marginHorizontal: 15 }}>
                <View>
                    <View>
                        <TouchableOpacity style={{ backgroundColor: '#D4A3DB', alignSelf: 'center', paddingHorizontal: 18, paddingVertical: 10, marginBottom: 15, borderRadius: 5 }} onPress={showDatePicker}>
                            <Text style={{ color: 'white', fontFamily: 'Montserrat-Bold', fontSize: 13 }}>{moment(selectedDate).format("DD/MM/YYYY")}</Text>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            date={selectedDate}
                            isVisible={datePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                    </View>
                    <View style={styles.container}>
                        {
                            result && result.length > 0 ? result.map((time, i) => {
                                return (
                                    bookedTime && bookedTime.length > 0 && bookedTime.includes(time) ? <TouchableOpacity style={styles.item} key={i}>
                                        <Text style={{ color: '#725593', fontFamily: 'Montserrat-SemiBold', fontSize: 12 }}>{time}</Text>
                                    </TouchableOpacity> :
                                        <TouchableOpacity onPress={() => navigation.navigate('NoPreferenceCheckout', {
                                            shopname: shopname,
                                            id: id,
                                            date: date,
                                            intime: time,
                                            selectedDate: selectedDate,
                                            result: result,
                                            mobileno: mobileno,
                                            reschedule: reschedule,
                                            bookingId: bookingId,
                                            paymentId: paymentId,
                                            idList: idList
                                        })} style={styles.items} key={i}>
                                            <Text style={{ color: '#725593', fontFamily: 'Montserrat-SemiBold', fontSize: 12 }}>{time}</Text>
                                        </TouchableOpacity>
                                )
                            }) : null
                        }
                    </View>
                    {/* <Text style={{ color: '#2B2B2B', fontFamily: 'Montserrat-SemiBold' }}>Minutes: {minutes} ServiceId: {id}</Text> */}
                </View>
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

export default NoReferenceSlot