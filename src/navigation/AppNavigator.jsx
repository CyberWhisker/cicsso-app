// src/navigation/AppNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Text, useTheme } from 'react-native-paper';
import BottomNavigator from './BottomNavigator';

import { Login, Signin } from '../screens/Auth';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import AttendanceScreen from '../screens/AttendanceScreen/AttendanceScree';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const isLogin = true;
  return (
    <NavigationContainer>
      {!isLogin && (
        <LoginNavigation/>
      )}
      {isLogin && (
        <HomeNavigation/>
      )}
      {/* <BottomNavigator /> */}
    </NavigationContainer>
  );
}

function LoginNavigation() {
  const { colors } = useTheme(); // Access theme colors
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.onPrimary,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen 
      name="LogIn" 
      component={Login} 
      options={{
        headerShown: false,
      }}
      />
      <Stack.Screen 
      name="SignIn" 
      component={Signin} 
      options={{
        headerShown: false,
      }}
      />
    </Stack.Navigator>
  )
}

function HomeNavigation() {
  const { colors } = useTheme(); // Access theme colors
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.elevation.level2 },
        // headerTintColor: colors.onPrimary,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen 
      name="Dashboard" 
      component={HomeScreen}
      options={{
        headerTitle: (props) => (
          <Text style={{ color: colors.primary, fontSize: 20, fontWeight: 'bold' }}>
            Dashboard
          </Text>
        ),
      }}
      />
      <Stack.Screen 
      name="Attendance" 
      component={AttendanceScreen}
      options={{
        headerTitle: (props) => (
          <Text style={{ color: colors.primary, fontSize: 20, fontWeight: 'bold' }}>
            Attendance
          </Text>
        ),
      }}
      />
    </Stack.Navigator>
  )
}
