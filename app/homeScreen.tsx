import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../components/Button/Button";
import { COLORS } from "../constants";
import SafeArea from "../components/SafeArea/SafeArea";
import * as MediaLibrary from "expo-media-library";
import CarouselComponent from "../components/Carousel/Carousel";
import EmptyImages from "../components/EmptyImages/EmptyImage";
import { router } from "expo-router";
import { ALBUM, ROUTES } from "../constants/constants";
import useCameraPermission from "../hooks/useCameraPermission";
import NoPermissionText from "../components/NoPermissionText/NoPermissionText";

function HomeScreen() {
  const [images, setImages] = useState([]);
  const hasPermission = useCameraPermission();
  const getAlbumsAsync = async () => {
    try {
      const albums = await MediaLibrary.getAlbumsAsync();

      const CameraAlbumFound = albums.find((album) => album.title === ALBUM.ID);

      if (CameraAlbumFound) {
        const images = await MediaLibrary.getAssetsAsync({
          first: 20,
          album: CameraAlbumFound.id,
          sortBy: MediaLibrary.SortBy.creationTime,
        });

        setImages(images.assets);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAlbumsAsync();
  }, []);

  const takePicture = () => {
    router.push(ROUTES.SCREEN.CAMERA);
  };

  return (
    <SafeArea>
      <View style={{ flex: 1 }}>
        {hasPermission ? (
          <>
            {images.length > 0 ? (
              <View style={styles.imageContainer}>
                <View style={styles.containerTitle}>
                  <Text style={styles.textImage}>Images</Text>
                </View>
                <View style={styles.images}>
                  <CarouselComponent images={images} />
                  <View style={styles.takePicture}>
                    <Button
                      onPress={takePicture}
                      icon="camera"
                      title="Take a picture"
                      color={"black"}
                    />
                  </View>
                </View>
              </View>
            ) : (
              <EmptyImages />
            )}
          </>
        ) : (
          <NoPermissionText />
        )}
      </View>
    </SafeArea>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  images: {
    flex: 1,
  },
  containerTitle: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flex: 0.1,
    backgroundColor: COLORS.lightWhite,
  },
  takePicture: {
    justifyContent: "flex-start",
    flex: 0.3,
  },
  imageContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  textImage: {
    fontSize: 20,
    fontFamily: "DMBold",
    color: COLORS.dark,
  },
});
