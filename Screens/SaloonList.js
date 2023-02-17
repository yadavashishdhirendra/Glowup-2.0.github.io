import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getServiceCategoryFilter } from '../actions/servicesAction';
import { useState } from 'react';
import Loader from '../components/Loader/Loader';
import { useIsFocused } from '@react-navigation/native';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import AntDesign from 'react-native-vector-icons/AntDesign'
import BottomNavigation from '../components/Navigation/BottomNavigation';

const SaloonList = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const { arr, error, loading } = useSelector(state => state.serviceFilter);
    const { Api } = route.params;
    console.log("xyz", arr)

    const isFocused = useIsFocused();

    const [servicetype, setServiceType] = useState('')
    // console.log("Category", category)

    useEffect(() => {
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
        if (Api) {
            setServiceType(Api)
        }

        if (servicetype.length > 0) {
            dispatch(getServiceCategoryFilter(servicetype))
        }
        if (isFocused && servicetype.length > 0) {
            dispatch(getServiceCategoryFilter(servicetype))
        }
    }, [dispatch, error, servicetype, isFocused])

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {
                loading ? <Loader /> : <ScrollView showsVerticalScrollIndicator={false} style={{ marginHorizontal: 20, marginVertical: 20 }}>
                    <View>
                        <View style={styles.HeaderContainer}>
                            <Text style={styles.HeaderStyle}>Salons for</Text>
                            <Text style={[styles.HeaderStyle, { color: '#9B7ABF', marginLeft: 5 }]}>{Api}</Text>
                        </View>
                        <View>
                            {
                                arr && arr.length > 0 ? arr.map((service) => {
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
                                                        <Text style={{ color: '#2B2B2B', fontFamily: 'Montserrat-Regular', fontSize: 13 }}>{service.addresssec.length > 34 ? service.addresssec.slice(0, 34) + '...' : service.addresssec}</Text>
                                                    </View>
                                                    <View style={{ alignItems: 'center', justifyContent: 'center', borderRadius: 100 }}>
                                                        <Text style={{ color: '#2B2B2B', fontFamily: 'Montserrat-SemiBold', fontSize: 13 }}>{service.likes.length} <AntDesign name='like2' size={16} color='#2B2B2B' /></Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }) : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../assets/Image/image54.png')} />
                                    <Text style={{ color: '#2B2B2B', fontFamily: 'Montserrat-Regular', fontSize: 15, textAlign: 'center', paddingHorizontal: 20 }}>No Data found with this category, try changing the categories!</Text>
                                </View>
                            }
                        </View>
                    </View>
                </ScrollView>
            }
            <BottomNavigation />
        </View>
    )
}

const styles = StyleSheet.create({
    HeaderStyle: {
        color: '#302141',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18
    },
    HeaderContainer: {
        flexDirection: 'row',
        marginBottom: 15
    },
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

export default SaloonList