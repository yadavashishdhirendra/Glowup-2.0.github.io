import { useIsFocused } from '@react-navigation/native'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MaterialTabs from 'react-native-material-tabs'
import { useDispatch, useSelector } from 'react-redux'
import { getReviewSaloon, getSaloonService, getServiceDetails, likePost, multipleHours, newReviewSaloon, newUIService } from '../actions/servicesAction'
import { LoadUser } from '../actions/userActions'
import Loader from '../components/Loader/Loader'
import Entypo from 'react-native-vector-icons/Entypo'
import { Dialog, ALERT_TYPE } from 'react-native-alert-notification'
import Modal from "react-native-modal";
import AntDesign from 'react-native-vector-icons/AntDesign'
import { TextInput } from 'react-native-paper'
import CircleLoader from '../components/Loader/CircleLoader';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const SaloonDetails = ({ route, navigation }) => {
    const WIDTH = Dimensions.get('window').width;
    const HEIGHT = Dimensions.get('window').height;
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const { saloon, loading } = useSelector((state) => state.serviceDetails)
    const { message, loading: likeLoading } = useSelector((state) => state.likeUnlike)
    const { reviews, error: reviewError, loading: reviewLoading } = useSelector((state) => state.getReview)
    const { error, loading: ratingLoading } = useSelector((state) => state.review);
    const { user } = useSelector((state) => state.LoadUser);
    const { data, error: dataerror, loading: serviceLoading } = useSelector((state) => state.uiService);
    const [selectedTab, setSelectedTab] = useState(null)
    const { ids, like } = route.params;
    const [id, setId] = useState('')

    const [liked, setLiked] = useState(false)
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('')
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5])
    const [isModalVisible, setModalVisible] = useState(false);
    const [accordions, setAccordions] = useState(-1)
    const [serviceId, setServiceId] = useState()
    const [idList, setIdList] = useState([])
    const [itemHour, setItemHour] = useState([])
    const [textShown, setTextShown] = useState(-1);


    const toggleNumberofLines = (index) => {
        setTextShown(textShown === index ? -1 : index)
    }

    useEffect(() => {
        if (isFocused) {
            dispatch(newUIService(id))
            dispatch(getServiceDetails(id))
            dispatch(LoadUser())
            dispatch(getSaloonService(id))
            dispatch(getReviewSaloon(id))
        }
        if (message) {
            Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Success',
                textBody: message,
                button: 'close'
            });
            dispatch({
                type: "clearMessage"
            })
        }
        if (ids) {
            setId(ids)
        }
    }, [dispatch, ids, id, message, isFocused])

    const handleLiked = async () => {
        setLiked(!liked)
        await dispatch(likePost(id))
        dispatch(getServiceDetails(id))
    }

    const handleReview = async () => {
        await dispatch(newReviewSaloon(id, rating, comment))
        await dispatch(getReviewSaloon(id))
        dispatch(getServiceDetails(id))
        setModalVisible(!isModalVisible)
        setComment('')
        setRating(0)
    }


    useEffect(() => {
        like.forEach(item => {
            if (item === user._id) {
                setLiked(true)
            }
            else {
                setLiked(false)
            }
        })
    }, [like, user._id])



    const starImgFilled = 'https://github.com/tranhonghan/images/blob/main/star_filled.png?raw=true'
    const starImgCorner = 'https://github.com/tranhonghan/images/blob/main/star_corner.png?raw=true'


    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };



    const CustomRatingBar = () => {
        return (
            <View style={styles.CustomRatingBarStyle}>
                {
                    maxRating.map((item, key) => {
                        return (
                            <TouchableOpacity
                                activeOpacity={0.7}
                                key={item}
                                onPress={() => setRating(item)}
                            >
                                <Image style={styles.starImgStyle} source={
                                    item <= rating
                                        ? { uri: starImgFilled }
                                        : { uri: starImgCorner }
                                } />
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }




    // ACCORDION CODE

    const handleSubCategory = (index) => {
        if (index === accordions) {
            setAccordions(-1)
            return
        }
        setAccordions(index)
    }

    const handleService = (id, service) => {
        if (itemHour.includes(service._id) || idList.includes(id)) {
            return null
        }
        else {
            setIdList(current => [...current, id])
            setItemHour(c => [...c, service])
        }
        setServiceId(id)
    }

    console.log(idList, "IDLIST")

    const removeItem = (i) => {
        setIdList(idList.filter(item => item !== i))
        setItemHour(itemHour.filter(ite => ite._id !== i))
    }


    console.log(itemHour, "hour")

    let rupees = 0;
    itemHour && itemHour.forEach((i) => {
        rupees += parseInt(i.price)
    })


    useEffect(() => {
        if (loading || likeLoading || serviceLoading) {
            setServiceId()
        }
        if (isFocused) {
            setIdList([])
            setItemHour([])
        }
    }, [loading, likeLoading, serviceLoading, isFocused])

    let lengthy = idList.length;

    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <Modal onBackdropPress={toggleModal} onBackButtonPress={toggleModal} style={styles.view} swipeDirection={['up', 'left', 'right', 'down']} isVisible={isModalVisible}>
                <View style={{ backgroundColor: 'white', paddingVertical: 30, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <CustomRatingBar />
                        <View style={{ marginHorizontal: 15, marginVertical: 10 }}>
                            <TextInput theme={{
                                roundness: 5,
                                colors: {
                                    primary: "#CFCFCF",
                                },
                                fonts: {
                                    regular: {
                                        fontFamily: 'Montserrat-Medium'
                                    }
                                }
                            }}
                                outlineColor='#CFCFCF'
                                style={styles.Input}
                                multiline={true}
                                value={comment}
                                onChangeText={(text) => setComment(text)}
                                mode="outlined"
                                label="Comment" />
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                {
                                    ratingLoading ? <CircleLoader /> : <TouchableOpacity onPress={() => handleReview()} style={{ backgroundColor: '#9B7ABF', marginTop: 10, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10 }}>
                                        <Text style={{ color: 'white', fontFamily: 'Montserrat-Medium', fontSize: 14, alignSelf: 'center' }}>Submit</Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
            {
                loading || likeLoading ? <Loader /> : <View style={{ flex: 1, backgroundColor: '#fff3f8', }}>
                    <View style={{ backgroundColor: '#fff3f8', paddingTop: 2 }}>
                        <View style={{ width: 290, alignSelf: 'flex-end', position: 'relative', top: 0 }}>
                            <MaterialTabs
                                allowFontScaling={true}
                                items={['About', 'Photos', 'Reviews']}
                                selectedIndex={selectedTab}
                                onChange={setSelectedTab}
                                barColor='#fff3f8'
                                indicatorColor={selectedTab === null ? '#fff3f8' : '#725593'}
                                inactiveTextColor='#725593'
                                activeTextColor='#725593'
                                uppercase={false}
                                textStyle={{ fontSize: 14, fontFamily: 'Montserrat-SemiBold' }}
                            />
                        </View>
                    </View>
                    <ScrollView showsHorizontalScrollIndicator={false}>
                        {
                            selectedTab === null ? <View>
                                <View style={styles.mainwrapper}>
                                    <View style={styles.WrapperContainer}>
                                        <View>
                                            <Text style={styles.shopname}>{saloon && saloon.shopname}</Text>
                                        </View>
                                        <View>
                                            <TouchableOpacity onPress={() => handleLiked()}>
                                                <Entypo name={`${liked ? 'heart' : 'heart-outlined'}`} size={28} color={`${liked ? '#CF0A0A' : 'black'}`} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Entypo name='star' color='#FAEA48' size={24} />
                                        <Text style={{ color: '#232323', marginHorizontal: 5, fontFamily: 'Montserrat-SemiBold', fontSize: 14 }}>{saloon && saloon.ratings}</Text>
                                        <Text style={{ color: '#232323', fontFamily: 'Montserrat-Medium', fontSize: 14 }}>({reviews && reviews.length} + Reviews)</Text>
                                    </View>
                                    <Text style={{ color: '#2B2B2B', fontFamily: 'Montserrat-Regular', fontSize: 14, lineHeight: 20, marginTop: 10 }}>{saloon && saloon.address} {saloon && saloon.addresssec} {saloon && saloon.city}, {saloon && saloon.state} {saloon && saloon.pincode}</Text>
                                </View>
                                {
                                    serviceLoading ? <ActivityIndicator style={{ marginTop: 20 }} size='large' color='#C396D2' /> : <View style={{ paddingHorizontal: 15, paddingVertical: 15, backgroundColor: '#FFFF', borderRadius: 10, marginHorizontal: 15, marginVertical: 15 }}>
                                        {/* New code */}
                                        <View style={{ display: 'flex', alignSelf: 'center' }}>
                                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                                                <Image resizeMode='cover' source={require('../assets/Image/side01.png')} />
                                                <Text style={{ color: '#2B2B2B', fontFamily: 'Montserrat-Medium', fontSize: 16, letterSpacing: 2 }}>&nbsp;&nbsp;SERVICES&nbsp;&nbsp;</Text>
                                                <Image resizeMode='cover' source={require('../assets/Image/side02.png')} />
                                            </View>
                                        </View>
                                        {
                                            data && data.map((i, key) => {
                                                return (
                                                    <View key={key}>
                                                        <Text style={styles.active}>{i._id} ({i.services.length})</Text>
                                                        <View>
                                                            {
                                                                i.services.map((j, index) => {
                                                                    return (
                                                                        <View key={j.subCategory} style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
                                                                            <TouchableOpacity onPress={() => handleSubCategory(j.subCategory)} style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                                                <View style={{ flex: 4 }}>
                                                                                    <Text style={accordions === j.subCategory ? styles.actives : styles.noActives}>{j.subCategory} ({j.items.length})</Text>
                                                                                </View>
                                                                                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', display: 'flex' }}>
                                                                                    {
                                                                                        accordions === j.subCategory ? <View>
                                                                                            <Entypo style={styles.verticle} name='chevron-up' size={22} />
                                                                                        </View> : <View>
                                                                                            <Entypo style={styles.verticle} name='chevron-down' size={22} />
                                                                                        </View>
                                                                                    }
                                                                                </View>
                                                                            </TouchableOpacity>
                                                                            <View style={accordions === j.subCategory ? styles.activess : styles.InActives}>
                                                                                {
                                                                                    j.items.map((k, index) => {
                                                                                        return (
                                                                                            <View key={k._id} style={{ borderBottomColor: '#ECECEC', borderBottomWidth: 1, marginBottom: 10 }}>
                                                                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                                                                    <View style={{ flex: 3 }}>
                                                                                                        <View style={{ marginBottom: 10 }}>
                                                                                                            <Text style={k.description ? styles.newService : styles.oldService}>{k.servicename}</Text>
                                                                                                            {
                                                                                                                k.description ? <Text numberOfLines={textShown === k._id ? undefined : 1} style={{ color: '#2B2B2B' }}>{k.description}</Text> : null
                                                                                                            }
                                                                                                            {
                                                                                                                k.description ? <TouchableOpacity onPress={() => toggleNumberofLines(k._id)}>
                                                                                                                    <Text>{textShown === k._id ? "Read Less" : "Read More"}</Text>
                                                                                                                </TouchableOpacity> : null
                                                                                                            }
                                                                                                        </View>
                                                                                                        <Text style={{ color: '#292929', marginBottom: 14, fontFamily: 'Montserrat-SemiBold', fontSize: 12 }}>{k.price === "0" ? "Custom" : "₹" + k.price}</Text>
                                                                                                    </View>
                                                                                                    <View style={{ flex: 1 }}>
                                                                                                        <Text style={{ color: '#666666', textAlign: 'center', fontFamily: 'Montserrat-SemiBold', fontSize: 11, marginBottom: 5 }}>{k.hour} min</Text>
                                                                                                        {
                                                                                                            idList && idList ? <View>
                                                                                                                {
                                                                                                                    idList && idList.includes(k._id) ? <TouchableOpacity onPress={() => removeItem(k._id, index)} style={accordions === j.subCategory ? styles.addActive : styles.addInActive}>
                                                                                                                        {/* <Text style={{ color: '#2B2B2B' }}>Added</Text> */}
                                                                                                                        <FontAwesome name='check-square-o' size={16} color={'#2B2B2B'} />
                                                                                                                    </TouchableOpacity> : <TouchableOpacity onPress={() => handleService(k._id, k)} style={accordions === j.subCategory ? styles.addActive : styles.addInActive}>
                                                                                                                        <Text style={{ color: '#725593', fontFamily: 'Montserrat-Medium', fontSize: 12 }}>Add</Text>
                                                                                                                    </TouchableOpacity>
                                                                                                                }
                                                                                                            </View> : null
                                                                                                        }
                                                                                                    </View>
                                                                                                </View>
                                                                                            </View>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </View>
                                                                        </View>
                                                                    )
                                                                })
                                                            }
                                                        </View>
                                                    </View>
                                                )
                                            })
                                        }
                                        {/* New code ends here */}
                                    </View>
                                }
                            </View> : selectedTab === 0 ? <View>
                                {
                                    saloon && <Image style={{ width: WIDTH, height: HEIGHT * 0.35, resizeMode: 'cover' }} source={{ uri: saloon.images[0].url }} />
                                }
                            </View> : selectedTab === 1 ? <View>
                                <View style={styles.imageContainer}>
                                    {
                                        saloon && saloon.images.length > 0 ? saloon.images.map((i, index) => {
                                            return (
                                                <View key={index} style={styles.imageItem}>
                                                    <Image style={{ width: "100%", height: 120, resizeMode: 'cover', borderRadius: 5 }} source={{ uri: i.url }} />
                                                </View>
                                            )
                                        }) : null
                                    }
                                </View>
                            </View> : selectedTab === 2 ? <View>
                                <View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15, paddingTop: 15 }}>
                                        <View>
                                            <Text style={{ fontSize: 18, fontFamily: 'Montserrat-Bold', color: '#725593' }}>Reviews</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Entypo name='star' color='#FAEA48' size={24} />
                                            <Text style={{ color: '#232323', marginHorizontal: 5, fontFamily: 'Montserrat-SemiBold', fontSize: 14 }}>{saloon.ratings}</Text>
                                            <Text style={{ color: '#232323', fontFamily: 'Montserrat-Medium', fontSize: 14 }}>(Reviews {reviews && reviews.length})</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity onPress={toggleModal} style={{ marginVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 12, marginTop: 15 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Entypo name='star' style={{ marginRight: 8 }} color='#FAEA48' size={24} />
                                            <Text style={{ color: '#2B2B2B', alignSelf: 'center', fontFamily: 'Montserrat-SemiBold', }}>Rate This Salon</Text>
                                        </View>
                                        <AntDesign name='arrowright' style={{ marginLeft: 5 }} color='#725593' size={20} />
                                    </TouchableOpacity>

                                    {/* REVIEW CARD */}
                                    <View style={{ marginHorizontal: 15, marginVertical: 10 }}>
                                        {
                                            reviews && reviews.length > 0 ? reviews.map((i) => {
                                                return (
                                                    <View style={{ backgroundColor: '#FFFF', paddingHorizontal: 20, paddingVertical: 15, borderRadius: 5, marginBottom: 8 }} key={i._id}>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                <View style={{ backgroundColor: '#FEE0ED', width: 30, height: 30, borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
                                                                    <Text style={{ color: '#D52976', fontSize: 14, fontFamily: 'Montserrat-Bold' }}>{i.user.name.length > 2 ? i.user.name.slice(0, 1) : i.user.name}</Text>
                                                                </View>
                                                                <Text style={{ color: '#2B2B2B', marginLeft: 10, fontFamily: 'Montserrat-Medium', fontSize: 13 }}>{i.user && i.user.name}</Text>
                                                            </View>
                                                            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', width: 30, height: 30, borderRadius: 100, justifyContent: 'center' }}>
                                                                <Text style={{ color: '#2B2B2B', fontFamily: 'Montserrat-Medium', fontSize: 13 }}>{i.rating}</Text>
                                                                <Entypo name='star' color='#2B2B2B' size={13} />
                                                            </View>
                                                        </View>
                                                        <Text style={{ color: '#2B2B2B', fontFamily: 'Montserrat-Regular', fontSize: 12, marginTop: 10, lineHeight: 20 }}>{i.comment}</Text>
                                                    </View>
                                                )
                                            }) : null
                                        }
                                    </View>
                                    {/* REVIEW CARD */}
                                </View>
                            </View> : null
                        }
                    </ScrollView>
                    {
                        selectedTab !== null ? <View style={{ alignItems: 'center', borderTopColor: '#F0E9F1', borderTopWidth: 1, padding: 7 }}>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => setSelectedTab(null)}>
                                <Entypo name='chevron-small-left' color={'#2B2B2B'} size={22} />
                                <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 16, color: '#2B2B2B' }}>{saloon && saloon.shopname}</Text>
                            </TouchableOpacity>
                        </View> : null
                    }
                </View>
            }
            {
                selectedTab === null ? <View>
                    {
                        lengthy >= 2 ? <View style={{ paddingHorizontal: 15, paddingVertical: 25, backgroundColor: '#F6F6F6' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View>
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 14, color: '#2B2B2B' }}>{lengthy && lengthy} Items</Text>
                                        <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 14, color: '#2B2B2B' }}>&nbsp;&nbsp;₹{rupees && rupees}</Text>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ color: '#5B5B5B', fontFamily: 'Montserrat-Regular', fontSize: 12 }}>From:</Text>
                                        <Text style={{ color: '#5B5B5B', fontFamily: 'Montserrat-Bold', fontSize: 12 }}>&nbsp;{saloon && saloon.shopname}</Text>
                                    </View>
                                </View>
                                <View>
                                    <TouchableOpacity style={{ backgroundColor: '#9B7ABF', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 5 }} onPress={() => navigation.navigate('Stylist', {
                                        id: serviceId,
                                        shopname: saloon && saloon.shopname,
                                        mobileno: saloon && saloon.mobileno,
                                        idList: idList
                                    })}>
                                        <Text style={{ fontFamily: 'Montserrat-Bold', color: 'white' }}>Choose Stylist</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View> : serviceId ? <View style={{ paddingHorizontal: 15, paddingVertical: 25, backgroundColor: '#F6F6F6' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 14, color: '#2B2B2B' }}>{lengthy && lengthy} Items</Text>
                                        <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 14, color: '#2B2B2B' }}>&nbsp;&nbsp;₹{rupees && rupees}</Text>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ color: '#5B5B5B', fontFamily: 'Montserrat-Regular', fontSize: 12 }}>From:</Text>
                                        <Text style={{ color: '#5B5B5B', fontFamily: 'Montserrat-Bold', fontSize: 12 }}>&nbsp;{saloon && saloon.shopname}</Text>
                                    </View>
                                </View>
                                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <TouchableOpacity style={{ backgroundColor: '#9B7ABF', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 5 }} onPress={() => navigation.navigate('Stylist', {
                                        id: serviceId,
                                        shopname: saloon && saloon.shopname,
                                        mobileno: saloon && saloon.mobileno,
                                    }, setServiceId())}>
                                        <Text style={{ fontFamily: 'Montserrat-Bold', color: 'white' }}>Choose Stylist</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View> : null
                    }
                </View> : null
            }
            {/* <View>
                <TouchableOpacity style={{ backgroundColor: '#E169C0' }}>
                    <Text>Menu</Text>
                </TouchableOpacity>
            </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    WrapperContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    mainwrapper: {
        backgroundColor: '#ffff',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        padding: 20,
        borderRadius: 15,
        borderColor: '#F0E9F1',
        borderWidth: 1,
    },
    shopname: {
        fontSize: 18,
        color: '#2B2B2B',
        fontFamily: 'Montserrat-Bold'
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 10
    },
    imageItem: {
        width: "28.33%",
        margin: 8,
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 8 },
        shadowOpacity: 8,
        shadowRadius: 9,
        elevation: 8
    },
    view: {
        justifyContent: 'flex-end',
        margin: 0
    },
    CustomRatingBarStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
    },
    starImgStyle: {
        width: 30,
        height: 30,
        resizeMode: 'cover',
        marginRight: 10
    },
    Input: {
        backgroundColor: 'white',
        fontFamily: 'Montserrat-Medium',
        marginVertical: 10,
        fontSize: 14,
        color: '#2B2B2B'
    },
    active: {
        color: '#725593',
        fontFamily: 'Montserrat-Bold',
        fontSize: 18,
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    // noActive: {
    //     color: '#725593',
    //     fontFamily: 'Montserrat-Bold',
    //     fontSize: 18,
    //     paddingVertical: 8
    // },
    actives: {
        color: '#2B2B2B',
        fontFamily: 'Montserrat-Medium',
        fontSize: 16,
        paddingVertical: 8,
        borderBottomColor: '#ECECEC',
        borderBottomWidth: 1
    },
    activess: {
        color: '#2B2B2B',
        fontFamily: 'Montserrat-Medium',
        fontSize: 16,
        paddingVertical: 8,
    },
    noActives: {
        color: '#2B2B2B',
        fontFamily: 'Montserrat-Medium',
        fontSize: 16,
        paddingVertical: 8,
        borderBottomColor: '#ECECEC',
        borderBottomWidth: 1,
    },
    InActive: {
        display: 'none',
    },
    InActives: {
        display: 'none',
    },
    verticle: {
        color: '#2B2B2B'
    },
    newService: {
        color: '#2B2B2B',
        textTransform: 'capitalize',
        fontSize: 16,
        fontFamily: 'Montserrat-SemiBold',
        marginBottom: 8
    },
    oldService: {
        color: '#2B2B2B',
        textTransform: 'capitalize',
        fontSize: 16,
        fontFamily: 'Montserrat-SemiBold',
        marginBottom: 0
    },
    addActive: {
        alignSelf: 'center',
        backgroundColor: '#FFF5FA',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 5,
        width: 60,
        alignItems: 'center',
        borderColor: '#725593',
        borderWidth: 1
    },
    addInActive: {
        alignSelf: 'center',
        backgroundColor: '#FFF5FA',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 5,
        width: 60,
        alignItems: 'center'
    },
})

export default SaloonDetails
