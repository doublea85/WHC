import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  Modal,
  Pressable,
} from "react-native";
import Dashboard from "../src/components/Dashboard";
import DateTimeForm from "../src/components/DateTimeForm";

function HomeScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View className="flex-1 relative">
      <Dashboard closeModal={closeModal} />

        <Modal
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
          animationType="slide"
          presentationStyle="pageSheet"
        >
            <Pressable
              onPress={() => setIsModalVisible(false)}
              className="flex items-center"
            >
              <Text className="text-lg font-bold mt-3 ">Close</Text>
            </Pressable>
            <DateTimeForm closeModal={closeModal} />
        </Modal>
      <Pressable
        onPress={() => setIsModalVisible(true)}
        className="absolute bottom-4 right-4 h-16 w-16 flex justify-center items-center rounded-full bg-red-800"
      >
        <Text className="text-white text-xl font-bold">+</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

export default HomeScreen;
