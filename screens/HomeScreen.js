import React, { useEffect, useRef, useState } from "react";
import { View, Pressable } from "react-native";
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Feather from '@expo/vector-icons/Feather';
import CreateDateTimeForm from "../src/components/CreateDateTimeForm";
import DateTimeList from "../src/components/DateTimeList";



function HomeScreen() {
  const bottomSheetModalRef = useRef(null);
  const snapPoints = ["52%"];


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
          <DateTimeList closeBottomSheet={closeBottomSheet}/>

          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
          >
            <CreateDateTimeForm closeBottomSheet={closeBottomSheet}/>
          </BottomSheetModal>

          <Pressable
            onPress={handlePresentModal}
            className="absolute right-4 top-3 flex justify-center items-center bg-red-800 z-10 rounded-md h-6 w-6"
          >
            <Feather name="plus" size={25} color="white" />
          </Pressable>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

export default HomeScreen;