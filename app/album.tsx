import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { COLORS } from "../constants";
import SafeArea from "../components/SafeArea/SafeArea";
import * as MediaLibrary from "expo-media-library";
import CarouselComponent from "../components/Carousel/Carousel";
import EmptyImages from "../components/EmptyImages/EmptyImage";
function Album() {
  const [images, setImages] = useState([]);

  const getAlbumsAsync = async () => {
    try {
      const albums = await MediaLibrary.getAlbumsAsync();
      const CameraAlbumFound = albums.find(
        (album) => album.title === "galleryApp"
      );
      console.log(CameraAlbumFound);
      if (CameraAlbumFound) {
        const images = await MediaLibrary.getAssetsAsync({
          first: 30,
          album: CameraAlbumFound.id,
          sortBy: MediaLibrary.SortBy.creationTime,
        });
        setImages(images.assets);
        console.log(images.assets);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAlbumsAsync();
  }, []);

  return (
    <SafeArea>
      <View style={{ flex: 1, borderColor: "red", borderWidth: 1 }}>
        <>
          {images.length > 0 ? (
            <View style={{ width: "100%", alignItems: "center", flex: 1 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "DMBold",
                  color: COLORS.dark,
                  marginTop: 20,
                }}
              >
                Images
              </Text>
              <CarouselComponent images={images} />
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
