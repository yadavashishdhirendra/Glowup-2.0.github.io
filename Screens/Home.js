import { View, Text, ScrollView, StyleSheet, TouchableOpacity, StatusBar, TextInput, Image, Platform, PermissionsAndroid, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LoadUser } from '../actions/userActions'
import Entypo from 'react-native-vector-icons/Entypo'
import IonIcons from 'react-native-vector-icons/Ionicons'
import { List } from 'react-native-paper'
import Geolocation from 'react-native-geolocation-service'
import Geocoder from 'react-native-geocoding'
import BottomNavigation from '../components/Navigation/BottomNavigation'
import { useIsFocused, useRoute } from '@react-navigation/native'
import Loader from '../components/Loader/Loader'
import CircleLoader from '../components/Loader/CircleLoader'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { getSortedSaloons } from '../actions/servicesAction'

const services = [
    {
        img: require('../assets/Image/Men.png'),
        title: "Men",
        api: "Men"
    },
    {
        img: require('../assets/Image/women.png'),
        title: "Women",
        api: "Women"
    },
    {
        img: require('../assets/Image/nails.png'),
        title: "Nails",
        api: "Nails"
    },
    {
        img: require('../assets/Image/treatments.png'),
        title: "Treatments",
        api: "Treatments"
    },
    {
        img: require('../assets/Image/Makeup.png'),
        title: "Makeup",
        api: "Makeup"
    },
    {
        img: require('../assets/Image/skin.png'),
        title: "Skin",
        api: "Skin"
    },
    {
        img: require('../assets/Image/both.png'),
        title: "Men/Women",
        api: "Men/Women"
    },
    {
        title: "Explore",
    },
]

const servicesLine = [

]

