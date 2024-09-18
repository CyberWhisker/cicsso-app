import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { Login, Register } from '../screens/Auth'


const Stack = createNativeStackNavigator();

function AuthStack() {
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
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
    );
}

export default AuthStack