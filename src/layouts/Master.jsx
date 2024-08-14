import React from 'react'
import { ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper'

function Master({children}) {
    const {colors} = useTheme()
    return (
        <ScrollView style={{backgroundColor: colors.background}}>
            {children}
        </ScrollView>
    )
}

export default Master