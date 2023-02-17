import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const BookingNoFound = () => {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Image source={require('../../assets/Image/NoBooking.png')} />
            <Text style={{ color: '#D52976', fontFamily: 'Montserrat-SemiBold', fontSize: 18, marginTop: 12 }}>No Booking Found</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Explore')} style={{ backgroundColor: '#9B7ABF', marginVertical: 15, paddingHorizontal: 18, paddingVertical: 10, borderRadius: 5, alignItems: 'center' }}>
                <Text style={{ color: 'white', fontFamily: 'Montserrat-SemiBold', fontSize: 14 }}>Explore Saloons</Text>
            </TouchableOpacity>
        </View>
    )
}

export default BookingNoFound