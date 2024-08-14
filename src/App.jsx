import 'react-native-gesture-handler';
import { MD3LightTheme, MD3DarkTheme, PaperProvider } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import { AuthProvider } from './context/AuthContext';
import AppNav from './navigation/AppNav';
import { ThemeProvider } from './context/ThemeContext';



export default function App() {
    const colorScheme = useColorScheme();
    const paperTheme = colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme;

    return (
        <AuthProvider>
            <ThemeProvider>
                <PaperProvider theme={paperTheme}>
                    <AppNav/>
                </PaperProvider>
            </ThemeProvider>
        </AuthProvider>
    );
}


