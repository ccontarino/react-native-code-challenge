import React from "react";
import { StyleSheet, Text, View } from "react-native";

function NoPermissionText() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>You don't have camera Permission</Text>
    </View>
  );
}

export default NoPermissionText;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
  },
});
