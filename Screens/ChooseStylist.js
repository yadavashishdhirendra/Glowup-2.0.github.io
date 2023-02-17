import { View, Text, StatusBar, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native';
import { getServicesEmployees, multipleHours } from '../actions/servicesAction';
import Entypo from 'react-native-vector-icons/Entypo'
import Loader from '../components/Loader/Loader'
import CircleLoader from '../components/Loader/CircleLoader'

const ChooseStylist = ({ route, navigation }) => {
    const { id, shopname, mobileno, reschedule, bookingId, paymentId, idList } = route.params;
    console.log("ID", reschedule);
    console.log(idList, "IDS")
    const isFocused = useIsFocused()
    const dispatch = useDispatch();
    const { employees, loading } = useSelector((state) => state.getEmployees)
    // const { hour } = useSelector((state) => state.multipleHour)
    console.log("SHOPNAME:", shopname, mobileno)

    let emp = []
    employees && employees.myemployees.forEach((x) => {
        if (emp.includes(x)) {
            return null;
        }
        else {
            emp.push(x)
        }
    })

    console.log("x", employees)

    useEffect(() => {
        if (isFocused) {
            dispatch(getServicesEmployees(id))
        }
        // if (idList.length > 0) {
        //     dispatch(multipleHours(idList))
        // }
    }, [dispatch, isFocused, id])


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar backgroundColor='#C396D2' barStyle='light-content' />
            <LinearGradient style={{ paddingVertical: 35 }} colors={['#C396D2', '#A27FC2']}></LinearGradient>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                {/* DUMMY EMPLOYEE */}
                {
                    loading ? <CircleLoader /> : <>
                        <TouchableOpacity onPress={() => navigation.navigate('NoPreferenceSlot', {
                            id: id,
                            shopname: shopname,
                            mobileno: mobileno,
                            reschedule: reschedule,
                            bookingId: bookingId,
                            paymentId: paymentId,
                            idList: idList
                        })}>
                            <View style={{ marginHorizontal: 12, marginTop: 20 }}>
                                <View style={{ marginBottom: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image style={{ width: 80, height: 80, resizeMode: 'contain', borderRadius: 6 }} source={require('../assets/Image/Employee.png')} />
                                        <View style={{ marginLeft: 15 }}>
                                            <Text style={{ color: '#2B2B2B', fontFamily: 'Montserrat-SemiBold', fontSize: 15 }}>No Preference</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                                <Entypo name='back-in-time' size={15} color="#5B5B5B" />
                                                <Text style={{ color: '#5B5B5B', fontFamily: 'Montserrat-Medium', fontSize: 13, marginLeft: 5 }}>Maximum availability</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <Entypo name='chevron-right' size={30} color='#5B5B5B' />
                                </View>
                            </View>
                        </TouchableOpacity>
                        {
                            idList && idList.length > 0 ? null : <View style={{ marginHorizontal: 12, marginBottom: 20 }}>
                                {
                                    emp && emp.length > 0 ? emp.map((x) => {
                                        return (
                                            <TouchableOpacity key={x._id} onPress={() => navigation.navigate('Slot', {
                                                intime: x.intime,
                                                outtime: x.outtime,
                                                minutes: employees.hour,
                                                id: x._id,
                                                serviceid: id,
                                                shopname: shopname,
                                                mobileno: mobileno,
                                                reschedule: reschedule,
                                                bookingId: bookingId,
                                                paymentId: paymentId
                                            })}>
                                                <View style={{ marginBottom: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <Image style={{ width: 80, height: 80, resizeMode: 'contain', borderRadius: 6 }} source={{ uri: x.avatar.url }} />
                                                        <View style={{ marginLeft: 15 }}>
                                                            <Text style={{ color: '#2B2B2B', fontFamily: 'Montserrat-SemiBold', fontSize: 15 }}>{x.firstname} {x.lastname}</Text>
                                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                                                <Entypo name='back-in-time' size={15} color="#5B5B5B" />
                                                                <Text style={{ color: '#5B5B5B', fontFamily: 'Montserrat-Medium', fontSize: 13, marginLeft: 5 }}>{x.intime} {x.outtime}</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    <Entypo name='chevron-right' size={30} color='#5B5B5B' />
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    }) : null
                                }
                            </View>
                        }
                    </>
                }
            </ScrollView>
        </View>
    )
}

export default ChooseStylist