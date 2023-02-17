import { View, Text, ScrollView, StatusBar, Image, TouchableOpacity, Linking } from 'react-native'
import React, { useEffect } from 'react'
import BottomNavigation from '../components/Navigation/BottomNavigation'
import LinearGradient from 'react-native-linear-gradient'
import { useDispatch, useSelector } from 'react-redux'
import { LoadUser, logoutUser } from '../actions/userActions'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useIsFocused } from '@react-navigation/native'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Feather from 'react-native-vector-icons/Feather'
import { Divider } from 'react-native-paper'

const Profile = ({ navigation }) => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const { user, error, loading, isAuthenticated } = useSelector((state) => state.LoadUser)
    console.log("USER:", user.name)

    // const logout = () => {
    //     dispatch(logoutUser())
    //     console.log('Logout')
    //     navigation.navigate('Logins')
    // }

    const openEmail = () => {
        Linking.openURL('mailto:info@glowup.pro').then(() => null).catch(() => null)
    }

    useEffect(() => {
        if (isFocused) {
            dispatch(LoadUser())
        }
    }, [dispatch, isFocused])

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar backgroundColor='#C396D2' barStyle='light-content' />
            <LinearGradient style={{ paddingVertical: 35 }} colors={['#C396D2', '#A27FC2']}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 25, alignItems: 'center' }}>
                    <View>
                        <Text style={{ color: 'white', fontFamily: 'Montserrat-Bold', fontSize: 18 }}>{user.name}</Text>
                        <Text style={{ color: 'white', marginTop: 7, fontSize: 14, fontFamily: 'Montserrat-SemiBold' }}>+91 {user.phone}</Text>
                    </View>
                    <View style={{ width: 85, height: 85, backgroundColor: '#ffff', borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ width: 20, height: 20, backgroundColor: '#F4C9DC', opacity: 0.1, borderRadius: 50 }}>
                        </View>
                        <Text style={{ color: '#725593', position: 'absolute', fontSize: 38, fontFamily: 'Montserrat-Bold' }}>{user.name.length > 2 ? user.name.slice(0, 1) : user.name}</Text>
                    </View>
                </View>
            </LinearGradient>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ marginHorizontal: 20, marginVertical: 28 }}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }} onPress={() => navigation.navigate('Orders')}>
                        <MaterialIcons name='history-toggle-off' size={22} color='black' />
                        <Text style={{ color: 'black', marginLeft: 8, fontFamily: 'Montserrat-Medium', fontSize: 16 }}>Booking History</Text>
                    </TouchableOpacity>
                    <Divider style={{ height: 0.5 }} />
                    <TouchableOpacity onPress={() => navigation.navigate('Saved')} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                        <MaterialIcons name='save-alt' size={22} color='black' />
                        <Text style={{ color: 'black', marginLeft: 8, fontFamily: 'Montserrat-Medium', fontSize: 16 }}>Saved</Text>
                    </TouchableOpacity>
                    <Divider style={{ height: 0.5 }} />
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }} onPress={() => navigation.navigate('Faqs')}>
                        <SimpleLineIcons name='question' size={22} color='black' />
                        <Text style={{ color: 'black', marginLeft: 8, fontFamily: 'Montserrat-Medium', fontSize: 16 }}>FAQs</Text>
                    </TouchableOpacity>
                    {/* <Divider style={{ height: 0.5 }} /> */}
                    {/* <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                        <Feather name='headphones' size={22} color='black' />
                        <Text style={{ color: 'black', marginLeft: 8, fontFamily: 'Montserrat-Medium', fontSize: 16 }}>Help & Contact</Text>
                    </TouchableOpacity> */}
                    {/* <Divider style={{ height: 0.5 }} />
                    <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                        <MaterialIcons name='logout' size={22} color='black' />
                        <Text style={{ color: 'black', marginLeft: 8, fontFamily: 'Montserrat-Medium', fontSize: 16 }}>Logout</Text>
                    </TouchableOpacity> */}
                </View>
            </ScrollView>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }} onPress={() => openEmail()}>
                <MaterialIcons name='feedback' size={22} color='#C396D2' />
                <Text style={{ color: '#C396D2', fontSize: 16, fontFamily: 'Montserrat-Medium', marginLeft: 8 }}>Report a Problem</Text>
            </TouchableOpacity>
            <BottomNavigation />
        </View>
    )
}

export default Profile