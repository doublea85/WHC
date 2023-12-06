import HomeScreen from "./screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const stack = createNativeStackNavigator();

export default function App() {


  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen 
          name="Home"
          component={HomeScreen}
        />
      </stack.Navigator>
    </NavigationContainer>
    // <View className="flex-1 flex justify-center items-center bg-slate-500 absolute">
    //   <View className="flex-1 flex justify-center items-center">
    //     <Pressable
    //       onPress={() => setIsModalVisible(true)}
    //       className="relative h-20 w-20 flex justify-center items-center rounded-full bg-red-800"
    //     >
    //       <Text>+</Text>
    //     </Pressable>
    //     <Modal
    //       visible={isModalVisible}
    //       onRequestClose={() => setIsModalVisible(false)}
    //       animationType="slide"
    //       presentationStyle="pageSheet"
    //     >
    //         <View>
    //           <Button
    //             title="close"
    //             color="midnightblue"
    //             onPress={() => setIsModalVisible(false)}
    //           />
    //           <DateTimeForm closeModal={closeModal} />
    //         </View>
    //     </Modal>
    //   </View>
    //   <View>
    //     <Dashboard closeModal={closeModal}/>
    //   </View>
    //   <StatusBar style="auto" />
    // </View>
  );
}
