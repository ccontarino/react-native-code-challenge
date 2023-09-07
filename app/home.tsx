import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, FONT, SIZES } from "../constants";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import homeStyle from "./home.style";
import Button from "../components/ Button/Button";

const Home = () => {
  const router = useRouter();
  const [hasPermission, setHasPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = React.useRef(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === false) {
    return <Text>No permisson</Text>;
  }

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        console.log(photo);
        setImage(photo.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.lightWhite,
      }}
    >
      <View style={homeStyle.homeContainer}>
        <View style={homeStyle.textContainer}>
          <Text style={homeStyle.text}>App Camera</Text>
        </View>
        <Camera
          style={styles.camera}
          type={type}
          flashMode={flash}
          ref={cameraRef}
        >
          <View>
            {/* <Text style={{ color: COLORS.white }}>Hello</Text> */}
            <Button
              onPress={takePicture}
              title={"Take a picture"}
              icon={"camera"}
              color="white"
            ></Button>
          </View>
        </Camera>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    paddingBottom: 8,
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
