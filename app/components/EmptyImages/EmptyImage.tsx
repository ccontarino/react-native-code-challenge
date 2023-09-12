import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../Button/Button";
import { COLORS } from "../../../constants";
import { Link, router } from "expo-router";
import { ROUTES } from "../../../constants/constants";

function EmptyImages() {
  const takePicture = () => {
    router.push(ROUTES.SCREEN.CAMERA);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No images available</Text>
      <Text style={styles.text}>Plase Take a picture to see images here</Text>
      <Link href={ROUTES.SCREEN.CAMERA} asChild>
        <Button
          title="Take a picture"
          icon="camera"
          color="white"
          onPress={takePicture}
        />
      </Link>
    </View>
  );
}

export default EmptyImages;
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.dark,
    flex: 1,
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    maxWidth: 300,
    color: "white",
  },
});
