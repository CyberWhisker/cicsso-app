import { createDrawerNavigator} from '@react-navigation/drawer';
import React, { useContext } from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { Avatar, Button, Drawer, MD3DarkTheme, MD3LightTheme, Switch, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context'; // Use this for SafeAreaView
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import AttendanceScreen from '../screens/AttendanceScreen/AttendanceScree';
import { AuthContext } from '../context/AuthContext';
import ToggleTheme from '../components/ToggleTheme';

const DrawerNav = createDrawerNavigator();

function AppStack() {
    const colorScheme = useColorScheme();
    const paperTheme = colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme;
    return (
        <DrawerNav.Navigator
            drawerContent={(props) => <DrawerContentList {...props} />}
            screenOptions={{
                headerStyle: { backgroundColor: paperTheme.colors.primary },
                headerTintColor: paperTheme.colors.onPrimary,
                drawerStyle: {
                    backgroundColor: paperTheme.colors.background,
                },
            }}
        >
            <DrawerNav.Screen name='Dashboard' component={HomeScreen} />
            <DrawerNav.Screen name='Attendance' component={AttendanceScreen} />
        </DrawerNav.Navigator>
    );
}

function DrawerContentList(props) {
    const { colors } = useTheme();
    const logo = require('../../assets/images/appImg/Logo.png'); // Ensure this path is correct
    const {logout} = useContext(AuthContext)
    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'space-between'}}>
            <View>
                <Drawer.Section>
                    <View style={styles.container}>
                    <Avatar.Image source={logo} size={50} style={styles.avatar} />
                    <Text variant='displaySmall' style={{fontWeight: 'bold'}}>
                        CIC
                        <Text variant='displaySmall' style={{fontWeight: 'bold', color: colors.primary}}>SO</Text>
                    </Text>
                    </View>
                </Drawer.Section>
                <Drawer.Section>
                    <Drawer.Item
                        label="Dashboard"
                        icon="home"
                        onPress={() => props.navigation.navigate('Dashboard')}
                        style={styles.drawerItem}
                        labelStyle={{ color: colors.primary }} // Set the color for the label
                    />
                    <Drawer.Item
                        label="Event"
                        icon="calendar"
                        onPress={() => props.navigation.navigate('Dashboard')}
                        style={styles.drawerItem}
                        labelStyle={{ color: colors.primary }} // Set the color for the label
                    />
                    <Drawer.Item
                        label="Penalties"
                        icon="alert"
                        onPress={() => props.navigation.navigate('Dashboard')}
                        style={styles.drawerItem}
                        labelStyle={{ color: colors.primary }} // Set the color for the label
                    />
                </Drawer.Section>
                <Drawer.Section>
                    <ToggleTheme/>
                </Drawer.Section>
            </View>
            <View style={{paddingHorizontal: 15}}>
                <Button 
                mode='contained' 
                theme={{
                    colors: {primary: colors.error}
                }}
                onPress={logout}
                >
                    Logout
                </Button>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    drawerItem: {
      marginVertical: 4,
    },
    container: {
      paddingVertical: 15,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 15
    }
  });

export default AppStack;
