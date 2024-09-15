import React, { createContext, useEffect, useState } from 'react'
import { userLogin } from '../api/userApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Title } from 'react-native-paper';
import { View } from 'react-native';

export const AuthContext = createContext();

export const AuthProvider= ({children}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        const {data, error} = await userLogin(email, password)
        if (error) {
            alert(error)
        } else {
            try {
                await AsyncStorage.setItem('user', JSON.stringify(data));
                
                await AsyncStorage.setItem('user');
            } catch (storageError) {
                console.error('Error with AsyncStorage:', storageError);
            }
        }
    };
    const logout = () => {
        setIsLoading(false)
    }
    const CheckStorage = async () => {
        const localUser = await AsyncStorage.getItem('user')
        if (localUser) {
            setUser(JSON.parse(localUser))
        }
        setIsLoading(false)
    }
    useEffect(() => {
        CheckStorage();
    },[])
    if (isLoading) {
        return (
            <View>
                <Title>Loading..</Title>
            </View>
        )
    }
    return (
        <AuthContext.Provider value={{login, logout, isLoading, setUser, user}}>
            {children}
        </AuthContext.Provider>
    )
}

