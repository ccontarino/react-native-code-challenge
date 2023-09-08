import React from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "../constants";
import SafeArea from "../components/SafeArea/SafeArea";

function Album(props) {
  const insets = useSafeAreaInsets();
  return (
    <SafeArea
      style={{
        flex: 1,
        backgroundColor: COLORS.lightWhite,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <Text>album</Text>
    </SafeArea>
  );
}

export default Album;
