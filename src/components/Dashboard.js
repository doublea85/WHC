import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, Pressable, Button, Alert } from "react-native";
import { getAllDateTimeData, deleteDateTimeData } from "../../services/queries";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory-native";

const Dashboard = ({ closeModal }) => {
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
  }, [closeModal]);

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

  // Extract day from startDate for the VictoryBar chart
  const chartData = data.map((item) => ({
    day: new Date(item.startDate).toLocaleDateString("fr-FR", {
      weekday: "short",
    }),
    hoursWorked: parseFloat(item.timeDifference),
  }));

  return (
    <View className="flex-1 items-center">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View className="mb-4 bg-gray-200 p-4 rounded-lg flex">
          <Text className="text-lg font-bold mb-2">JOURS TRAVAILLES:</Text>
          {data.length === 0 ? (
            <Text className="text-gray-600 p-20">
              No worked hours available.
            </Text>
          ) : (
            data.map((item) => (
              <View
                key={item.id}
                className="mb-2 p-2 border border-gray-500 rounded flex flex-row items-center justify-between"
              >
                <View className="w-7/12 flex">
                  <Text className="text-lg">
                    {new Date(item.startDate).toLocaleDateString("fr-FR", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </Text>
                  <Text className="text-lg">
                    {formatHours(parseFloat(item.timeDifference))} hours worked
                  </Text>
                </View>

                <View className="flex-row items-center">
                  <Pressable className="bg-blue-500 w-16 h-12 p-4 flex justify-center mr-2 rounded">
                    <Text className="text-white font-bold text-center">
                      Edit
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => confirmDelete(item.id)}
                    className="bg-red-700 w-16 h-12 p-4 flex justify-center rounded"
                  >
                    <Text className="text-white font-bold text-center">
                      Delete
                    </Text>
                  </Pressable>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      <View className="flex-1 justify-center items-center bg-gray-200">
        <VictoryChart
          domainPadding={{ x: 20 }}
          className="w-full h-48 bg-white p-4 rounded-md elevation-3"
        >
          <VictoryAxis
            dependentAxis
            tickFormat={(tick) => (tick <= 12 ? `${tick}h` : "")}
            domain={[0, 12]} // Set the maximum hour to 12
            tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]} // Tick values for a scale of 1 hour
            style={{
              axis: { stroke: "black" },
              ticks: { stroke: "black" },
              tickLabels: { fontSize: 12, fill: "black" },
            }}
          />
          <VictoryAxis
            tickFormat={(tick) => ""} // Hide tick labels for the bottom axis
            style={{
              axis: { stroke: "black" },
              ticks: { stroke: "black" },
              tickLabels: { fontSize: 20, fill: "black" },
            }}
          />
          <VictoryBar
            data={chartData}
            x="day"
            y="hoursWorked"
            barWidth={({ index }) => index * 2 + 8}
            style={{
              data: { fill: "green", stroke: "green", strokeWidth: 1 },
              labels: { fontSize: 15, fill: "black" },
            }}
          />
        </VictoryChart>
      </View>
    </View>
  );
};

export default Dashboard;