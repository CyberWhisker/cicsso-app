import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { View } from 'react-native'
import { Avatar, Button, Text } from 'react-native-paper'
import * as LocalAuthentication from 'expo-local-authentication';
import { Alert } from 'react-native';

function Biometrics() {
    const [isBiometricSupported, setIsBiometricSupported] = useState(false);
    // for face detection or fingerprint scan
    useEffect(() => {
        (async () => {
            const compatible = await LocalAuthentication.hasHardwareAsync();
            setIsBiometricSupported(compatible);
        })();
    });
    const fallBacktoDefaultAuth = () => {
        console.log('Fall back to password authentication')
    };

    const alertComponent = (title, mess, btnTxt, btnFunc) => {
        return Alert.alert(title, mess, [
            {
                text: btnTxt,
                onPress: btnFunc,
            }
        ]);
    };
    const TwoButtonAlert = () => {
        Alert.alert('Welcome To App', 'Subscribe Now', [
            {
                text: 'Back',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            },
            {
                text: 'OK', onPress: () => console.log("Ok Pressed")
            },
        ]);
    }
    const handleBiometricAuth = async () => {
        const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();
        if (!isBiometricAvailable){
            return alertComponent(
            'Please Enter Your Password',
            'Biometric Auth not Supported',
            'Ok',
            () => fallBacktoDefaultAuth()
            );
        }

        let supportedBiometrics;
        if (isBiometricAvailable) {
            supportedBiometrics = await LocalAuthentication.supportedAuthenticationTypesAsync()
        }
        const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
        if (!savedBiometrics) {
            return alertComponent(
            'Biometric record not found',
            'Please login with password',
            'Ok',
            () => fallBacktoDefaultAuth()
            )
        }
        const biometricAuth = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Login with Biometrics',
            cancelLabel: 'cancel',
            disableDeviceFallback: true
        });
        if (biometricAuth.success) {
            TwoButtonAlert()
        };
        console.log({isBiometricAvailable})
        console.log({supportedBiometrics})
        console.log({savedBiometrics})
        console.log({biometricAuth})
    }
    return (
        <View>
            <Button onPress={handleBiometricAuth}>
                <Avatar.Icon icon={'fingerprint'} size={200}/>
            </Button>
        </View>
    )
}

export default Biometrics