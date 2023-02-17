import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import BottomNavigation from '../components/Navigation/BottomNavigation'
import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'
import { loggedUserBooking } from '../actions/BookingAction'
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification'
import Loader from '../components/Loader/Loader'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Divider } from 'react-native-paper'
import AntDesign from 'react-native-vector-icons/AntDesign'
import BookingNoFound from '../components/NotFound/BookingNoFound'

const MyOrders = ({ navigation }) => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused()
    const { bookings, error, loading } = useSelector((state) => state.Bookings)
    console.log("Bookings", bookings);

    useEffect(() => {
        if (isFocused) {
            dispatch(loggedUserBooking())
        }
        if (error) {
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: error,
                button: 'close'
            })
        }
    }, [dispatch, isFocused, error])


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {
                loading ? <Loader /> : <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                    <View style={{ marginHorizontal: 15, marginVertical: 15 }}>
                        {
                            bookings && bookings.length > 0 ? bookings.map((book) => {
                                return (
                                    <TouchableOpacity onPress={() => navigation.navigate('BookingDetails', {
                                        id: book._id
                                    })} key={book._id} style={{ backgroundColor: '#FBF6FF', borderWidth: 1, borderColor: '#DBC2F5', borderRadius: 5, marginBottom: 20 }}>
                                        <View style={styles.container}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Text style={{ color: '#8669A5', fontFamily: 'Montserrat-SemiBold', fontSize: 14, }}>{book.shopname.length > 2 ? book.shopname.slice(0, 20) : book.shopname}...</Text>
                                                <View>
                                                    {book.paylater ? <Text style={{ fontFamily: "Montserrat-SemiBold", color: '#2B2B2B', backgroundColor: '#FFFF', paddingHorizontal: 8, paddingVertical: 6, borderRadius: 5, borderColor: '#DBC2F5', borderWidth: 1, fontSize: 12 }}>{book.paylater} / {book.status}</Text> : <Text style={{ fontFamily: "Montserrat-SemiBold", color: '#2B2B2B', backgroundColor: '#FFFF', paddingHorizontal: 8, paddingVertical: 6, borderRadius: 5, borderColor: '#59CE8F', borderWidth: 1, fontSize: 12 }}>{book.status}</Text>}
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                                <Entypo name='back-in-time' size={12} color='#5C5C5C' />
                                                <Text style={{ color: '#5C5C5C', marginLeft: 5, fontSize: 12, fontFamily: 'Montserrat-SemiBold' }}>{book.date} at {book.intime}</Text>
                                            </View>
                                            {
                                                book && book.idList.length >= 2 ? <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', borderRightColor: '#C7C7C7', borderRightWidth: 1 }}>
                                                        <Text style={{ color: '#5C5C5C', marginRight: 15, fontSize: 12, fontFamily: 'Montserrat-SemiBold' }}>{book.category}</Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <Text style={{ color: '#5C5C5C', marginLeft: 15, fontSize: 12, fontFamily: 'Montserrat-SemiBold', textTransform: 'capitalize' }}>{book.servicename}</Text>
                                                    </View>
                                                </View> : <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <MaterialIcons name='category' size={12} color='#5C5C5C' />
                                                        <Text style={{ color: '#5C5C5C', marginLeft: 5, fontSize: 12, fontFamily: 'Montserrat-SemiBold' }}>{book.category}</Text>
                                                        <Text style={{ color: '#2B2B2B', marginHorizontal: 8 }}>|</Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <AntDesign name='setting' size={12} color='#5C5C5C' />
                                                        <Text style={{ color: '#5C5C5C', marginLeft: 5, fontSize: 12, fontFamily: 'Montserrat-SemiBold', textTransform: 'capitalize' }}>{book.servicename}</Text>
                                                    </View>
                                                </View>
                                            }
                                        </View>
                                        <View style={{ marginBottom: 10 }}>
                                            <Divider style={{ height: 1 }} />
                                            <View style={{ paddingHorizontal: 10, paddingTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text style={{ fontFamily: 'Montserrat-SemiBold', color: '#000' }}>Total</Text>
                                                <Text style={{ fontFamily: 'Montserrat-SemiBold', color: '#000' }}>₹ {book.price}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }) : <BookingNoFound />
                        }
                    </View>
                </ScrollView>
            }
            <BottomNavigation />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    }
})

export default MyOrders