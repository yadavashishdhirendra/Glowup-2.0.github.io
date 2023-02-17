import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { RadioButton } from 'react-native-paper';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSaloonService, getServiceByCategory, getServiceByCategorytype } from '../actions/servicesAction';
import LinearGradient from 'react-native-linear-gradient';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { Divider } from 'react-native-paper'
import CircleLoader from '../components/Loader/CircleLoader';
import Loader from '../components/Loader/Loader';
import Entypo from 'react-native-vector-icons/Entypo'

const ChooseService = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const { service, error, } = useSelector((state) => state.allService);
    const { filter, loading } = useSelector((state) => state.chooseService);
    const { filterServices, loading: subLoading } = useSelector((state) => state.getAllServices)
    console.log("GOT IT", filterServices)
    console.log(filter)
    const { id, shopname, mobileno } = route.params;

    console.log("SHOPNAME:", shopname, mobileno)

    let data = [];

    const [show, setShow] = useState(false);

    const [servicename, setServiceName] = useState('')

    service && service.forEach((x) => {
        if (data.includes(x.servicetype)) {
            return null
        }
        else {
            data.push(x.servicetype)
        }
    })

    let subCategory = [];

    console.log("Servicename", servicename)

    filter && filter.forEach((i) => {
        if (subCategory.includes(i.category)) {
            return null
        }
        else {
            subCategory.push(i.category)
        }
    })

    console.log(subCategory)

    console.log(data[0])

    const [servicetype, setServiceType] = useState("");
    const [category, setCategory] = useState("")

    console.log(servicetype, category)

    // ACCORDION CODE
    const [accordion, setAccordion] = useState(-1)

    const toggleAccordion = (index, category) => {
        console.log("RETURNING THROUGH A FUNCTION:", category, servicetype)
        if (index === accordion) {
            setAccordion(-1)
            return
        }
        setServiceName("")
        setAccordion(index)
        if (servicetype || category) {
            dispatch(getServiceByCategorytype(id, servicetype, category))
        }
    }
    // ACCORDION CODE ENDS HERE

    let othIndex;
    if (data.length > 0) {
        othIndex = data[0]
    }

    console.log("INDEX VALUE", othIndex)

    // {
    //     setServiceType(value)
    //     setServiceName("")
    //     setCategory("")
    //     setAccordion(-1)
    // }

    const onchange = (value) => {
        // console.log("VALUE", value)
        if (!value) {
            // console.log("NOTHING HAPPENS!")
            setServiceType(othIndex)
        }
        else {
            setServiceType(value)
        }
        setAccordion(-1)
        setServiceName("")
    }

    useEffect(() => {
        if (servicetype) {
            dispatch(getServiceByCategory(id, servicetype))
        }
        if (id) {
            dispatch(getSaloonService(id))
        }
        if (category.length > 0) {
            dispatch(getServiceByCategorytype(id, servicetype, category))
        }
    }, [dispatch, id, servicetype, category])

    useEffect(() => {
        if (othIndex) {
            onchange()
        }
    }, [othIndex])

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar backgroundColor='#C396D2' barStyle='light-content' />
            <LinearGradient style={{ paddingTop: 35 }} colors={['#C396D2', '#A27FC2']}>
                <View style={{ marginVertical: 30 }}>
                    <RadioButton.Group onValueChange={value => onchange(value)} value={servicetype}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row' }}>
                            {
                                data && data.length > 0 ?
                                    data.map((x, i) => {
                                        return (
                                            <View style={{ marginHorizontal: 10 }} key={i}>
                                                <RadioButton.Item status={
                                                    x === servicetype ? 'checked' : 'unchecked'
                                                } label={x} labelStyle={{ fontFamily: 'Montserrat-SemiBold', fontSize: 13, color: '#725593' }} color='#A27FC2' style={{ padding: 0, margin: 0, backgroundColor: '#F8E9F7', borderRadius: 50, paddingHorizontal: 20, height: 43 }} uncheckedColor='white' value={x} />
                                            </View>
                                        )
                                    })
                                    : <Text style={{ color: 'white', fontFamily: 'Montserrat-SemiBold', fontSize: 13, marginHorizontal: 20 }}>No Category To Show...</Text>
                            }
                        </ScrollView>
                    </RadioButton.Group>
                </View>
            </LinearGradient>
            <ScrollView>
                <View style={{ marginVertical: 10, marginHorizontal: 12 }}>
                    {/* {
                        servicetype ? <SelectDropdown
                            data={subCategory}
                            buttonStyle={{ backgroundColor: '#ffff', borderColor: '#BABABA', borderWidth: 1, width: "100%", marginVertical: 10, borderRadius: 5, height: 40 }}
                            buttonTextStyle={{ fontFamily: 'Montserrat-SemiBold', color: '#5B5B5B', fontSize: 13, textAlign: 'left' }}
                            onSelect={(selectedItem, index) => {
                                setCategory(selectedItem)
                                console.log(selectedItem)
                            }}
                            renderDropdownIcon={isOpened => {
                                return <FontAwesome5Icon style={{ marginRight: 8 }} name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#000'} size={18} />;
                            }}
                            rowStyle={styles.dropdown1RowStyle}
                            dropdownStyle={styles.dropdown1DropdownStyle}
                            dropdownIconPosition={'right'}
                            defaultButtonText='Choose Category'
                            rowTextStyle={styles.dropdown1RowTxtStyle}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                return item
                            }}
                        /> : null
                    } */}
                    {/* {
                        loading ? <CircleLoader /> : <View>
                            {
                                category ? <View style={{ marginVertical: 10 }}>
                                    {
                                        filterServices && filterServices.length > 0 ? filterServices.map((y) => {
                                            return (
                                                <View key={y._id}>
                                                    <RadioButton.Group onValueChange={newValue => setServiceName(newValue)} value={servicename}>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                <RadioButton value={y._id} color='#A27FC2' />
                                                                <Text style={{ color: '#2B2B2B', fontSize: 14, fontFamily: 'Montserrat-Medium', textTransform: 'capitalize' }}>{y.servicename}</Text>
                                                                {
                                                                    y.subcategory ? <Text style={{ color: '#725593', fontFamily: 'Montserrat-Medium', marginLeft: 8, backgroundColor: '#EDE7F2', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 50, position: 'relative', top: -7, fontSize: 12 }}>{y.subcategory}</Text> : null
                                                                }
                                                            </View>
                                                        </View>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                            <Text style={{ color: '#858585', fontFamily: 'Montserrat-Medium', fontSize: 12, marginBottom: 10, marginLeft: 35 }}>{y.hour} min</Text>
                                                            <Text style={{ color: '#4D4D4D', fontFamily: 'Montserrat-SemiBold', fontSize: 13, marginBottom: 10 }}>₹{y.price}</Text>
                                                        </View>
                                                    </RadioButton.Group>
                                                    <Divider style={{ height: 1 }} />
                                                </View>
                                            )
                                        }) : null
                                    }
                                </View> : null
                            }
                        </View>
                    } */}
                </View>
                {/* <CircleLoader /> */}
                {/* ADDING NEW CODE */}
                {
                    loading ? <ActivityIndicator size='large' color='#C396D2' /> : <View>
                        {
                            servicetype ? <View style={styles.accordionContainer}>
                                <View>
                                    <View style={styles.accordionFaq}>
                                        {
                                            subCategory && subCategory.length > 0 ? subCategory.map((item, index) => {
                                                return (
                                                    <View key={index}>
                                                        <View>
                                                            <TouchableOpacity onPress={() => toggleAccordion(index, item)} style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5, backgroundColor: '#F7F7F7', paddingVertical: 8, paddingHorizontal: 15, alignItems: 'center', borderRadius: 5 }}>
                                                                <View style={styles.accordionFaqHeading}>
                                                                    <Text style={accordion === index ? styles.active : styles.noActive}>{item}</Text>
                                                                </View>
                                                                <View>
                                                                    {
                                                                        accordion === index ? <View>
                                                                            <Entypo style={styles.verticle} name='chevron-up' size={16} />
                                                                        </View> : <View>
                                                                            <Entypo style={styles.verticle} name='chevron-down' size={16} />
                                                                        </View>
                                                                    }
                                                                </View>
                                                            </TouchableOpacity>
                                                        </View>
                                                        <View>
                                                            <View style={accordion === index ? styles.active : styles.InActive}>
                                                                {
                                                                    subLoading ? <ActivityIndicator size="large" style={{ marginVertical: 10 }} color="#C396D2" /> : <View>
                                                                        {
                                                                            filterServices && filterServices.length > 0 ? filterServices.map((service) => {
                                                                                return (
                                                                                    <View style={{ paddingHorizontal: 10, }} key={service._id}>
                                                                                        <RadioButton.Group onValueChange={newValue => {
                                                                                            setServiceName(newValue)
                                                                                        }} value={servicename}>
                                                                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                                                    <RadioButton value={service._id} color='#2B2B2B' />
                                                                                                    <Text style={{ color: '#2B2B2B', fontSize: 13, fontFamily: 'Montserrat-Regular', textTransform: 'capitalize', flex: 1, flexWrap: 'wrap' }}>{service.servicename}</Text>
                                                                                                </View>
                                                                                            </View>
                                                                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                                                    <Text style={{ color: '#858585', fontFamily: 'Montserrat-Medium', fontSize: 12, marginBottom: 10, marginLeft: 35 }}>{service.hour} min</Text>
                                                                                                    <Text style={{ color: '#858585', fontFamily: 'Montserrat-Medium', fontSize: 12, marginBottom: 10, marginLeft: 10 }}>{service.about ? service.about.split(",")[1] : null}</Text>
                                                                                                </View>
                                                                                                <Text style={{ color: '#4D4D4D', fontFamily: 'Montserrat-SemiBold', fontSize: 13, marginBottom: 10 }}>{service.price === "0" ? "Custom" : "₹" + service.price}</Text>
                                                                                            </View>
                                                                                        </RadioButton.Group>
                                                                                    </View>
                                                                                )
                                                                            }) : null
                                                                        }
                                                                    </View>
                                                                }
                                                            </View>
                                                        </View>
                                                    </View>
                                                )
                                            }) : null
                                        }
                                    </View>
                                </View>
                            </View> : null
                        }
                    </View>
                }
                {/* ADDING NEW CODE */}
            </ScrollView>
            {
                servicename && servicetype ? <TouchableOpacity onPress={() => navigation.navigate('Stylist', {
                    id: servicename,
                    shopname: shopname,
                    mobileno: mobileno
                })} style={{ backgroundColor: '#9B7ABF', paddingVertical: 15 }}>
                    <Text style={{ color: '#FFFF', alignSelf: 'center', fontFamily: 'Montserrat-Bold' }}>CONTINUE</Text>
                </TouchableOpacity> : null
            }
        </View>
    )
}

var styles = StyleSheet.create({
    dropdown1RowStyle: { backgroundColor: '#FFFFF', borderBottomColor: '#F7F7F7' },
    dropdown1DropdownStyle: { backgroundColor: '#FFFF', borderRadius: 5, width: "60%" },
    dropdown1RowTxtStyle: { color: '#444', fontSize: 13, fontFamily: 'Montserrat-SemiBold' },
    noActive: {
        color: '#2B2B2B'
    },
    verticle: {
        color: '#2B2B2B'
    },
    active: {
        color: '#2B2B2B',
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        paddingVertical: 8
    },
    noActive: {
        color: '#2B2B2B',
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        paddingVertical: 8
    },
    InActive: {
        display: 'none',
    },
    accordionContainer: {
        paddingHorizontal: 15
    }
});

export default ChooseService