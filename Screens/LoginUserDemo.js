import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { LoginUserDemos } from '../actions/userActions'
import { Dialog, ALERT_TYPE } from 'react-native-alert-notification'
import CircleLoader from '../components/Loader/CircleLoader'

const LoginUserDemo = ({ navigation }) => {
    const { message, error, loading } = useSelector((state) => state.loginDemo)
    const { user } = useSelector((state) => state.LoadUser)
    const dispatch = useDispatch();
    const [phone, setPhone] = useState('')
    const [otp, setOtp] = useState('')
    const handleLoginDemo = () => {
        dispatch(LoginUserDemos(phone, otp))
    }

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
        if (message) {
            Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Success',
                textBody: message,
                button: 'close'
            });
            navigation.navigate('Home')
        }
    }, [dispatch, error, message])

    return (
        <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center' }}>
            <StatusBar backgroundColor='#9B7ABF' barStyle='light-content' />
            {
                loading ? <CircleLoader /> : <ScrollView keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false} contentContainerStyle={{ flex: 1, backgroundColor: 'white', justifyContent: 'center' }}>
                    <View style={styles.container}>
                        <Image style={styles.HeaderLogo} source={require('../assets/Image/Glowup.png')} />
                        <View style={styles.HeaderContainer}>
                            <Text style={styles.SubHeadlines}>Schedule.</Text>
                            <Text style={[styles.SubHeadlines, { color: '#D52976' }]}>Beauty.</Text>
                            <Text style={styles.SubHeadlines}>Appointments.</Text>
                        </View>
                        <View>
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
                                value={phone}
                                onChangeText={(text) => setPhone(text)}
                                keyboardType='phone-pad'
                                mode="outlined"
                                label="Phone Number" />
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
                                value={otp}
                                onChangeText={(text) => setOtp(text)}
                                keyboardType='phone-pad'
                                mode="outlined"
                                label="Enter any Random Number" />
                            {
                                phone === '1234567898' ? <TouchableOpacity disabled={!phone ? true : false} onPress={handleLoginDemo} style={styles.ButtonContainer}>
                                    <Text style={styles.ButtonText}>Login</Text>
                                </TouchableOpacity> : null
                            }
                        </View>
                    </View>
                </ScrollView>
            }
            {
                loading ? null : <TouchableOpacity style={{ alignSelf: 'center', marginBottom: 15 }} onPress={() => navigation.navigate('Login')}>
                    <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 16, color: '#9B7ABF' }}>Login as User</Text>
                </TouchableOpacity>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    HeaderLogo: {
        width: "100%",
        resizeMode: 'contain'
    },
    SubHeadlines: {
        marginLeft: 5,
        fontSize: 14,
        fontFamily: 'Montserrat-SemiBold',
        color: '#000'
    },
    HeaderContainer: {
        flexDirection: "row",
        marginTop: 6,
        marginBottom: 15,
        justifyContent: 'center'
    },
    Input: {
        backgroundColor: 'white',
        fontFamily: 'Montserrat-Medium',
        marginVertical: 10,
        fontSize: 14,
        color: '#2B2B2B'
    },
    container: {
        marginHorizontal: 20,
        justifyContent: 'center'
    },
    ButtonContainer: {
        marginTop: 15,
        backgroundColor: '#9B7ABF',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 5,
        alignSelf: 'center'
    },
    ButtonText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 14,
        color: 'white'
    },
    redirection: {
        flexDirection: 'row',
        marginTop: 5
    },
    redirectionText: {
        marginLeft: 5
    }
})
export default LoginUserDemo