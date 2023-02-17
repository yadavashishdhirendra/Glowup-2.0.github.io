import { View, Text, ScrollView, Image, StyleSheet, StatusBar, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import OTPTextInput from 'react-native-otp-textinput'
import { useDispatch, useSelector } from 'react-redux'
import { LoadUser, VerifyLoginUser, VerifyRegisterUser } from '../actions/userActions'
import { Dialog, ALERT_TYPE } from 'react-native-alert-notification'

const Verify = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const { hash: encrypt } = useSelector((state) => state.auth)
    const { hash: loginEncrypt } = useSelector((state) => state.login)
    const { message, error: LoginVerifyError } = useSelector((state) => state.loginVerify)
    const { error, isRegister, loading } = useSelector((state) => state.authVerify)
    const { phone, name, login } = route.params;
    console.log(phone)
    const [otp, setOtp] = useState('')
    const [hash, setHash] = useState('')
    const handleRegisterVerification = async () => {
        await dispatch(VerifyRegisterUser(name, phone, hash, otp))
        dispatch(LoadUser())
    }

    const handleLoginVerification = () => {
        dispatch(VerifyLoginUser(phone, hash, otp))
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
        if (LoginVerifyError) {
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: LoginVerifyError,
                button: 'close'
            });
            dispatch({
                type: "ClearError"
            })
        }
        if (message) {
            navigation.navigate('Home')
            setHash('')
        }
        if (isRegister) {
            Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Success',
                textBody: 'Register Successfully',
                button: 'close'
            })
            navigation.navigate('Home')
            setHash('')
        }
        if (encrypt) {
            setHash(encrypt)
        }
        if (loginEncrypt) {
            setHash(loginEncrypt)
        }
    }, [dispatch, error, encrypt, isRegister, loginEncrypt, message, LoginVerifyError])

    return (
        <ScrollView keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false} contentContainerStyle={{ flex: 1, backgroundColor: 'white', justifyContent: 'center' }}>
            <StatusBar backgroundColor='#9B7ABF' barStyle='light-content' />
            <View style={styles.container}>
                <Image style={styles.HeaderLogo} source={require('../assets/Image/Glowup.png')} />
                <View style={styles.HeaderContainer}>
                    <Text style={styles.SubHeadlines}>Schedule</Text>
                    <Text style={[styles.SubHeadlines, { color: '#D52976' }]}>Beauty</Text>
                    <Text style={styles.SubHeadlines}>Appointments</Text>
                </View>
                <View style={styles.Verify}>
                    <Text style={styles.VerifyText}>Enter verification code</Text>
                    <Text style={[styles.VerifyText, { fontFamily: 'Montserrat-Regular', fontSize: 14 }]}>We’ve sent you a 4-digit verification code on</Text>
                    <View>
                        <Text style={styles.UserPhone}>+91 {phone}</Text>
                    </View>
                    <View style={styles.OTP}>
                        <OTPTextInput
                            textInputStyle={[styles.roundedTextInput, { borderRadius: 5 }]}
                            tintColor="#9B7ABF"
                            offTintColor='#F4D9E5'
                            handleTextChange={(text) => setOtp(text)}
                        />
                    </View>
                    {
                        loading ? <TouchableOpacity disabled={true} style={styles.ButtonContainer}>
                            <Text style={styles.ButtonText}>Please Wait..</Text>
                        </TouchableOpacity> : login ? <TouchableOpacity disabled={!otp ? true : false} onPress={handleLoginVerification} style={styles.ButtonContainer}>
                            <Text style={styles.ButtonText}>Verify</Text>
                        </TouchableOpacity> : <TouchableOpacity disabled={!otp ? true : false} onPress={handleRegisterVerification} style={styles.ButtonContainer}>
                            <Text style={styles.ButtonText}>Verify</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    HeaderLogo: {
        width: "100%",
        resizeMode: 'contain'
    },
    HeaderContainer: {
        flexDirection: "row",
        marginTop: 6,
        marginBottom: 15,
        justifyContent: 'center'
    },
    SubHeadlines: {
        marginLeft: 5,
        fontSize: 14,
        fontFamily: 'Montserrat-SemiBold',
        color: '#000'
    },
    container: {
        marginHorizontal: 20
    },
    Verify: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    VerifyText: {
        fontSize: 20,
        fontFamily: 'Montserrat-Medium',
        color: '#000',
        marginVertical: 5
    },
    UserPhone: {
        fontSize: 18,
        color: '#2B2B2B',
        marginVertical: 10,
        fontFamily: 'Montserrat-Medium',
    },
    roundedTextInput: {
        borderRadius: 10,
        borderWidth: 1,
        borderBottomWidth: 1
    },
    OTP: {
        marginVertical: 12
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
    }
})

export default Verify