const Home = ({ navigation }) => {
    const route = useRoute();
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.LoadUser);
    const { sorted, loading } = useSelector((state) => state.sortSaloon)

    const [searchInput, setSearchInput] = useState('')

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
        if (isFocused) {
            requestPermissions();
            dispatch(LoadUser())
            dispatch(getSortedSaloons())
        }
        // dispatch(LoadUser())
        // dispatch(getSortedSaloons())
    }, [dispatch, isFocused])


    useEffect(() => {
        setSearchInput()
        if (route.name === 'Home') {
            navigation.addListener("beforeRemove", (e) => {
                if (!user) {
                    return;
                } else {
                    e.preventDefault();
                }
            });
        }
    }, [dispatch, navigation, user])

    console.log(sorted)

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
                <StatusBar backgroundColor='#9B7ABF' barStyle='light-content' />
                {
                    !formatted_address || !city ? <CircleLoader /> : <View style={styles.container}>
                        <View style={styles.headerContainer}>
                            <View style={styles.name}>
                                <Text style={[styles.welcomeName, { color: '#000' }]}>Hey,</Text>
                                <Text style={[styles.welcomeName, { marginLeft: 5, color: '#9B7ABF' }]}>{user && user.name}!</Text>
                            </View>
                            {/* <TouchableOpacity>
                                <IonIcons name='notifications-outline' color='#9B7ABF' size={25} />
                            </TouchableOpacity> */}
                        </View>
                        <View style={styles.location}>
                            <Entypo name='location' color='#9B7ABF' size={20} />
                            <Text style={styles.cityName}>{city}</Text>
                        </View>
                        <Text style={styles.locationName}>{formatted_address}</Text>
                        <View style={styles.searchSection}>
                            <TextInput
                                style={styles.Input}
                                placeholder='Search for service for ex. men, women, nails'
                                placeholderTextColor='#626262'
                                value={searchInput}
                                autoCapitalize='none'
                                onChangeText={(text) => setSearchInput(text)}
                            />
                            {
                                searchInput ? <TouchableOpacity onPress={() => navigation.navigate('SearchSaloons', {
                                    servicetype: searchInput,
                                    servicename: searchInput
                                })} style={styles.searchIcon}>
                                    <IonIcons name='search-outline' color='#000' size={20} />
                                </TouchableOpacity> : null
                            }
                        </View>
                        <View style={styles.HeadLine}>
                            <Text style={styles.HeadlineText}>What Would you like to do</Text>
                            <Text style={[styles.HeadlineText, { color: '#9B7ABF', marginLeft: 4 }]}>Today?</Text>
                        </View>
                        <View style={[styles.HeadLine, styles.containers, { justifyContent: 'space-between', marginVertical: 15 }]}>
                            {
                                services.map((i, index) => {
                                    return (
                                        <View style={[styles.item, { marginBottom: 15, alignItems: 'center' }]} key={index}>
                                            {
                                                i.title === 'Explore' ? <TouchableOpacity style={i.title === 'Explore' ? styles.service : styles.services}>
                                                    <Image style={{ resizeMode: 'contain', width: 60, height: 60, borderRadius: 50 }} source={i.img} />
                                                </TouchableOpacity> : <TouchableOpacity onPress={() => navigation.navigate('Salons', {
                                                    Api: i.api
                                                })} style={i.title === 'Explore' ? styles.service : styles.services}>
                                                    <Image style={{ resizeMode: 'contain', width: 60, height: 60, borderRadius: 50 }} source={i.img} />
                                                </TouchableOpacity>
                                            }
                                            <Text style={{ color: i.title === 'Explore' ? '#FFFF' : '#000', alignSelf: 'center', marginTop: 5, fontSize: 12, fontFamily: 'Montserrat-Medium' }}>{i.title}</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                            <Text style={[styles.HeadlineText, { color: '#9B7ABF' }]}>Explore Salons</Text>
                            <Text style={[styles.HeadlineText, { marginLeft: 4 }]}>near you</Text>
                        </View>
                        <View>
                            {
                                sorted && sorted.length > 0 ? sorted.map((service) => {
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
                                }) : <Text style={{ color: '#000' }}>No Data Found!</Text>
                            }
                        </View>
                        {/* <View style={[styles.HeadLine, styles.containers, { justifyContent: 'space-between', marginVertical: 15 }]}>
                            {
                                servicesLine.map((i, index) => {
                                    return (
                                        <View style={styles.item} key={index}>
                                            <View>
                                                {
                                                    i.title === 'Explore' ? <TouchableOpacity style={i.title === 'Explore' ? styles.service : styles.services}>
                                                        <Image style={{ resizeMode: 'contain', width: '100%' }} source={i.img} />
                                                    </TouchableOpacity> : <TouchableOpacity onPress={() => navigation.navigate('Saloons', {
                                                        Api: i.api
                                                    })} style={i.title === 'Explore' ? styles.service : styles.services}>
                                                        <Image style={{ resizeMode: 'contain', width: '100%' }} source={i.img} />
                                                    </TouchableOpacity>
                                                }
                                                <Text style={{ color: i.title === 'Explore' ? '#FFFFF' : '#000', alignSelf: 'center', marginTop: 5, fontSize: 12, fontFamily: 'Montserrat-Medium' }}>{i.title}</Text>
                                            </View>
                                        </View>
                                    )
                                })
                            }
                        </View> */}
                    </View>
                }
            </ScrollView>
            <BottomNavigation />
        </View>
    )
}


const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    container: {
        marginHorizontal: 20,
        marginVertical: 20
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    name: {
        flexDirection: 'row'
    },
    welcomeName: {
        fontSize: 20,
        fontFamily: 'Montserrat-SemiBold',
    },
    location: {
        marginTop: 14,
        flexDirection: 'row',
        alignItems: 'center'
    },
    cityName: {
        fontSize: 14,
        marginLeft: 8,
        fontFamily: 'Montserrat-Medium',
        color: '#232323',
    },
    locationName: {
        color: '#232323',
        fontFamily: 'Montserrat-Medium',
        marginTop: 10,
        fontSize: 12
    },
    Input: {
        backgroundColor: 'white',
        fontFamily: 'Montserrat-Medium',
        marginVertical: 20,
        fontSize: 14,
        height: 45,
        width: '100%',
        borderWidth: 1,
        borderColor: '#828282',
        borderRadius: 5,
        paddingHorizontal: 15,
        color: '#000',
        position: 'relative'
    },
    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchIcon: {
        position: 'absolute',
        right: 20,
    },
    HeadLine: {
        flexDirection: 'row'
    },
    HeadlineText: {
        color: '#000',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16
    },
    services: {
        width: 70,
        height: 70,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#9B7ABF',
        borderRadius: 50,
        padding: 1
    },
    service: {
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 1
    },
    containers: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        // alignItems: '', // if you want to fill rows left to right
    },
    item: {
        width: '23%', // is 50% of container width
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

export default Home

{/* <View style={{ borderRadius: 100 }}>
    <List.Accordion
        title="See More"
        theme={{ colors: { background: 'white' } }}
        right={() => (
            <Entypo style={[styles.searchIcon, { top: -10, right: 125 }]} name='chevron-down' color='#000' size={18} />
        )}
        titleStyle={{ color: '#2B2B2B', fontFamily: 'Montserrat-Medium', alignSelf: 'center', fontSize: 12 }}

        style={{ padding: 0, margin: 0, borderWidth: 1, borderColor: '#E3E3E3', borderRadius: 50 }}
    >
        <View style={[styles.HeadLine, { justifyContent: 'space-between', marginVertical: 15 }]}>
            {
                servicesLine.map((i, index) => {
                    return (
                        <View key={index}>
                            <TouchableOpacity onPress={() => navigation.navigate('Saloons', {
                                Api: i.api
                            })} style={styles.services}>
                                <Image style={{ resizeMode: 'contain' }} source={i.img} />
                            </TouchableOpacity>
                            <Text style={{ color: '#000', alignSelf: 'center', marginTop: 5, fontSize: 12, fontFamily: 'Montserrat-Medium' }}>{i.title}</Text>
                        </View>
                    )
                })
            }
        </View>
    </List.Accordion>
</View> */}