import { createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import { AttendanceScreen, HomeScreen } from '../screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function AppStack() {
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
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Attendance" component={AttendanceScreen} />
        </Stack.Navigator>
    );
}

export default AppStack;
