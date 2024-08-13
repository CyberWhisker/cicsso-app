import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { useTheme, Card } from 'react-native-paper';

// Function to format month names
const getMonthName = (date) => {
  const options = { month: 'long', year: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

const CustomCalendar = () => {
    const timestamp = '2024-08-13T08:06:04.252Z';
    const currentDate = new Date(timestamp).toISOString().split('T')[0];

    const { colors } = useTheme(); // Use theme colors from React Native Paper
    const [selectedDate, setSelectedDate] = useState(null);

    // Example highlight dates
    const markedDates = {
        [currentDate] : {
            selected: true,
            marked: true,
            selectedColor: 'red',
            dotColor: 'red',
        },
        '2024-01-01': { selected: true, marked: true, dotColor: colors.accent },
        '2024-01-02': { selected: true, marked: true, dotColor: colors.accent },
        '2024-01-03': { selected: true, marked: true, dotColor: colors.accent },
        '2024-01-04': { selected: true, marked: true, dotColor: colors.accent },
    };

    const renderHeader = (date) => {
        const monthName = getMonthName(date);
        return (
        <View style={styles.header}>
            <Text style={[styles.headerText, { color: colors.text }]}>{monthName}</Text>
        </View>
        );
    };

    const navigation = useNavigation();
    return (
        <Card style={styles.container}>
            <View style={{borderRadius: '10%', overflow: 'hidden'}}>
                <CalendarList
                    current={currentDate}
                    minDate={'2023-01-01'}
                    maxDate={'2025-12-31'}
                    monthFormat={'yyyy MM'}
                    markedDates={markedDates}
                    onDayPress={(day) => navigation.navigate('Attendance', { selectedDate: day.dateString })}
                    horizontal={true}
                    renderHeader={renderHeader}
                    theme={{
                        color: 'white'
                    }}
                />
                {selectedDate && (
                    <View style={styles.selectedDateContainer}>
                    <Text style={styles.selectedDateText}>Selected Date: {selectedDate}</Text>
                    </View>
                )}
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333', // Dark background for Card
  },
  header: {
    padding: 10,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  selectedDateContainer: {
    marginTop: 20,
  },
  selectedDateText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CustomCalendar;
