import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Avatar, Button, Text } from 'react-native-paper'

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text variant='displayMedium' style={{fontWeight: 'bold'}}>Set up Biometrics</Text>
      <Button onPress={() => alert('Success')}>
        <Avatar.Icon icon={'fingerprint'} size={200}/>
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 50
  }
})

export default HomeScreen