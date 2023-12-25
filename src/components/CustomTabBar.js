import React, { useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Pressable, Text } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



const Tab = createBottomTabNavigator();

function CustomTabBar({ state, descriptors, navigation, handlePresentModal }) {
  return (
    <View style={{ flexDirection: 'row', backgroundColor: '#3498db' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            key={index}
            onPress={onPress}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}
          >
            <Text style={{ color: isFocused ? '#fff' : '#ccc' }}>{label}</Text>
          </Pressable>
        );
      })}
      <Pressable
        onPress={handlePresentModal}
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}
      >
        <Feather name="plus" size={25} color="#fff" />
      </Pressable>
    </View>
  );
}