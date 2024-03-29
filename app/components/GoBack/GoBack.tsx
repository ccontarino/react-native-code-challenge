import React from "react";
import Button from "../Button/Button";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { ROUTES } from "../../../constants/constants";

function GoBack() {
  const goBack = () => {
    router.push(ROUTES.SCREEN.HOME);
  };
  return (
    <View style={styles.container}>
      <Button title="" icon="arrow-left" color="white" onPress={goBack} />
    </View>
  );
}

export default GoBack;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingTop: 15,
    alignItems: "flex-start",
    justifyContent: "center",
  },
});
