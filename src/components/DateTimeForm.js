
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { initDatabase } from '../../services/db';
import { saveDateTimeData } from '../../services/queries';

initDatabase(); // Initialize the database when the app starts

export default function DateTimeForm({ closeModal }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [timeDifference, setTimeDifference] = useState('');
  
  const onChangeSd = (_, selectedDate) => {
    setStartDate(selectedDate || startDate);
  };
  
  const onChangeEd = (_, selectedDate) => {
    setEndDate(selectedDate || endDate);
  };

  const calculateDifference = (startDateTimestamp, endDateTimestamp) => {
    const durationMilliseconds = endDateTimestamp - startDateTimestamp;
    const durationHours = Math.floor(durationMilliseconds / (1000 * 60 * 60));
    const durationMinutes = Math.floor((durationMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const formattedDuration = `${durationHours} hours ${durationMinutes} minutes`;
    return formattedDuration;
  };

  const saveData = () => {
    saveDateTimeData(startDate, endDate, timeDifference, () => {
      // Success callback
      // You can add any logic you want to execute after saving the data successfully
      closeModal(); // Close the modal
    }, (error) => {
      // Error callback
      console.error('Error saving data:', error);
      // Handle the error as needed
    });
  };

  useEffect(() => {
    const difference = calculateDifference(startDate, endDate);
    setTimeDifference(difference);
  }, [startDate, endDate]);

  return (
    <View style={styles.container}>
      <View style={styles.group}>
        <Text style={styles.titles}>FROM</Text>
        <View style={styles.pickers}>
          <DateTimePicker
            value={startDate}
            mode={"date"}
            is24Hour={true}
            onChange={onChangeSd}
          />
          <DateTimePicker
            value={startDate}
            mode={"time"}
            is24Hour={true}
            onChange={onChangeSd}
          />
        </View>
      </View>

      <View style={styles.group}>
        <Text style={styles.titles}>TO</Text>
        <View style={styles.pickers}>
          <DateTimePicker
            value={endDate}
            mode={"date"}
            is24Hour={true}
            onChange={onChangeEd}
          />
          <DateTimePicker
            value={endDate}
            mode={"time"}
            is24Hour={true}
            onChange={onChangeEd}
          />
        </View>
      </View>

      {/*<Text>{startDate.toLocaleString()}</Text>
      <Text>{endDate.toLocaleString()}</Text> */}
      <Text style={styles.titles}>Time Difference: {calculateDifference(startDate, endDate)}</Text>
      <Pressable 
        style={styles.button} 
        onPress={saveData}
      >
        <Text style={styles.buttonText}>Save</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: 30,
    width: "100%",
    backgroundColor: "beige",
    alignItems: "center",
    justifyContent: "center",
  },
  pickers: {
    flexDirection: "row",
  },
  titles: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  group: {
    flexDirection: "row",
    rowGap: 5,
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 80,
    borderRadius: 5,
    elevation: 3,
    backgroundColor: "lightblue",
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  }
});
