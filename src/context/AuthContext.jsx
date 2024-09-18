import React, { createContext, useEffect, useState } from 'react'
import { storeUser, userLogin } from '../api/userApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Title } from 'react-native-paper';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const AuthContext = createContext();

export const AuthProvider= ({children}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigation = useNavigation();

    const login = async (email, password) => {
        const {data, error} = await userLogin(email, password)
        if (error) {
            alert(error)
        } else {
            try {
                await AsyncStorage.setItem('user', JSON.stringify(data));
                setUser(data)
            } catch (error) {
                alert('Error with AsyncStorage')
            }
        }
    };

    const register = async (formData) => {
        const {data, error} = await storeUser(formData)
        if (error) {
            alert(error)
        } else {
            try {
                await AsyncStorage.setItem('user', JSON.stringify(data))
                setUser(data)
            } catch (error) {
                alert('Error with AsyncStorage')
            }
        }
    };

    const logout = async () => {
        await AsyncStorage.removeItem('user')
        setIsLoading(false)
        CheckStorage()
    }
    const CheckStorage = async () => {
        const localUser = await AsyncStorage.getItem('user')
        if (localUser) {
            setUser(JSON.parse(localUser))
        } else {
            setUser(null);
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
        <AuthContext.Provider value={{login, logout, register, user}}>
            {children}
        </AuthContext.Provider>
    )
}

