import React, { useState, useEffect, useRef } from "react";
import { View, Text, FlatList, Pressable, Alert } from "react-native";
import {
  getAllDateTimeData,
  deleteDateTimeData,
  wipeDatabase,
} from "../../services/queries"; // Import your database functions
import Feather from "@expo/vector-icons/Feather";

import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import UpdateDateTimeForm from "./UpdateDateTimeForm";

// wipeDatabase();

const DateTimeList = ({ closeBottomSheet }) => {
  const [data, setData] = useState([]);
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  const bottomSheetModalRef = useRef(null);
  const snapPoints = ["52%"];;

  const handleCloseBottomSheet = () => {
    bottomSheetModalRef.current?.dismiss();
  };

  const openEditBottomSheet = (id) => {
    // Find the selected item by id in the data array
    const selectedDataItem = data.find((item) => item.id === id);

    // Check if selectedDataItem is defined before setting it as selectedDateTime
    if (selectedDataItem) {
      setSelectedDateTime(selectedDataItem);
    }

    bottomSheetModalRef.current?.present();
  };

  useEffect(() => {
    fetchData();
    // console.log(data)
  }, [handleCloseBottomSheet, closeBottomSheet]);

  const handleDelete = async (id) => {
    try {
      const result = await deleteDateTimeData(id, (rowsAffected) => {
        // Handle callback logic if needed
      });

      // Refresh the data after deletion
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const confirmDelete = (id) => {
    Alert.alert(
      "Delete Worked Hour",
      "Are you sure you want to delete this worked hour?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => handleDelete(id),
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  const fetchData = () => {
    getAllDateTimeData((result) => {
      setData(result);
    });
  };

  // Function to format hours to hh:mm
  const formatHours = (hours) => {
    const hrs = Math.floor(hours);
    const mins = Math.round((hours - hrs) * 60);
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}`;
  };

  const formatDate = (date) => {
    // Split the date string into an array ["2024", "01", "03"]
    const dateComponents = date.split("-");
    const formattedDateString = `${dateComponents[2]}-${dateComponents[1]}-${dateComponents[0]}`;

    return formattedDateString;
  }

  const groupDataByMonth = (data) => {
    const groupedData = {};
    data.forEach((item) => {
      const monthYearKey = item.startDate.slice(0, 7); // Extracting YYYY-MM to represent the month and year
      if (!groupedData[monthYearKey]) {
        groupedData[monthYearKey] = [];
      }
      groupedData[monthYearKey].push(item);
    });
    return groupedData;
  };

  const renderMonthItem = ({ item }) => (
    <View className="p-4">
      <Text className="font-bold mb-4">{item.monthLabel}</Text>
      <View className="flex flex-row flex-wrap gap-3 pt-2 pb-2 items-center bg-white shadow-sm rounded-md">
        {item.data.map((dataItem) => (
          <View
            key={dataItem.id}
            className="bg-white rounded-md p-1 flex items-center w-23 shadow-md"
          >
            <Text className="text-xs">{formatDate(dataItem.startDate.slice(0, 10))}</Text>
            <Text className="text-xs">{dataItem.startDate.slice(11, 16)}-{dataItem.endDate.slice(11, 16)}</Text>
            {/* <Text>{dataItem.timeDifference}</Text> */}
            <Text className="text-xs">
              {formatHours(parseFloat(dataItem.timeDifference))}h
            </Text>
            <View className="flex flex-row gap-5">
              <Pressable onPress={() => openEditBottomSheet(dataItem.id)}>
                <Feather name="edit" size={16} color="blue" />
              </Pressable>
              <Pressable onPress={() => confirmDelete(dataItem.id)}>
                <Feather name="trash" size={16} color="red" />
              </Pressable>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderSeparator = () => <View style={{ height: 8 }} />; // Adjust the height as needed

  const groupedData = groupDataByMonth(data);

  return (
    <GestureHandlerRootView className="flex-1 ">
      <BottomSheetModalProvider>
        <View className="flex" style={{ height: "100%" }}>
          <Text className="text-xl mx-auto p-1 border border-b-2">
            All worked hours
          </Text>
          <FlatList
            data={Object.keys(groupedData).map((monthKey) => ({
              monthLabel: monthKey,
              data: groupedData[monthKey],
            }))}
            keyExtractor={(item) => item.monthLabel}
            renderItem={renderMonthItem}
            ItemSeparatorComponent={renderSeparator}
            inverted // Show the latest items first
          />
        </View>

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
        >
          {/* DateTimeForm */}
          <UpdateDateTimeForm
            handleCloseBottomSheet={handleCloseBottomSheet}
            selectedDateTime={selectedDateTime} // Pass the selected item
          />
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default DateTimeList;
