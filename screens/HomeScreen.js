import React, { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Pressable } from "react-native";
import Dashboard from "../src/components/Dashboard";
import DateTimeForm from "../src/components/DateTimeForm";
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Feather from '@expo/vector-icons/Feather';



function HomeScreen() {
  const bottomSheetModalRef = useRef(null);
  const snapPoints = ["40%"];

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);


  const handlePresentModal = () => {
    bottomSheetModalRef.current?.present();
    setIsBottomSheetOpen(true);
  }

  const closeBottomSheet = () => {
    bottomSheetModalRef.current?.dismiss();
    setIsBottomSheetOpen(false);
  }

  useEffect(() => {
  }, [closeBottomSheet]);

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
            className="absolute right-4 top-3 flex justify-center items-center bg-red-800 z-10 rounded-md h-6 w-6"
          >
            <Feather name="plus" size={25} color="white" />
          </Pressable>


          {/* {isBottomSheetOpen ? null : (
            <Pressable
              onPress={handlePresentModal}
              className="absolute right-4 top-3 flex justify-center items-center bg-red-800 z-10 rounded-md h-6 w-6"
            >
              <Feather name="plus" size={20} color="white" />
            </Pressable>
          )} */}

          <StatusBar style="auto" />
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

export default HomeScreen;