// index.jsx
import * as React from 'react';
import { MD3LightTheme, MD3DarkTheme, PaperProvider } from 'react-native-paper';
import AppNavigator from './navigation/AppNavigator';

import { useColorScheme } from 'react-native';
import BottomNavigator from './navigation/BottomNavigator';

export default function App() {
  const colorScheme = useColorScheme();
  const paperTheme = 
    colorScheme === "dark" 
      ? MD3DarkTheme
      : MD3LightTheme;
  return (
    <PaperProvider theme={paperTheme}>
      <AppNavigator />
    </PaperProvider>
  );
}
