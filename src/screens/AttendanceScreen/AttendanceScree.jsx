import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Card, Text } from 'react-native-paper'
import Biometrics from '../../Hooks/Biometrics'
import { useRoute } from '@react-navigation/native';
import Master from '../../layouts/Master';

const getMonthName = (date) => {
  const options = { month: 'long',day: 'numeric', year: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

function AttendanceScreen() {
  const route = useRoute();
  const {selectedDate} = route.params || {}
  return (
    <Master>
      <View style={styles.container}>
        <Text variant='displayMedium' style={{textAlign: 'center', fontWeight: 'bold'}}>Event Name</Text>
        <Text variant='headlineMedium' style={{fontWeight: 'bold', textAlign: 'center'}}>{getMonthName(selectedDate)}</Text>
        <View style={{marginTop: 20}}>
          <InfoStack/>
        </View>
        <View style={{marginTop: 50}}>
          <AttendanceSign/>
        </View>
      </View>
    </Master>
  )
}

function InfoStack() {
  return (
    <View style={{gap: 15}}>
      <View style={styles.cardContainer}>
        <Card style={styles.card}>
          <Text>AM IN</Text>
          <Text style={styles.customText}>07:30</Text>
        </Card>
        <Card style={styles.card}>
          <Text>AM OUT</Text>
          <Text style={styles.customText}>11:30</Text>
        </Card>
      </View>
      <View style={styles.cardContainer}>
        <Card style={styles.card}>
          <Text>PM IN</Text>
          <Text style={styles.customText}>12:32</Text>
        </Card>
        <Card style={styles.card}>
          <Text>PM OUT</Text>
          <Text style={styles.customText}>N/A</Text>
        </Card>
      </View>
    </View>
  )
}

function AttendanceSign() {
  return (
    <Biometrics/>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  card: {
    padding: 20,
    width: '48%'
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  customText: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})

export default AttendanceScreen