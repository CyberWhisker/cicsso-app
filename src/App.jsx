import 'react-native-gesture-handler';
import { MD3LightTheme, MD3DarkTheme, PaperProvider } from 'react-native-paper';
import { useColorScheme, View } from 'react-native';
import { AuthProvider } from './context/AuthContext';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, Register } from './screens/Auth';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { AttendanceScreen, HomeScreen } from './screens';

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'rgb(29, 27, 30)'
    }
}

export default function App() {
    const colorScheme = useColorScheme();
    const paperTheme = colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme;
    const Stack = createStackNavigator()
    return (
        <PaperProvider theme={paperTheme}>
            <NavigationContainer theme={MyTheme}>
                <AuthProvider>
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
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen name="Attendance" component={AttendanceScreen} />
                    </Stack.Navigator>
                </AuthProvider>
            </NavigationContainer>
        </PaperProvider>
    );
}


