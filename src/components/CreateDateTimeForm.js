import React, { useState, useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { addDateTimeData } from "../../services/queries"; // Import your database functions

const CreateDateTimeForm = ({ closeBottomSheet }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [timeDifference, setTimeDifference] = useState('');

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

  useEffect(() => {
    const difference = calculateDifference(startDate, endDate);
    setTimeDifference(difference);
  }, [startDate, endDate]);

  const saveData = () => {
    addDateTimeData(
      startDate.toISOString(),
      endDate.toISOString(),
      timeDifference,
      (insertedId) => {
        // console.log("Data saved successfully with ID:", insertedId);
        closeBottomSheet();
      }

    );

    closeBottomSheet()

    // console.log("Data saved successfully");
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
            <Text className="text-xl text-white">Save</Text>
        </Pressable>

    </View>
  );
};

export default CreateDateTimeForm;
