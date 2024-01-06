import React, { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { updateDateTimeData } from "../../services/queries";

const UpdateDateTimeForm = ({ selectedDateTime, handleCloseBottomSheet }) => {
  const [startDate, setStartDate] = useState(new Date(selectedDateTime.startDate));
  const [endDate, setEndDate] = useState(new Date(selectedDateTime.endDate));
  const [timeDifference, setTimeDifference] = useState(selectedDateTime.timeDifference);

  useEffect(() => {
    setStartDate(new Date(selectedDateTime.startDate));
    setEndDate(new Date(selectedDateTime.endDate));
    setTimeDifference(selectedDateTime.timeDifference);
  }, [selectedDateTime]);

  const handleStartDateChange = (event, selectedDate) => {
    if (selectedDate) setStartDate(selectedDate);
  };

  const handleEndDateChange = (event, selectedDate) => {
    if (selectedDate) setEndDate(selectedDate);
  };

  const calculateDifference = (startDateTimestamp, endDateTimestamp) => {
    const durationMilliseconds = endDateTimestamp - startDateTimestamp;
    const durationHours = Math.floor(durationMilliseconds / (1000 * 60 * 60));
    const durationMinutes = Math.floor((durationMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const formattedDuration = `${durationHours} hours ${durationMinutes} minutes`;
    return formattedDuration;
  };

  const saveData = () => {
    // Use selectedDateTime.id instead of dataToUpdate.id
    updateDateTimeData(
      selectedDateTime.id,
      startDate.toISOString(),
      endDate.toISOString(),
      calculateDifference(startDate, endDate),
      (rowsAffected) => {
        if (rowsAffected > 0) handleCloseBottomSheet();
      }
    );
  };

  

  return (
    <View className="flex-1 gap-5 items-center">
        <Text className="text-lg">Add new date</Text>
        <View className="flex items-center">
            <Text className="text-lg">FROM</Text>
            <DateTimePicker
                value={startDate}
                mode="datetime"
                display="default"
                onChange={handleStartDateChange}
            />
        </View>
        <View className="flex items-center">
            <Text className="text-lg">TO</Text>
            <DateTimePicker
                value={endDate}
                mode="datetime"
                display="default"
                onChange={handleEndDateChange}
            />
        </View>

        <Text className="text-lg font-bold mb-2">Time Difference: {calculateDifference(startDate, endDate)}</Text>

        <Pressable
            title="Save" 
            onPress={saveData}
            className="bg-green-600 h-10 w-20 rounded-3xl flex justify-center items-center"
        >
            <Text className="text-xl text-white">Update</Text>
        </Pressable>

    </View>
  );
};

export default UpdateDateTimeForm;