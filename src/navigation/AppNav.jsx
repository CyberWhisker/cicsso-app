import { createStackNavigator } from '@react-navigation/stack'
import React, { useContext } from 'react'
import { View } from 'react-native'
import { AuthContext } from '../context/AuthContext'
import { Login, Register } from '../screens/Auth'
import { AttendanceScreen, HomeScreen } from '../screens'
import AuthStack from './AuthStack'
import AppStack from './AppStack'

function AppNav() {
    const Stack = createStackNavigator()
    const {user} = useContext(AuthContext)
  return user ? <AppStack/> : <AuthStack/>
}

export default AppNav