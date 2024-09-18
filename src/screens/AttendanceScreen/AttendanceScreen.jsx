import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import { Card, Text, Avatar, Button, Icon } from 'react-native-paper'
import Biometrics from '../../Hooks/Biometrics'
import { useRoute } from '@react-navigation/native';
import Master from '../../layouts/Master';
import moment from 'moment';
import { fetchScheduleByDate } from '../../api/scheduleApi';
import { fetchEventById } from '../../api/eventApi';
import { fetchAttendanceByUserIdSchedId, storeAttendance, updateAttendance } from '../../api/attendanceApi';
import { AuthContext } from '../../context/AuthContext';
import * as LocalAuthentication from 'expo-local-authentication';

function AttendanceScreen() {
  const {user} = useContext(AuthContext)
  const route = useRoute();
  const {selectedDate} = route.params || {}
  const [schedData, setSchedData] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [attendData, setAttendData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleGetScheduleByDate = async () => {
    const {data, error} = await fetchScheduleByDate(selectedDate)
    if (error) {
      alert(error.message)
    } else {
      handleGetEvent(data.event)
      setSchedData(data)
      await handleGetAttendanceBySchedUserId(data._id)
    }
  }

  const handleGetEvent = (data) => {
    setEventData(data)
  }

  const handleGetAttendanceBySchedUserId = async (scheduleId) => {
    const {data, error} = await fetchAttendanceByUserIdSchedId(user.user._id, scheduleId)
    if (error) {
      alert(error)
    } else {
      setAttendData(data)
    }
    setIsLoading(false);
  }
  
  useEffect(() => {
    handleGetScheduleByDate()
  }, []);
  return (
    <Master>
      <View style={styles.container}>
        <Text variant='displayMedium' style={{textAlign: 'center', fontWeight: 'bold'}}>{eventData?.event || 'No Schedule Today'}</Text>
        <Text variant='headlineMedium' style={{fontWeight: 'bold', textAlign: 'center'}}>{moment(selectedDate).format('MMMM DD YYYY')}</Text>
        <View style={{marginTop: 20}}>
          <InfoStack attendData={attendData}/>
        </View>
        <View style={{marginTop: 50}}>
          {!isLoading && 
            <AttendanceSign schedData={schedData} attendData={attendData} user={user} handleGetAttendanceBySchedUserId={handleGetAttendanceBySchedUserId}/>
          }
        </View>
      </View>
    </Master>
  )
}

function InfoStack({attendData}) {
  return (
    <View style={{gap: 15}}>
      <View style={styles.cardContainer}>
        <Card style={[styles.card, {backgroundColor: attendData.amIn ? '#28a745' : '#ff4d4d' }]}>
          <Text>AM IN</Text>
          <Text style={styles.customText}>{attendData.amIn ? moment(attendData.amIn).format('hh:mm A') : 'Absent'}</Text>
        </Card>
        <Card style={[styles.card, {backgroundColor: attendData.amOut ? '#28a745' : '#ff4d4d' }]}>
          <Text>AM OUT</Text>
          <Text style={styles.customText}>{attendData.amOut ? moment(attendData.amOut).format('hh:mm A') : 'Absent'}</Text>
        </Card>
      </View>
      <View style={styles.cardContainer}>
        <Card style={[styles.card, {backgroundColor: attendData.pmIn ? '#28a745' : '#ff4d4d' }]}>
          <Text>PM IN</Text>
          <Text style={styles.customText}>{attendData.pmIn ? moment(attendData.pmIn).format('hh:mm A') : 'Absent'}</Text>
        </Card>
        <Card style={[styles.card, {backgroundColor: attendData.pmOut ? '#28a745' : '#ff4d4d' }]}>
          <Text>PM OUT</Text>
          <Text style={styles.customText}>{attendData.pmOut ? moment(attendData.pmOut).format('hh:mm A') : 'Absent'}</Text>
        </Card>
      </View>
    </View>
  )
}

function AttendanceSign({schedData, attendData, user, handleGetAttendanceBySchedUserId}) {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [formData, setFormData] = useState({
    ...(attendData._id && { _id: attendData._id }), 
    schedule: schedData._id,
    user: user.user._id,
    name: user.user.name,
  });
  const [isSchedAtive, setIsSchedActive] = useState(false);
    // for face detection or fingerprint scan
    useEffect(() => {
      handleTimeChecker();
      (async () => {
          const compatible = await LocalAuthentication.hasHardwareAsync();
          setIsBiometricSupported(compatible);
      })();
    },[]);
    const fallBacktoDefaultAuth = () => {
        console.log('Fall back to password authentication')
    };

    const alertComponent = (title, mess, btnTxt, btnFunc) => {
        return Alert.alert(title, mess, [
            {
                text: btnTxt,
                onPress: btnFunc,
            }
        ]);
    };
    const TwoButtonAlert = () => {
        Alert.alert('Welcome To App', 'Subscribe Now', [
            {
                text: 'Back',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            },
            {
                text: 'OK', onPress: () => console.log("Ok Pressed")
            },
        ]);
    }
    const handleBiometricAuth = async () => {
        const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();
        if (!isBiometricAvailable){
            return alertComponent(
            'Please Enter Your Password',
            'Biometric Auth not Supported',
            'Ok',
            () => fallBacktoDefaultAuth()
            );
        }

        let supportedBiometrics;
        if (isBiometricAvailable) {
            supportedBiometrics = await LocalAuthentication.supportedAuthenticationTypesAsync()
        }
        const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
        if (!savedBiometrics) {
            return alertComponent(
            'Biometric record not found',
            'Please login with password',
            'Ok',
            () => fallBacktoDefaultAuth()
            )
        }
        const biometricAuth = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Login with Biometrics',
            cancelLabel: 'cancel',
            disableDeviceFallback: true
        });
        if (biometricAuth.success) {
            // TwoButtonAlert()
            handleSubmit()
        };
        console.log({isBiometricAvailable})
        console.log({supportedBiometrics})
        console.log({savedBiometrics})
        console.log({biometricAuth})
    }

    const handleSubmit = async () => {
      if (attendData._id) {
        const {data, error} = await updateAttendance(formData)
        if (error) {
          alert(error)
        } else {
          alert('Attendance Successfull')
          await handleGetAttendanceBySchedUserId(schedData._id)
        }
      } else {
        const {data, error} = await storeAttendance(formData)
        if (error) {
          alert(error)
        } else {
          alert('Attendance Successfull')
          await handleGetAttendanceBySchedUserId(schedData._id)
        }
      }
    }

    const handleTimeChecker = () => {
      const currentTime = moment(); // Create a moment object for current time
      const schedAmIn = moment(schedData.amIn); // Convert schedData.amIn to a moment object
      const schedAmOut = moment(schedData.amOut); // Convert schedData.amIn to a moment object
      const schedPmIn = moment(schedData.pmIn); // Convert schedData.amIn to a moment object
      const schedPmOut = moment(schedData.pmOut); // Convert schedData.amIn to a moment object
      if (schedData._id) {
        if (currentTime.isSameOrAfter(schedAmIn) && currentTime.isSameOrBefore(moment(schedAmIn).add(1, 'hour'))) {
          setFormData({
            ...formData,
            amIn: moment().toISOString()
          })
          setIsSchedActive(true)
        } else if (currentTime.isSameOrAfter(schedAmOut) && currentTime.isSameOrBefore(moment(schedAmOut).add(1, 'hour'))) {
          setFormData({
            ...formData,
            amOut: moment().toISOString()
          })
          setIsSchedActive(true)
        } else if (currentTime.isSameOrAfter(schedPmIn) && currentTime.isSameOrBefore(moment(schedPmIn).add(1, 'hour'))) {
          setFormData({
            ...formData,
            pmIn: moment().toISOString()
          })
          setIsSchedActive(true)
        } else if (currentTime.isSameOrAfter(schedPmOut) && currentTime.isSameOrBefore(moment(schedPmOut).add(1, 'hour'))) {
          setFormData({
            ...formData,
            pmOut: moment().toISOString()
          })
          setIsSchedActive(true)
        } else {
          setIsSchedActive(false)
        }
      }
    };

    return (
        <View>
          {isSchedAtive &&
            <Button icon="fingerprint" mode="contained" onPress={handleBiometricAuth}>
              Attendance
            </Button>
          }
          {!isSchedAtive &&
            <View style={{gap: 15}}>
              <Text style={styles.customText}>The schedule is not currently active. Please check the schedule.</Text>
              <View style={styles.cardContainer}>
                <Card style={styles.card}>
                  <Card.Title title='AM IN'/>
                  <Card.Content>
                    <Text style={styles.customText}>{schedData.amIn ? moment(schedData.amIn).format('hh:mm A') : 'No Schedule'}</Text>
                  </Card.Content>
                </Card>
                <Card style={styles.card}>
                  <Card.Title title='AM OUT'/>
                  <Card.Content>
                  <Text style={styles.customText}>{schedData.amOut ? moment(schedData.amOut).format('hh:mm A') : 'No Schedule'}</Text>
                  </Card.Content>
                </Card>
              </View>
              <View style={styles.cardContainer}>
                <Card style={styles.card}>
                  <Card.Title title='PM IN'/>
                  <Card.Content>
                  <Text style={styles.customText}>{schedData.pmIn ? moment(schedData.pmIn).format('hh:mm A') : 'No Schedule'}</Text>
                  </Card.Content>
                </Card>
                <Card style={styles.card}>
                  <Card.Title title='PM OUT'/>
                  <Card.Content>
                  <Text style={styles.customText}>{schedData.pmOut ? moment(schedData.pmOut).format('hh:mm A') : 'No Schedule'}</Text>
                  </Card.Content>
                </Card>
              </View>
            </View>
          }
        </View>
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
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})

export default AttendanceScreen