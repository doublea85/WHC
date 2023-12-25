import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { getAllDateTimeData } from "../services/queries";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
} from "victory-native";

export default function ChartScreen() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch and set data when the component mounts
    getAllDateTimeData(
      (result) => {
        setData(result);
      },
      (error) => {
        console.error("Error fetching data:", error);
      }
    );
  }, []);

  // Filter data for the current week (Monday to Sunday)
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Calculate Monday of the current week
  const endOfWeek = new Date(today);
  endOfWeek.setDate(startOfWeek.getDate() + 6); // Calculate Sunday of the current week

  const chartDataWeek = data
    .filter((item) => {
      const itemDate = new Date(item.startDate);
      return itemDate >= startOfWeek && itemDate <= endOfWeek;
    })
    .map((item) => ({
      day: new Date(item.startDate)
        .toLocaleDateString("fr-FR", {
          weekday: "short",
        })
        .slice(0, 3), // Extract only the first 3 characters for short weekday names
      hoursWorked: parseFloat(item.timeDifference),
    }));



  /** ------------------------------------------------------- */
  // Function to sum data by week of the month
  const sumDataByWeek = (data) => {
    return data.reduce((acc, item) => {
      const weekNumber = getISOWeek(new Date(item.startDate));
      acc[weekNumber] = (acc[weekNumber] || 0) + parseFloat(item.timeDifference);
      return acc;
    }, {});
  };

  // Function to get ISO week number
  const getISOWeek = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    const weekNumber = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    return weekNumber;
  };

  // Filter data for the current month
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  const endOfMonth = new Date();
  endOfMonth.setMonth(endOfMonth.getMonth() + 1, 0);

  const filteredData = data.filter((item) => {
    const itemDate = new Date(item.startDate);
    return itemDate >= startOfMonth && itemDate <= endOfMonth;
  });

  const weeklySumData = sumDataByWeek(filteredData);

  const chartDataMonth = Object.keys(weeklySumData).map((weekNumber) => ({
    week: `Week ${weekNumber}`,
    hoursWorked: weeklySumData[weekNumber],
  }));

  return (
    <ScrollView>
      <View className="flex-1 bg-white m-3 rounded-md">
        <Text className="text-xl text-center w-30 mx-auto pr-1 pl-1">
          This week
        </Text>
        <VictoryChart domainPadding={{ x: 20 }} theme={VictoryTheme.material}>
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
            tickValues={chartDataWeek.map((_, index) => index + 1)}
            tickFormat={chartDataWeek.map((item) => item.day)}
          />
          <VictoryBar
            data={chartDataWeek}
            x="day"
            y="hoursWorked"
            barWidth={({ index }) => index * 2 + 8}
          />
        </VictoryChart>
      </View>

      <View className="flex-1 bg-white m-3 rounded-md">
        <Text className="text-xl text-center w-30 mx-auto pr-1 pl-1">
          This month
        </Text>
        <VictoryChart theme={VictoryTheme.material} domainPadding={15}>
          <VictoryBar
            style={{ data: { fill: "#c43a31" } }}
            data={chartDataMonth}
            x="week"
            y="hoursWorked"
            barWidth={({ index }) => index * 2 + 8}
          />
        </VictoryChart>
      </View>
    </ScrollView>
  );
}



// import React, { useEffect, useState, ScrollView } from "react";
// import { View, Text } from "react-native";
// import { getAllDateTimeData } from "../services/queries";
// import {
//   VictoryBar,
//   VictoryChart,
//   VictoryAxis,
//   VictoryTheme,
// } from "victory-native";

// export default function ChartScreen() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     // Fetch and set data when the component mounts
//     getAllDateTimeData(
//       (result) => {
//         setData(result);
//       },
//       (error) => {
//         console.error("Error fetching data:", error);
//       }
//     );
//   }, []);

//   // Filter data for the current week (Monday to Sunday)
//   const today = new Date();
//   const startOfWeek = new Date(today);
//   startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Calculate Monday of the current week
//   const endOfWeek = new Date(today);
//   endOfWeek.setDate(startOfWeek.getDate() + 6); // Calculate Sunday of the current week

//   const chartData = data
//     .filter((item) => {
//       const itemDate = new Date(item.startDate);
//       return itemDate >= startOfWeek && itemDate <= endOfWeek;
//     })
//     .map((item) => ({
//       day: new Date(item.startDate)
//         .toLocaleDateString("fr-FR", {
//           weekday: "short",
//         })
//         .slice(0, 3), // Extract only the first 3 characters for short weekday names
//       hoursWorked: parseFloat(item.timeDifference),
//     }));

//   // console.log("Filtered Data:", chartData); // Log filtered data for debugging

//   return (
//     <ScrollView>
//       <View className="flex-1 flex bg-white">
//         <Text className="text-xl text-center border">This week</Text>
//         <VictoryChart domainPadding={{ x: 20 }} theme={VictoryTheme.material}>
//           <VictoryAxis
//             dependentAxis
//             tickFormat={(tick) => (tick <= 12 ? `${tick}h` : "")}
//             domain={[0, 10]}
//             tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
//             style={{
//               axis: { stroke: "black" },
//               ticks: { stroke: "black" },
//               tickLabels: { fontSize: 12, fill: "black" },
//             }}
//           />
//           <VictoryAxis
//             tickValues={chartData.map((_, index) => index + 1)}
//             tickFormat={chartData.map((item) => item.day)}
//           />
//           <VictoryBar
//             data={chartData}
//             x="day"
//             y="hoursWorked"
//             barWidth={({ index }) => index * 2 + 8}
//           />
//         </VictoryChart>
//       </View>

//       <View className="flex-1">
//       <Text className="text-xl text-center border">This month</Text>
//         <VictoryChart theme={VictoryTheme.material} domainPadding={10}>
//           <VictoryBar style={{ data: { fill: "#c43a31" } }} data={""} />
//         </VictoryChart>
//       </View>
//     </ScrollView>
//   );
// }
