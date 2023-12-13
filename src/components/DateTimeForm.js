
import React, { useState, useEffect } from 'react';
import { Text, View, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { initDatabase } from '../../services/db';
import { saveDateTimeData } from '../../services/queries';

initDatabase(); // Initialize the database when the app starts

export default function DateTimeForm({ closeBottomSheet }) {

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
      
      closeBottomSheet()
    }, (error) => {
      console.error('Error saving data:', error);
    });
  };

  useEffect(() => {
    const difference = calculateDifference(startDate, endDate);
    setTimeDifference(difference);
  }, [startDate, endDate]);

  return (
    <View className="flex-1 justify-center items-center p-6 bg-beige">
      <View className="mb-8 flex-row">
        <Text className="text-lg font-bold">FROM: </Text>
        <View className="flex-row">
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

      <View className="mb-8 flex-row">
        <Text className="text-lg font-bold mr-8">TO: </Text>
        <View className="flex-row">
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
      <Text className="text-lg font-bold mb-2">Time Difference: {calculateDifference(startDate, endDate)}</Text>
      <Pressable
        onPress={saveData}
        className="bg-green-500 rounded-xl pt-2 pb-2 pr-6 pl-6"
      >
        <Text className="text-white text-xl font-bold">Save</Text>
      </Pressable>
    </View>
  );
}
