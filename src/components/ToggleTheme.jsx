import React, { useContext, useState } from 'react'
import { View } from 'react-native'
import { Switch, Text } from 'react-native-paper'
import { ThemeContext } from '../context/ThemeContext';

function ToggleTheme() {
    const { theme, darkMode, lightMode } = useContext(ThemeContext);
    const [toggle, setToggle] = useState(theme === 'dark');

    const handleChange = () => {
        setToggle(!toggle);
        if (toggle) {
            lightMode();
        } else {
            darkMode();
        }
    };
    return (
        <View style={{padding: 10, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, alignItems: 'center'}}>
            <Text>Toggle Dark Mode</Text>
            <Switch onChange={handleChange}/>
        </View>
    )
}

export default ToggleTheme