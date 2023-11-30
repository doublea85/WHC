import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { getAllDateTimeData } from '../../services/queries';

const Dashboard = (closeModal) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch and set data when the component mounts
    getAllDateTimeData(
      (result) => {
        // console.log('Fetched data:', result);
        setData(result);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }, [closeModal]); // The empty dependency array ensures that the effect runs only once, similar to componentDidMount

  return (
    <View>
      <Text>Data from Database:</Text>
      {data.map((item) => (
        <View key={item.id}>
          <Text>Start Date: {item.startDate}</Text>
          <Text>End Date: {item.endDate}</Text>
          <Text>Time Difference: {item.timeDifference}</Text>
        </View>
      ))}
    </View>
  );
};

export default Dashboard;
