import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { useTheme } from 'react-native-paper';
import { Login, Signin } from '../screens/Auth';


const Stack = createNativeStackNavigator();

function AuthStack() {
    const { colors } = useTheme(); // Access theme colors
    return (
        <Stack.Navigator
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
            <Stack.Screen 
                name="LogIn" 
                component={Login} 
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="SignIn" 
                component={Signin} 
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default AuthStack