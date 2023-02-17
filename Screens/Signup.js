import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../actions/userActions'
import { Dialog, ALERT_TYPE } from 'react-native-alert-notification'

const Signup = ({ navigation }) => {
    const { hash, error, loading } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const handleSignup = async () => {
        await dispatch(registerUser(name, phone))
    }

    useEffect(() => {
        if (error) {
            dispatch({
                type: 'ClearError'
            })
            return Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: error,
                button: 'close'
            });
        }
        if (hash) {
            navigation.navigate('Verify', {
                phone: phone,
                name: name,
            })
        }
    }, [dispatch, error, hash])

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
                        autoCapitalize='words'
                        mode="outlined"
                        value={name}
                        onChangeText={(text) => setName(text)}
                        label="Name" />
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
                    {
                        loading ? <TouchableOpacity disabled={true} style={styles.ButtonContainer}>
                            <Text style={styles.ButtonText}>Please Wait...</Text>
                        </TouchableOpacity> : <TouchableOpacity disabled={!name || !phone ? true : false} onPress={handleSignup} style={styles.ButtonContainer}>
                            <Text style={styles.ButtonText}>Sign Up</Text>
                        </TouchableOpacity>
                    }
                </View>
                <View style={{ marginTop: 25 }}>
                    <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 16, color: '#000' }}>Already Have an account?</Text>
                    <View style={styles.redirection}>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 14, color: '#083AA9', borderBottomColor: '#083AA9', borderBottomWidth: 1 }}>LOGIN</Text>
                        </TouchableOpacity>
                        <Text style={[styles.redirectionText, { fontFamily: 'Montserrat-Medium', color: '#000' }]}>here</Text>
                    </View>
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
export default Signup