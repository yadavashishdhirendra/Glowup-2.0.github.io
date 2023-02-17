import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { LoginUser } from '../actions/userActions'
import { Dialog, ALERT_TYPE } from 'react-native-alert-notification'
import { useIsFocused } from '@react-navigation/native'
import CircleLoader from '../components/Loader/CircleLoader'

const Login = ({ navigation }) => {
    const isFocused = useIsFocused();
    const { hash, error, loading } = useSelector((state) => state.login)
    const { user, isAuthenticated, loading: userLoading } = useSelector((state) => state.LoadUser)
    console.log("USER", user)
    const dispatch = useDispatch();
    const [phone, setPhone] = useState('')
    const handleLogin = async () => {
        await dispatch(LoginUser(phone))
    }

    useEffect(() => {
        if (hash) {
            navigation.navigate('Verify', {
                phone: phone,
                login: true,
            })
        }

        if (isAuthenticated) {
            navigation.navigate('Home')
        }

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
    }, [dispatch, hash, error, isAuthenticated])

    return (
        <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center' }}>
            <StatusBar backgroundColor='#9B7ABF' barStyle='light-content' />
            {
                loading ? <CircleLoader /> : <ScrollView keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false} contentContainerStyle={{ flex: 1, backgroundColor: 'white', justifyContent: 'center' }}>
                    {
                        userLoading ? <CircleLoader /> : <View style={styles.container}>
                            <Image style={styles.HeaderLogo} source={require('../assets/Image/Glowup.png')} />
                            <View style={styles.HeaderContainer}>
                                <Text style={styles.SubHeadlines}>Schedule</Text>
                                <Text style={[styles.SubHeadlines, { color: '#D52976' }]}>Beauty</Text>
                                <Text style={styles.SubHeadlines}>Appointments</Text>
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
                                <TouchableOpacity disabled={!phone ? true : false} onPress={handleLogin} style={styles.ButtonContainer}>
                                    <Text style={styles.ButtonText}>Login</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginTop: 25 }}>
                                <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 16, color: '#000' }}>Don't Have an account?</Text>
                                <View style={styles.redirection}>
                                    <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                                        <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 14, color: '#083AA9', borderBottomColor: '#083AA9', borderBottomWidth: 1 }}>SIGN UP</Text>
                                    </TouchableOpacity>
                                    <Text style={[styles.redirectionText, { fontFamily: 'Montserrat-Medium', color: '#000' }]}>here</Text>
                                </View>
                            </View>
                        </View>
                    }
                </ScrollView>
            }
            {
                loading || userLoading ? null : <TouchableOpacity style={{ alignSelf: 'center', marginBottom: 15 }} onPress={() => navigation.navigate('LoginDemo')}>
                    <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 16, color: '#9B7ABF' }}>Login as Guest</Text>
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
export default Login