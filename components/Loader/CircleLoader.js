import { View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';

const CircleLoader = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <LottieView style={{ width: "50%" }} source={require('../../assets/Image/87660-circle-loader.json')} autoPlay loop />
        </View>
    )
}

export default CircleLoader