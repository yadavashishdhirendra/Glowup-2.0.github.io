import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Entypo from 'react-native-vector-icons/Entypo';

const Faqs = () => {
    const [first, setFirst] = useState(false)
    const [second, setSecond] = useState(false)
    const [third, setThird] = useState(false)
    const [fourth, setFourth] = useState(false)
    const [fifth, setFifth] = useState(false)
    const firstOne = () => {
        setFirst(!first)
    }

    const secondOne = () => {
        setSecond(!second)
    }

    const thirdOne = () => {
        setThird(!third)
    }

    const fourthOne = () => {
        setFourth(!fourth)
    }

    const fifthOne = () => {
        setFifth(!fifth)
    }
    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ paddingHorizontal: 15 }}>
                <TouchableOpacity onPress={() => firstOne()} style={[styles.accordion, { marginTop: 20 }]}>
                    <Text style={styles.titleStyle}>I changed my mind, Can I cancel my booking?</Text>
                    {
                        first ? <Entypo name='chevron-up' size={24} color='#000' /> : <Entypo name='chevron-down' size={24} color='#000' />
                    }
                </TouchableOpacity>

                {
                    first ? <View style={styles.hiddenItem}>
                        <Text style={styles.textItem}>Yes! And its free! You can even reschedule the appointment at no extra cost!</Text>
                    </View> : null
                }

                <TouchableOpacity onPress={() => secondOne()} style={styles.accordion}>
                    <Text style={styles.titleStyle}>Something came up, can I reschedule my appointment?</Text>
                    {
                        second ? <Entypo name='chevron-up' size={24} color='#000' /> : <Entypo name='chevron-down' size={24} color='#000' />
                    }
                </TouchableOpacity>

                {
                    second ? <View style={styles.hiddenItem}>
                        <Text style={styles.textItem}>Absolutely! And its free!</Text>
                    </View> : null
                }

                <TouchableOpacity onPress={() => thirdOne()} style={styles.accordion}>
                    <Text style={styles.titleStyle}>How do I know my appointment has been booked?</Text>
                    {
                        third ? <Entypo name='chevron-up' size={24} color='#000' /> : <Entypo name='chevron-down' size={24} color='#000' />
                    }
                </TouchableOpacity>

                {
                    third ? <View style={styles.hiddenItem}>
                        <Text style={styles.textItem}>You can see all your appointments under the "Booking" tab.</Text>
                    </View> : null
                }


                <TouchableOpacity onPress={() => fourthOne()} style={styles.accordion}>
                    <Text style={styles.titleStyle}>Is the booking confirmation instant?</Text>
                    {
                        fourth ? <Entypo name='chevron-up' size={24} color='#000' /> : <Entypo name='chevron-down' size={24} color='#000' />
                    }
                </TouchableOpacity>

                {
                    fourth ? <View style={styles.hiddenItem}>
                        <Text style={styles.textItem}>Yes!</Text>
                    </View> : null
                }

                <TouchableOpacity onPress={() => fifthOne()} style={styles.accordion}>
                    <Text style={styles.titleStyle}>I have an issue not mentioned here, who do I ask?</Text>
                    {
                        fifth ? <Entypo name='chevron-up' size={24} color='#000' /> : <Entypo name='chevron-down' size={24} color='#000' />
                    }
                </TouchableOpacity>

                {
                    fifth ? <View style={styles.hiddenItem}>
                        <Text style={styles.textItem}>Drop us a message in the help section and we will get back to you on the same day! Alternatively, Email us at info@glowup.pro and leave us your Name and phone number, we will call you back!</Text>
                    </View> : null
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    titleStyle: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 14,
        marginRight: 8,
        flex: 0.9,
        color: '#2B2B2B'
    },
    accordion: {
        marginBottom: 20,
        backgroundColor: '#F7F7F7',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    hiddenItem: {
        marginBottom: 20,
        paddingHorizontal: 10,
        marginTop: -8
    },
    textItem: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        color: '#2B2B2B'
    }
})

export default Faqs