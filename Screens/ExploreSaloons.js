import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BottomNavigation from '../components/Navigation/BottomNavigation'
import { useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { getAllSallons, getLikedSaloonsUsers } from '../actions/servicesAction'
import Loader from '../components/Loader/Loader'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Modal from "react-native-modal";
import { useState } from 'react'
import CircleLoader from '../components/Loader/CircleLoader'

const ExploreSaloons = ({ navigation }) => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const { saloons, error, loading } = useSelector((state) => state.AllSaloons)
    const { saloon, loading: likeLoading } = useSelector((state) => state.likeUser)

    const [isModalVisible, setModalVisible] = useState(false);

    const [saloonId, setSaloonId] = useState()

    const toggleModal = (id) => {
        console.log("ID:", id)
        setSaloonId(id)
        dispatch(getLikedSaloonsUsers(id))
        setModalVisible(!isModalVisible);
    };



    console.log("USER:", saloon)

    useEffect(() => {
        if (isFocused || saloonId) {
            dispatch(getAllSallons())
            dispatch(getLikedSaloonsUsers(saloonId))
        }
        dispatch(getAllSallons())
    }, [dispatch, isFocused, saloonId])

    return (
        <>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                {
                    loading ? <Loader /> : <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ marginHorizontal: 20 }}>
                            {
                                saloons && saloons.length > 0 ? saloons.map((service) => {
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
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                                    <View>
                                                        <Text style={{ color: '#2B2B2B', fontFamily: 'Montserrat-SemiBold', fontSize: 16, marginBottom: 8 }}>{service.shopname}</Text>
                                                        <Text style={{ color: '#2B2B2B', fontFamily: 'Montserrat-Regular', fontSize: 13, textTransform: 'capitalize' }}>{service.addresssec.length > 34 ? service.addresssec.slice(0, 34) + '...' : service.addresssec}</Text>
                                                    </View>
                                                    {
                                                        service.likes.length > 0 ? <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', borderRadius: 100 }} onPress={() => toggleModal(service._id)}>
                                                            <Text style={{ color: '#2B2B2B', fontFamily: 'Montserrat-SemiBold', fontSize: 13 }}>{service.likes.length} <AntDesign name='like2' size={16} color='#2B2B2B' /></Text>
                                                        </TouchableOpacity> : null
                                                    }
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }) : <Text style={{ color: '#000' }}>No Data Found!</Text>
                            }
                        </View>
                    </ScrollView>
                }
            </View>
            <Modal animationIn="zoomInDown"
                animationOut="zoomOutUp"
                animationInTiming={600}
                animationOutTiming={600}
                bo
                onBackButtonPress={toggleModal}
                backdropTransitionInTiming={600}
                backdropTransitionOutTiming={600} isVisible={isModalVisible}>
                <ScrollView style={{ flex: 1, backgroundColor: 'white', borderRadius: 5 }}>
                    {
                        likeLoading ? <CircleLoader /> : <View>
                            {
                                saloon && saloon.likes.length > 0 ? saloon.likes.map((user) => {
                                    return (
                                        <View key={user._id}>
                                            <View style={{ marginHorizontal: 15, marginVertical: 15, flexDirection: 'row', alignItems: 'center' }}>
                                                <Image style={{ width: 50, height: 50, resizeMode: 'contain', borderRadius: 100 }} source={{ uri: 'https://github.com/yadavashishdhirendra/MLG-Newsletter-1.github.io/blob/main/istockphoto-1298261537-612x612.jpg?raw=true' }} />
                                                <Text style={{ color: '#2B2B2B', marginLeft: 15, fontFamily: 'Montserrat-SemiBold', fontSize: 16 }}>{user.name}</Text>
                                            </View>
                                        </View>
                                    )
                                }) : null
                            }
                        </View>
                    }
                </ScrollView>
            </Modal>
            <BottomNavigation />
        </>
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

export default ExploreSaloons