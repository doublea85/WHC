import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import Feather from '@expo/vector-icons/Feather';
import ChartScreen from "./screens/ChartScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#2c3e50", // Background color of the tab bar
            // position: 'absolute',
            // bottom: 20,
            // left: 10,
            // right: 10,
            // elevation: 0,
            // borderBottomRightRadius: 20,
            // borderBottomLeftRadius: 20,
            paddingTop: 15
          },
          tabBarActiveTintColor: "#3498db", // Active tab icon color
          tabBarInactiveTintColor: "#bdc3c7", // Inactive tab icon color
          tabBarShowLabel: false, // Hide labels// Align content in the center
        }}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="home" size={35} color={color} />
            ),
          }}
        />
        <Tab.Screen 
          name="Charts" 
          component={ChartScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="pie-chart" size={35} color={color} />
            ),
          }}
        />
        {/* <Tab.Screen 
          name="Settings" 
          component={ChartScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="settings" size={35} color={color} />
            ),
          }}
        /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
