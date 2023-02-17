import { Text, ScrollView, StatusBar, StyleSheet, Image, View, TouchableOpacity, Platform, PermissionsAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LoadUser } from '../actions/userActions'
import Geolocation from 'react-native-geolocation-service'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Geocoder from 'react-native-geocoding'

const Location = ({ navigation }) => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.LoadUser)
    // console.log(user)
    const [load, setLoad] = useState(true)
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)

    const [formatted_address, setFormatted_address] = useState('')
    const [city, setCity] = useState('')
    function getLocation() {
        Geocoder.init("AIzaSyCfA9go18lgf2P0YvIS8P5a60bxJ6wn0Eo");

        Geocoder.from(latitude, longitude)
            .then(json => {
                json.results[0].address_components.forEach((value, index) => {
                    setFormatted_address(json.results[0].formatted_address);
                    var add = json.results[0].formatted_address;
                    var value = add.split(",");

                    let count = value.length;
                    let city = value[count - 3];
                    setCity(city)
                });
            })
            .catch(error => console.warn(error));
    }

    if (latitude || longitude) {
        getLocation()
    }

    console.log(formatted_address);
    async function requestPermissions() {
        if (Platform.OS === 'ios') {
            Geolocation.requestAuthorization();
            Geolocation.setRNConfiguration({
                skipPermissionRequests: false,
                authorizationLevel: 'whenInUse',
            });
        }

        if (Platform.OS === 'android') {
            await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
        }
    }

    Geolocation.getCurrentPosition(
        (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        },
        (error) => {
            console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );

    useEffect(() => {
        if (load) {
            dispatch(LoadUser())
        }
        requestPermissions();
    }, [dispatch, load])

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} showsVerticalScrollIndicator={false}>
                <StatusBar backgroundColor='#9B7ABF' barStyle='light-content' />
                {
                    user ? <Text style={styles.welcomeMessage}>Hi {user.name}, nice to meet you!</Text> : null
                }
                <Text style={styles.welcome}>See Services Around</Text>
                <View>
                    <Image style={styles.WelcomeImg} source={require('../assets/Image/Welcome.png')} />
                </View>
                <View>
                    <TouchableOpacity onPress={() => requestPermissions()} style={{ backgroundColor: '#9B7ABF', marginVertical: 20, paddingVertical: 13, paddingHorizontal: 20, borderRadius: 5 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome5 color='white' size={21} name='location-arrow' type="FontAwesome5" />
                            <Text style={{ marginLeft: 10, fontSize: 14, fontFamily: 'Montserrat-Bold', color: 'white' }}>Your current location</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text style={{ color: '#000', fontFamily: 'Montserrat-Regular' }}>Latitude: {latitude}</Text>
                    <Text style={{ color: '#000', fontFamily: 'Montserrat-Regular' }}>Longitude: {longitude}</Text>
                </View>
            </ScrollView>
            {
                latitude || longitude ? <TouchableOpacity onPress={() => navigation.navigate('Home', {
                    formatted_address: formatted_address,
                    city: city
                })} style={{ backgroundColor: '#9B7ABF', paddingVertical: 15 }}>
                    <Text style={{ color: '#FFFF', alignSelf: 'center', fontFamily: 'Montserrat-Bold' }}>CONTINUE</Text>
                </TouchableOpacity> : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    welcomeMessage: {
        color: '#000',
        fontSize: 16,
        fontFamily: 'Montserrat-Regular'
    },
    welcome: {
        color: '#000',
        fontSize: 26,
        fontFamily: 'Montserrat-SemiBold',
        marginVertical: 5
    },
    WelcomeImg: {
        width: 400,
        resizeMode: 'contain'
    }
})

export default Location