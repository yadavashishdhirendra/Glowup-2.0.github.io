import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import BottomNavigation from '../components/Navigation/BottomNavigation'
import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'
import { useEffect } from 'react'
import { loggedUserLikeSaloon } from '../actions/BookingAction'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Loader from '../components/Loader/Loader'

const SavedSaloon = ({ navigation }) => {
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const { saloon, loading } = useSelector((state) => state.likedSaloon)
    console.log(saloon)

    useEffect(() => {
        if (isFocused) {
            dispatch(loggedUserLikeSaloon())
        }
    }, [dispatch, isFocused])


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {
                loading ? <Loader /> : <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: 'white' }}>
                    <View style={{ marginHorizontal: 20 }}>
                        {
                            saloon && saloon.length > 0 ? saloon.map((service) => {
                                return (
                                    <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('SaloonDetail', {
                                        ids: service._id,
                                        like: service.likes
                                    }
                                    )} style={styles.cardContainer} key={service._id}>
                                        <View>
                                            {
                                                service.images.length > 0 ? <Image style={{ width: "100%", height: 200, resizeMode: 'cover', borderTopLeftRadius: 10, borderTopRightRadius: 10 }} source={{ uri: service.images[0].url }} /> : <Image style={{ width: "100%", height: 200, resizeMode: 'cover', borderTopLeftRadius: 10, borderTopRightRadius: 10 }} source={require('../assets/Image/Service.jpg')} />
                                            }
                                        </View>
                                        <View style={styles.Cards}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <View>
                                                    <Text style={{ color: '#2B2B2B', fontFamily: 'Montserrat-SemiBold', fontSize: 16, marginBottom: 8 }}>{service.shopname}</Text>
                                                    <Text style={{ color: '#2B2B2B', fontFamily: 'Montserrat-Regular', fontSize: 13, textTransform: 'capitalize' }}>{service.addresssec.length > 34 ? service.addresssec.slice(0, 34) + '...' : service.addresssec}</Text>
                                                </View>
                                                <View style={{ alignItems: 'center', justifyContent: 'center', borderRadius: 100 }}>
                                                    <Text style={{ color: '#2B2B2B', fontFamily: 'Montserrat-SemiBold', fontSize: 13 }}>{service.likes.length} <AntDesign name='like2' size={16} color='#2B2B2B' /></Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }) : <Text style={{ color: '#000', fontFamily: 'Montserrat-SemiBold', marginTop: 10 }}>You'hve Not Liked any Saloons!</Text>
                        }
                    </View>
                </ScrollView>
            }
            <BottomNavigation />
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: 'white',
        marginVertical: 15
    },
    Cards: {
        shadowColor: '#787878',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 3,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        backgroundColor: 'white',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
})

export default SavedSaloon