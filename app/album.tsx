import React, { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "../constants";
import SafeArea from "../components/SafeArea/SafeArea";
import * as MediaLibrary from "expo-media-library";

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
        <View style={{ width: "100%", alignItems: "center" }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "DMBold",
              color: COLORS.dark,
              marginTop: 20,
            }}
          >
            Gallery
          </Text>
          <View style={{ flexDirection: "row" }}>
            {images && (
              <FlatList
                data={images}
                renderItem={({ item }) => {
                  return (
                    <View
                      style={{
                        width: "100%",
                        padding: 10,
                        height: 200,
                        borderColor: "red",
                        borderWidth: 1,
                      }}
                    >
                      <Image
                        source={{ uri: item.uri }}
                        style={{
                          width: "100%",
                          height: "100%",
                          resizeMode: "cover",
                        }}
                      />
                    </View>
                  );
                }}
                keyExtractor={(item) => item.id}
              />
            )}
          </View>
        </View>
      </View>
    </SafeArea>
  );
}

export default Album;
