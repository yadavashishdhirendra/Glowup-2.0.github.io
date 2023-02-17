import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import ScreenNav from './components/Navigation/ScreenNav'
import store from './store'
import { Root } from 'react-native-alert-notification'
import OneSignal from 'react-native-onesignal'

const App = () => {
  useEffect(() => {
    OneSignal.setLogLevel(6,0)
    OneSignal.setAppId("50a29482-ef6a-424b-b988-93a926fde42c")
  }, [])
  
  return (
    <Provider store={store}>
      <Root>
        <ScreenNav />
      </Root>
    </Provider>
  )
}

export default App