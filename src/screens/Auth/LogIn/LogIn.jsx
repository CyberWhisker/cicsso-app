import React, { useState, useContext } from 'react';
import { Keyboard, KeyboardAvoidingView, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Avatar, Button, Card, TextInput, Title, Subheading, useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../../context/AuthContext';

function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { colors } = useTheme();
    const navigation = useNavigation();

    const storeData = async (value) => {
        try {
            await AsyncStorage.setItem('userStatus', value);
        } catch (e) {
            console.error('Failed to save user status', e);
        }
    };

    const {login} = useContext(AuthContext);
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Card style={styles.card}>
                    <Card.Content style={styles.content}>
                        <Avatar.Image source={require('../../../../assets/images/appImg/Logo.png')} size={100} style={styles.avatar} />
                        <Title style={styles.title}>Log In</Title>
                        <Subheading style={[styles.subheading, { color: colors.primary }]}>Please enter your details</Subheading>
                        <TextInput
                            label="Email"
                            value={email}
                            onChangeText={setEmail}
                            style={styles.textInput}
                            mode="outlined"
                            keyboardType="email-address"
                        />
                        <TextInput
                            label="Password"
                            value={password}
                            onChangeText={setPassword}
                            style={styles.textInput}
                            mode="outlined"
                            secureTextEntry
                        />
                    </Card.Content>
                    <Card.Actions style={styles.actions}>
                        <Button mode="outlined" onPress={() => navigation.navigate('SignIn')}>
                            Register
                        </Button>
                        <Button mode="contained" onPress={login}>
                            Login
                        </Button>
                    </Card.Actions>
                </Card>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: '90%',
        padding: 16,
        borderRadius: 8,
        elevation: 4,
    },
    content: {
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    avatar: {
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subheading: {
        fontSize: 16,
        marginBottom: 16,
    },
    textInput: {
        width: '100%',
        marginBottom: 12,
    },
    actions: {
        justifyContent: 'center',
        paddingVertical: 8,
    },
});

export default LogIn;
