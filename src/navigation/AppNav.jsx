import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContext';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

const Stack = createNativeStackNavigator();

function AppNav() {
    const {isLoading, userToken} = useContext(AuthContext)
    if ( isLoading ) {
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size='large'/>
        </View>
    }
    return (
        <NavigationContainer>
            {userToken !== null ? <AppStack/> : <AuthStack/> }
        </NavigationContainer>
    )
}

export default AppNav