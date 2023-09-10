import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { COLORS, SIZES } from "../constants";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import Button from "../components/Button/Button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SafeArea from "../components/SafeArea/SafeArea";
import GoBack from "../components/GoBack/GoBack";
import useCameraPermission from "../hooks/useCameraPermission";
import { router } from "expo-router";

const Home = () => {
  // const [hasPermission, setHasPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = React.useRef(null);

  const hasPermission = useCameraPermission();

  if (hasPermission === false) {
    return <Text>No permission</Text>;
  }

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        setImage(photo.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const savePicture = async () => {
    if (image) {
      try {
        const isAlbumCreated = await MediaLibrary.getAlbumAsync("galleryApp");
        const asset = await MediaLibrary.createAssetAsync(image);
        if (!isAlbumCreated) {
          await MediaLibrary.createAlbumAsync("galleryApp", asset, false);
        }else{
          await MediaLibrary.addAssetsToAlbumAsync([asset], isAlbumCreated.id, false);
        }
        setImage(null);
        console.log("saved successfully");
        router.push("/album");

      } catch (error) {
        console.log(error);
      }
    }
  };

  const reTakepicture = () => {
    setImage(null);
  };

  const setFlashMode = () => {
    if (flash === Camera.Constants.FlashMode.off) {
      setFlash(Camera.Constants.FlashMode.on);
    } else {
      setFlash(Camera.Constants.FlashMode.off);
    }
  };
  const setTypeMode = () => {
    if (type === CameraType.back) {
      setType(CameraType.front);
    } else {
      setType(CameraType.back);
    }
  };

  return (
    <SafeArea>
      <View style={styles.homeContainer}>
        <GoBack />
        <View
          style={{
            flex: 0.8,
          }}
        >
          {!image ? (
            <Camera
              style={styles.camera}
              type={type}
              flashMode={flash}
              ref={cameraRef}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 30,
                }}
              >
                <Button
                  color={"white"}
                  title=""
                  icon="retweet"
                  onPress={setTypeMode}
                />
                <Button
                  onPress={setFlashMode}
                  title=""
                  icon="flash"
                  color={
                    flash === Camera.Constants.FlashMode.off
                      ? COLORS.gray
                      : COLORS.white
                  }
                />
              </View>
            </Camera>
          ) : (
            <Image source={{ uri: image }} style={styles.camera} />
          )}
        </View>
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
            <View style={{ flex: 0.5 }}>
              <Button
                onPress={reTakepicture}
                title={"Retake picture"}
                icon={"retweet"}
                color="white"
              />
            </View>
            <View style={{ flex: 0.5 }}>
              <Button
                onPress={savePicture}
                title={"Accept"}
                icon={"check"}
                color="white"
              />
            </View>
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
    </SafeArea>
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
    justifyContent: "flex-start",
    paddingTop: 40,
    objectFit: "contain",
  },
  homeContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  textContainer: {
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: SIZES.large,
  },
});
