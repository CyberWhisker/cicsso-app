import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Card, Text, Button, ActivityIndicator } from 'react-native-paper';
import moment from 'moment';
import { useRoute } from '@react-navigation/native';
import Master from '../../layouts/Master';
import * as LocalAuthentication from 'expo-local-authentication';
import { fetchScheduleByDate } from '../../api/scheduleApi';
import { fetchAttendanceByUserIdSchedId, storeAttendance, updateAttendance } from '../../api/attendanceApi';
import { AuthContext } from '../../context/AuthContext';

function AttendanceScreen() {
  const { user } = useContext(AuthContext);
  const route = useRoute();
  const { selectedDate } = route.params || {};
  const [arrayEvent, setArrayEvent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleGetScheduleByDate = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await fetchScheduleByDate(selectedDate, user.user._id);
      if (error) {
        Alert.alert('Error', error.message);
      } else {
        setArrayEvent(data || []);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch schedule.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetScheduleByDate();
  }, [selectedDate]);

  if (isLoading) {
    return (
      <Master>
        <View style={styles.loaderContainer}>
          <ActivityIndicator animating={true} size="large" />
          <Text style={styles.loaderText}>Loading schedule...</Text>
        </View>
      </Master>
    );
  }

  if (arrayEvent.length === 0) {
    return (
      <Master>
        <View style={styles.container}>
          <Text variant="displayMedium" style={styles.centerText}>No Schedule Today</Text>
          <Text variant="headlineMedium" style={styles.dateText}>
            {moment(selectedDate).format('MMMM DD YYYY')}
          </Text>
        </View>
      </Master>
    );
  }

  return (
    <Master>
      <View style={styles.container}>
        {arrayEvent.map((item, index) => {
          return (
            <View key={index}>
              <Text variant="displayMedium" style={styles.centerText}>{item?.event?.event || 'No Schedule Today'}</Text>
              <Text variant="headlineMedium" style={styles.dateText}>
                {moment(selectedDate).format('MMMM DD YYYY')}
              </Text>
              <InfoStack attendData={item.attendances[0]} />

              <View style={{ marginTop: 30 }}>
                {!isLoading &&
                  <AttendanceSign
                    schedData={item}
                    attendData={item.attendances[0]}
                    user={user}
                    handleGetScheduleByDate={handleGetScheduleByDate}
                  />
                }
              </View>
            </View>
          )
        })}
      </View>
    </Master>
  );
}

function InfoStack({ attendData }) {
  const renderCard = (label, time, isPresent) => (
    <Card style={[styles.card, { backgroundColor: isPresent ? '#28a745' : '#ff4d4d' }]}>
      <Text>{label}</Text>
      <Text style={styles.customText}>{time || 'Absent'}</Text>
    </Card>
  );

  return (
    <View style={{ gap: 15 }}>
      <View style={styles.cardContainer}>
        {renderCard('AM IN', attendData?.amIn && moment(attendData.amIn).format('hh:mm A'), !!attendData?.amIn)}
        {renderCard('AM OUT', attendData?.amOut && moment(attendData.amOut).format('hh:mm A'), !!attendData?.amOut)}
      </View>
      <View style={styles.cardContainer}>
        {renderCard('PM IN', attendData?.pmIn && moment(attendData.pmIn).format('hh:mm A'), !!attendData?.pmIn)}
        {renderCard('PM OUT', attendData?.pmOut && moment(attendData.pmOut).format('hh:mm A'), !!attendData?.pmOut)}
      </View>
    </View>
  );
}

function AttendanceSign({ schedData, attendData, user, handleGetScheduleByDate }) {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [formData, setFormData] = useState({
    ...(attendData?._id && { _id: attendData?._id }),
    schedule: schedData._id,
    user: user.user._id,
    name: user.user.name,
  });
  const [isSchedAtive, setIsSchedActive] = useState(false);
  // for face detection or fingerprint scan
  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  });
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
    console.log(formData)
    const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();
    if (!isBiometricAvailable) {
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
    // biometricAuth.success
    if (biometricAuth.success) {
      // TwoButtonAlert()
      handleSubmit()
    };
    // console.log({ isBiometricAvailable })
    // console.log({ supportedBiometrics })
    // console.log({ savedBiometrics })
    // console.log({ biometricAuth })
  }

  const handleSubmit = async () => {
    if (attendData?._id) {
      const { data, error } = await updateAttendance(formData)
      if (error) {
        alert(error)
      } else {
        alert('Attendance Successfull')
        handleGetScheduleByDate()
      }
    } else {
      const { data, error } = await storeAttendance(formData)
      if (error) {
        alert(error)
      } else {
        alert('Attendance Successfull')
        handleGetScheduleByDate()
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

  useEffect(() => {
    handleTimeChecker();
  }, []);

  return (
    <View>
      {isSchedAtive &&
        <Button icon="fingerprint" mode="contained" onPress={handleBiometricAuth}>
          Attendance
        </Button>
      }
      {!isSchedAtive &&
        <View style={{ gap: 15 }}>
          <Text style={styles.customText}>The schedule is not currently active. Please check the schedule.</Text>
          <View style={styles.cardContainer}>
            <Card style={styles.card}>
              <Card.Title title='AM IN' />
              <Card.Content>
                <Text style={styles.customText}>{schedData.amIn ? moment(schedData.amIn).format('hh:mm A') : 'No Schedule'}</Text>
              </Card.Content>
            </Card>
            <Card style={styles.card}>
              <Card.Title title='AM OUT' />
              <Card.Content>
                <Text style={styles.customText}>{schedData.amOut ? moment(schedData.amOut).format('hh:mm A') : 'No Schedule'}</Text>
              </Card.Content>
            </Card>
          </View>
          <View style={styles.cardContainer}>
            <Card style={styles.card}>
              <Card.Title title='PM IN' />
              <Card.Content>
                <Text style={styles.customText}>{schedData.pmIn ? moment(schedData.pmIn).format('hh:mm A') : 'No Schedule'}</Text>
              </Card.Content>
            </Card>
            <Card style={styles.card}>
              <Card.Title title='PM OUT' />
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
    padding: 20,
  },
  card: {
    padding: 20,
    width: '48%',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  centerText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dateText: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  customText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    marginTop: 10,
    fontSize: 18,
  },
});

export default AttendanceScreen;
