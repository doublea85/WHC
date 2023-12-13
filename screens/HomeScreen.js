import React, { useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Pressable } from "react-native";
import Dashboard from "../src/components/Dashboard";
import DateTimeForm from "../src/components/DateTimeForm";
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Feather from '@expo/vector-icons/Feather';



function HomeScreen() {
  const bottomSheetModalRef = useRef(null);
  const snapPoints = ["48%"];

  const handlePresentModal = () => {
    bottomSheetModalRef.current?.present();
  }

  const closeBottomSheet = () => {
    bottomSheetModalRef.current?.dismiss();
  }

  return (
    <GestureHandlerRootView className="flex-1 ">
      <BottomSheetModalProvider>
        <View className="flex-1 relative">
          {/* Dashbord */}
          <Dashboard closeBottomSheet={closeBottomSheet}/>

          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
          >
            {/* DateTimeForm */}
            <DateTimeForm closeBottomSheet={closeBottomSheet}/>
          </BottomSheetModal>

          <Pressable
            onPress={handlePresentModal}
            className="absolute bottom-4 right-4 h-16 w-16 flex justify-center items-center rounded-full bg-red-800"
          >
            <Feather name="plus" size={25} color="white" />
          </Pressable>

          <StatusBar style="auto" />
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

export default HomeScreen;