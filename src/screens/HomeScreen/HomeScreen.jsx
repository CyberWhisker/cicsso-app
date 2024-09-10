import React, { useContext, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Card, Text, useTheme } from 'react-native-paper'
import { CustomCalendar } from '../../components'
import Master from '../../layouts/Master'
import { AuthContext } from '../../context/AuthContext'

function HomeScreen() {
  const {user} = useContext(AuthContext)
  useEffect(() => {
    console.log(user)
  },[])
  return (
    <Master>
      <View style={styles.container}>
        <View style={{marginTop: 10}}>
          <InfoStack/>
        </View>
        <View style={{marginTop: 20}}>
          <CalendarView/>
        </View>
      </View>
    </Master>
  )
}

function InfoStack() {
  const {colors} = useTheme();
  let attendanceStatus = true;
  const backgroundColor = attendanceStatus ? '#28a745' : colors.secondary;
  return (
    <View style={{gap: 15}}>
      <View style={styles.cardContainer}>
        <Card style={[styles.card,{backgroundColor: backgroundColor}]}>
          <Card.Title title='Attendance'/>
          <Card.Content>
            <Text style={styles.customText}>Open</Text>
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Title title='Events'/>
          <Card.Content>
            <Text Text style={styles.customText}>30</Text>
          </Card.Content>
        </Card>
      </View>
      <View style={styles.cardContainer}>
        <Card style={styles.card}>
          <Card.Title title='Penalties'/>
          <Card.Content>
            <Text style={styles.customText}>3</Text>
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Title title='Credits'/>
          <Card.Content>
            <Text style={styles.customText} adjustsFontSizeToFit>10000</Text>
          </Card.Content>
        </Card>
      </View>
    </View>
  )
}

function CalendarView() {
  return (
    <CustomCalendar/>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  card: {
    width: '48%'
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  customText: {
    fontSize: '30%',
    fontWeight: 'bold',
    textAlign: 'center',
  }
})

export default HomeScreen