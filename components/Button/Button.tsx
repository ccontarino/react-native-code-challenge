import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { COLORS } from "../../constants";

function Button({ title, onPress, icon, color = "#fff" }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Entypo name={icon} size={28} color={color} />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 17,
    color: COLORS.white,
    marginLeft: 10,
  },
});
