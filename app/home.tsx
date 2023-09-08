import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, FONT, SIZES } from "../constants";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import homeStyle from "./home.style";
import Button from "../components/ Button/Button";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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

  const savePicture = async () => {
    if (image) {
      try {
        const asset = await MediaLibrary.createAssetAsync(image);
        alert("Picture saved! 🎉");
        setImage(null);
        console.log("saved successfully");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const reTakepicture = () => {
    setImage(null);
  };
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.lightWhite,
        marginTop: insets.top,
      }}
    >
      <View style={homeStyle.homeContainer}>
        <View style={homeStyle.textContainer}>
          <Text style={homeStyle.text}>App Camera</Text>
        </View>

        {!image ? (
          <Camera
            style={styles.camera}
            type={type}
            flashMode={flash}
            ref={cameraRef}
          ></Camera>
        ) : (
          <Image source={{ uri: image }} style={styles.camera} />
        )}
        {image ? (
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              flex: 0.2,
              justifyContent: "space-around",
            }}
          >
            <Button
              onPress={reTakepicture}
              title={"Retake picture"}
              icon={"retweet"}
              color="white"
            />
            <Button
              onPress={savePicture}
              title={"Accept"}
              icon={"check"}
              color="white"
            />
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              flex: 0.2,
            }}
          >
            <Button
              onPress={takePicture}
              title={"Take a picture"}
              icon={"camera"}
              color="white"
            />
          </View>
        )}
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
    flex: 0.9,
    justifyContent: "flex-end",
  },
});
