import { Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';

const NoDataFound = ({ keyword }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <LottieView style={{ width: "100%" }} source={require('../../assets/Image/86045-no-data-found-json.json')} autoPlay loop />
            <Text style={{ color: '#2B2B2B', fontFamily: 'Montserrat-SemiBold', fontSize: 14 }}>No Data Found, With This Keyword {keyword}!</Text>
        </View>
    )
}

export default NoDataFound