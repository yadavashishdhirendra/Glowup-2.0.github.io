import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native';
import { getSearchSaloon } from '../actions/servicesAction';
import Loader from '../components/Loader/Loader';
import BottomNavigation from '../components/Navigation/BottomNavigation';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import NoDataFound from '../components/NotFound/NoDataFound';
import AntDesign from 'react-native-vector-icons/AntDesign'

const SearchSaloon = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const { saloons, error, loading } = useSelector((state) => state.searchSaloon)
    console.log("x", saloons)
    const { servicetype, servicename } = route.params;
    console.log("y", servicetype)

    useEffect(() => {
        if (error) {
            dispatch({
                type: "ClearError"
            })
        }
    }, [dispatch])


    useEffect(() => {
        if (isFocused || servicetype || servicename) {
            dispatch(getSearchSaloon(servicetype, servicename))
        }
    }, [dispatch, isFocused, servicetype, servicename])


    return (
        <>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                {
                    loading ? <Loader /> : <ScrollView showsVerticalScrollIndicator={false} style={{ marginHorizontal: 20, marginVertical: 0 }}>
                        <View>
                            {
                                error ? <NoDataFound keyword={servicetype} /> : saloons && saloons.length > 0 ? saloons.map((service) => {
                                    return (
                                        <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('SaloonDetail', {
                                            ids: service._id,
                                            like: service.likes
                                        })} style={styles.cardContainer} key={service._id}>
                                            <View>
                                                {
                                                    service.images.length > 0 ? <Image style={{ width: "100%", height: 200, resizeMode: 'cover', borderTopLeftRadius: 10, borderTopRightRadius: 10 }} source={{ uri: service.images[0].url }} /> : <Image style={{ width: "100%", height: 200, resizeMode: 'cover', borderTopLeftRadius: 10, borderTopRightRadius: 10 }} source={require('../assets/Image/Service.jpg')} />
                                                }
                                            </View>
                                            <View style={styles.Cards}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <View>
                                                        <Text style={{ color: '#2B2B2B', fontFamily: 'Montserrat-SemiBold', fontSize: 16, marginBottom: 8 }}>{service.shopname}</Text>
                                                        <Text style={{ color: '#2B2B2B', fontFamily: 'Montserrat-Regular', fontSize: 13 }}>{service.addresssec.length > 34 ? service.addresssec.slice(0, 34) + '...' : service.addresssec}</Text>
                                                    </View>
                                                    <View style={{ alignItems: 'center', justifyContent: 'center', borderRadius: 100 }}>
                                                        <Text style={{ color: '#2B2B2B', fontFamily: 'Montserrat-SemiBold', fontSize: 13 }}>{service.likes.length} <AntDesign name='like2' size={16} color='#2B2B2B' /></Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }) : <NoDataFound keyword={servicetype} />
                            }
                        </View>
                    </ScrollView>
                }
                <BottomNavigation />
            </View>
        </>
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

export default SearchSaloon