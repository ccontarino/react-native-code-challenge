import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../components/Button/Button";
import { COLORS } from "../constants";
import SafeArea from "../components/SafeArea/SafeArea";
import * as MediaLibrary from "expo-media-library";
import CarouselComponent from "../components/Carousel/Carousel";
import EmptyImages from "../components/EmptyImages/EmptyImage";
import { router } from "expo-router";

function Album() {
  const [images, setImages] = useState([]);

  const getAlbumsAsync = async () => {
    try {
      const albums = await MediaLibrary.getAlbumsAsync();

      console.log(albums, "###");

      const CameraAlbumFound = albums.find(
        (album) => album.title === "galleryApp"
      );

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
    router.push("/home");
  };

  return (
    <SafeArea>
      <View style={{ flex: 1 }}>
        <>
          {images.length > 0 ? (
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <View style={styles.containerTitle}>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: "DMBold",
                    color: COLORS.dark,
                  }}
                >
                  Images
                </Text>
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
      </View>
    </SafeArea>
  );
}

export default Album;

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
});
