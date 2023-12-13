import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, Pressable, Button, Alert } from "react-native";
import { getAllDateTimeData, deleteDateTimeData } from "../../services/queries";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
} from "victory-native";
import Feather from '@expo/vector-icons/Feather';

const Dashboard = ({ closeBottomSheet }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch and set data when the component mounts
    getAllDateTimeData(
      (result) => {
        // console.log("Fetched data:", result);
        setData(result);
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

  const chartData = data.map((item) => ({
    day: new Date(item.startDate)
      .toLocaleDateString("fr-FR", {
        weekday: "short",
      })
      .slice(0, 3), // Extract only the first 3 characters for short weekday names
    hoursWorked: parseFloat(item.timeDifference),
  }));

  return (
    <View className="flex-1 items-center p-2">
      <View className="p-2 flex max-h-96 w-full rounded-md">
        <Text className="text-lg font-bold mb-2">JOURS TRAVAILLES :</Text>
        <ScrollView
          style={{
            padding: 1,
            borderRadius: 4,
            height: "80%",
          }}
        >
          {data.map((item) => (
            <View
              key={item.id}
              className="mb-2 p-2 bg-white flex flex-row items-center justify-between rounded-md border border-slate-400"
            >
              <View className="flex">
                <Text className="text-lg">
                  {new Date(item.startDate).toLocaleDateString("fr-FR", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </Text>
                <Text className="text-lg font-bold">
                  {formatHours(parseFloat(item.timeDifference))} H worked
                </Text>
              </View>

              <View className="flex-row items-center">
                <Pressable className="bg-blue-500 p-2 flex justify-center mr-2 rounded">
                  <Feather name="edit" size={20} color="white" />
                </Pressable>
                <Pressable
                  onPress={() => confirmDelete(item.id)}
                  className="bg-red-700 p-2 flex justify-center rounded"
                >
                  <Feather name="trash" size={20} color="white" />
                </Pressable>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <View className="flex-1 flex p-2">
        <VictoryChart 
          domainPadding={{ x: 20 }} 
          theme={VictoryTheme.material}
          >
          <VictoryAxis
            dependentAxis
            tickFormat={(tick) => (tick <= 12 ? `${tick}h` : "")}
            domain={[0, 10]}
            tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            style={{
              axis: { stroke: "black" },
              ticks: { stroke: "black" },
              tickLabels: { fontSize: 12, fill: "black" },
            }}
          />
          <VictoryAxis
            tickValues={chartData.map((item, index) => index + 1)}
            tickFormat={chartData.map((item) => item.day)}
          />
          <VictoryBar
            data={chartData}
            x="day"
            y="hoursWorked"
            barWidth={({ index }) => index * 2 + 8}
          />
        </VictoryChart>
      </View>
    </View>
  );
};

export default Dashboard;
