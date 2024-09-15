import 'react-native-gesture-handler';
import { MD3LightTheme, MD3DarkTheme, PaperProvider } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import { AuthProvider } from './context/AuthContext';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import AppNav from './navigation/AppNav';

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'rgb(29, 27, 30)'
    }
}

export default function App() {
    const colorScheme = useColorScheme();
    const paperTheme = colorScheme === 'light' ? MD3DarkTheme : MD3LightTheme;
    return (
        <PaperProvider theme={MD3DarkTheme}>
            <NavigationContainer theme={MyTheme}>
                <AuthProvider>
                    <AppNav/>
                </AuthProvider>
            </NavigationContainer>
        </PaperProvider>
    );
}


