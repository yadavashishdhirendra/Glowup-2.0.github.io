import { View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';

const Loader = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <LottieView style={{ width: "50%" }} source={require('../../assets/Image/109733-scissor-snip.json')} autoPlay loop />
        </View>
    )
}

export default Loader