import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Pressable,
  Alert,
  FlatList,
} from "react-native";
import { getAllDateTimeData, deleteDateTimeData } from "../../services/queries";
import Feather from "@expo/vector-icons/Feather";

const Dashboard = ({ closeBottomSheet }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch and set data when the component mounts
    getAllDateTimeData(
      (result) => {
        // Sort the data by startDate in descending order (latest first)
        const sortedData = result.sort(
          (a, b) => new Date(b.startDate) - new Date(a.startDate)
        );
        setData(sortedData);
        // console.log(sortedData)
      },

      (error) => {
        console.error("Error fetching data:", error);
      }
    );
  }, [handleDelete, closeBottomSheet]);

  const handleDelete = async (id) => {
    try {
      await deleteDateTimeData(id);
      // Refresh the data after deletion
      getAllDateTimeData(
        (result) => {
          setData(result);
        },
        (error) => {
          console.error("Error fetching data:", error);
        }
      );
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  // Function to format hours to hh:mm
  const formatHours = (hours) => {
    const hrs = Math.floor(hours);
    const mins = Math.round((hours - hrs) * 60);
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}`;
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

  // Group data by month
  const groupedData = data.reduce((acc, item) => {
    const monthKey = new Date(item.startDate).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "numeric",
    });
    acc[monthKey] = acc[monthKey] || [];
    acc[monthKey].push(item);
    return acc;
  }, {});

  // Convert the grouped data to an array
  const groupedArray = Object.entries(groupedData).map(([month, items]) => ({
    month,
    items,
  }));

  // Function to format date to 'HH:mm' (hour and minute)
const getFormattedTime = (dateString) => {
  const date = new Date(dateString);
  const options = { hour: "numeric", minute: "numeric" };
  return date.toLocaleTimeString("en-US", options);
};

  return (
    <View className="p-2 flex w-full rounded-md">
      <Text className="text-lg font-bold mb-2">JOURS TRAVAILLES :</Text>

      <FlatList
        data={groupedArray}
        keyExtractor={(item) => item.month}
        renderItem={({ item }) => (
          <View key={item.month}>
            <Text
              className="mt-3"
            >
              {item.month}
            </Text>
            <FlatList
              data={item.items}
              numColumns={3}
              keyExtractor={(innerItem) => innerItem.id.toString()}
              renderItem={({ item: innerItem }) => (
                <View
                  key={innerItem?.id}
                  className="flex-1 flex justify-between items-center m-1 p-1 bg-white rounded-md h-24 w-24"
                >
                  {innerItem && (
                    <View
                      className="flex justify-between items-center"
                    >
                      <View className="flex-1 flex items-center">
                        <Text className="text-base">
                          {new Date(innerItem.startDate).toLocaleDateString(
                            "fr-FR",
                            {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </Text>
                        <Text className="font-bold text-xs">
                          {formatHours(parseFloat(innerItem.timeDifference))} H
                        </Text>
                        <Text>
                          {getFormattedTime(innerItem.startDate)} - {getFormattedTime(innerItem.endDate)}
                          </Text>
                      </View>
                      <View
                        className="flex flex-row items-center gap-6"
                      >
                        <Pressable>
                          <Feather name="edit" size={20} color="blue" />
                        </Pressable>
                        <Pressable onPress={() => confirmDelete(innerItem.id)}>
                          <Feather name="trash" size={20} color="red" />
                        </Pressable>
                      </View>
                    </View>
                  )}
                </View>
              )}
            />
          </View>
        )}
      />
    </View>
  );
};

export default Dashboard;