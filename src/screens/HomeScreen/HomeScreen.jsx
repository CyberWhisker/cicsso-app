import React, { useContext, useEffect, useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Card, Text, useTheme } from 'react-native-paper'
import Master from '../../layouts/Master'
import { AuthContext } from '../../context/AuthContext'
import moment from 'moment'
import { fetchSchedules } from '../../api/scheduleApi'
import { fetchEventById } from '../../api/eventApi'
import { Calendar } from 'react-native-calendars'
import { useNavigation } from '@react-navigation/native'
import { fetchAttendanceByUserIdSchedId } from '../../api/attendanceApi'

function HomeScreen() {
  const {user} = useContext(AuthContext)
  const [eventData, setEventData] = useState([])
  const [schedData, setSchedData] = useState([])
  const [attendData, setAttendData] = useState([])
  const [activeSched, setActiveSched] = useState([])

  const handleGetSched = async () => {
    const {data, error} = await fetchSchedules();
    if (error) {
      alert(error)
    } else {
      setSchedData(data)
      const dateNow = moment().startOf('day').toISOString();
      const activeShed = data.find(sched => sched.date == dateNow)
      setActiveSched(activeShed);
      if (activeShed) {
        const {data: eventData, error: eventError} = await fetchEventById(activeShed.eventId)
        const {data: attendData, error: attendError} = await fetchAttendanceByUserIdSchedId(user.user._id, activeShed._id)
        setEventData(eventData)
        setAttendData(attendData)
      }
    }
  }

  useEffect(() => {
    handleGetSched();
  },[])
  return (
    <Master>
      <View style={styles.container}>
        <View style={{marginTop: 10}}>
          <InfoStack eventData={eventData} attendData={attendData}/>
        </View>
        <View style={{marginTop: 20}}>
          <CalendarView schedData={schedData}/>
        </View>
        <View style={{marginTop: 20}}>
          <ScheduleView activeSched={activeSched}/>
        </View>
      </View>
    </Master>
  )
}

function InfoStack({eventData, attendData}) {

  const [currentTime, setCurrentTime] = useState('')

  const handleCurrentTime = () => {
    setCurrentTime(moment().format('hh:mm:ss A'))
  }

  useEffect(() => {

    const intervalId = setInterval(() => {
      handleCurrentTime();
    }, 1000);
    return () => clearInterval(intervalId);
  }, [])
  return (
    <View style={{gap: 15}}>
      <View style={styles.cardContainer}>
        <Card style={styles.card}>
          <Card.Title title='Current Date'/>
          <Card.Content>
            <Text style={styles.customText}>{moment().format('MMM DD YYYY')}</Text>
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Title title='Time'/>
          <Card.Content>
            <Text Text style={styles.customText}>{currentTime}</Text>
          </Card.Content>
        </Card>
      </View>
      <View style={styles.cardContainer}>
      <Card style={{ width: '100%', backgroundColor: eventData[0]?.event ? '#28a745' : '#ff4d4d' }}>
        <Card.Title title='Current Event'/>
        <Card.Content>
          <Text style={styles.customText} adjustsFontSizeToFit>
            {eventData[0]?.event || 'No Event Today'}
          </Text>
        </Card.Content>
      </Card>
      </View>
    </View>
  )
}

function CalendarView({schedData}) {
  const currentDate = moment().format('YYYY-MM-DD');
  const { colors } = useTheme(); // Use theme colors from React Native Paper
  const navigation = useNavigation();

  const handleAttendance = (date) => {
    navigation.navigate("Attendance", {selectedDate: date})
  }

  // Example highlight dates
  const markedDates = useMemo(() => {
    return schedData.reduce((acc, sched) => {
      const dateKey = moment(sched.date).format('YYYY-MM-DD');
      acc[dateKey] = { selected: true, marked: true, dotColor: colors.accent };
      return acc;
    }, {});
  }, [schedData, colors.accent]);

  return (
    <Card>
      <View style={{borderRadius: 10, overflow: 'hidden'}}>
        <Calendar
          current={currentDate}
          minDate={'2023-01-01'}
          maxDate={'2025-12-31'}
          markedDates={markedDates}
          onDayPress={(day) => handleAttendance(day.dateString)}
          theme={{
            calendarBackground: '#333', // Calendar background
            dayTextColor: 'white', // Day number color
            todayTextColor: 'black', // Today's date color
            textSectionTitleColor: 'white', // Header text color
            arrowColor: 'white', // Arrow color for navigating months
            monthTextColor: 'white', // Month text color in the header
            textMonthFontWeight: 'bold', // Font weight for the month text
            textMonthFontSize: 18, // Font size for the month text
          }}
        />
      </View>
    </Card>
  );
}

function ScheduleView ({activeSched}) {
  return (
    <View style={{gap: 15}}>
      <View style={styles.cardContainer}>
        <Card style={styles.card}>
          <Card.Title title='AM IN'/>
          <Card.Content>
            <Text style={styles.customText}>{activeSched.amIn ? moment(activeSched.amIn).format('hh:mm A') : 'No Schedule'}</Text>
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Title title='AM OUT'/>
          <Card.Content>
          <Text style={styles.customText}>{activeSched.amOut ? moment(activeSched.amOut).format('hh:mm A') : 'No Schedule'}</Text>
          </Card.Content>
        </Card>
      </View>
      <View style={styles.cardContainer}>
        <Card style={styles.card}>
          <Card.Title title='PM IN'/>
          <Card.Content>
          <Text style={styles.customText}>{activeSched.pmIn ? moment(activeSched.pmIn).format('hh:mm A') : 'No Schedule'}</Text>
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Title title='PM OUT'/>
          <Card.Content>
          <Text style={styles.customText}>{activeSched.pmOut ? moment(activeSched.pmOut).format('hh:mm A') : 'No Schedule'}</Text>
          </Card.Content>
        </Card>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  card: {
    width: '48%',
    height: '100%'
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  customText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  header: {
    padding: 10,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})

export default HomeScreen