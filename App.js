import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Modal, Button, Pressable } from "react-native";
import DateTimeForm from "./src/components/DateTimeForm";
import Dashboard from "./src/components/Dashboard";

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <View>
        <Pressable
          style={styles.button}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={styles.text}>+</Text>
        </Pressable>
        <Modal
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
          animationType="slide"
          presentationStyle="pageSheet"
        >
            <View style={styles.container}>
              <Button
                title="close"
                color="midnightblue"
                onPress={() => setIsModalVisible(false)}
              />
              <DateTimeForm />
            </View>
        </Modal>
      </View>
      <Dashboard/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 50,
    borderRadius: 50,
    elevation: 3,
    backgroundColor: "midnightblue",
    position: "absolute",
    top: 330,
    left: 120,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: "white",
  },
});
