import React from "react";
import { View } from "react-native";
import { COLORS } from "../../../constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function SafeArea(props) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.lightWhite,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      {props.children}
    </View>
  );
}

export default SafeArea;
