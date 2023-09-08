import React from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "../constants";
import SafeArea from "../components/SafeArea/SafeArea";

function Album(props) {
  return (
    <SafeArea>
      <Text>album</Text>
    </SafeArea>
  );
}

export default Album;
