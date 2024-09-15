import { createStackNavigator } from '@react-navigation/stack'
import React, { useContext } from 'react'
import { View } from 'react-native'
import { AuthContext } from '../context/AuthContext'
import { Login, Register } from '../screens/Auth'
import { AttendanceScreen, HomeScreen } from '../screens'

function AppNav() {
    const Stack = createStackNavigator()
    const {user} = useContext(AuthContext)
  return (
    <Stack.Navigator
        initialRouteName={user ? 'Attendance' : 'Login'}
        screenOptions={{
            headerStyle: {
                backgroundColor: '#665a6f'
            },
            headerTintColor: 'white', 
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }}    
    >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Attendance" component={AttendanceScreen} />
    </Stack.Navigator>
  )
}

export default AppNav