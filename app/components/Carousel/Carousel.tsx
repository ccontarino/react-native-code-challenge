import React, { useRef, useState, useEffect } from "react";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";

const { width: screenWidth } = Dimensions.get("window");

const CarouselComponent = ({ images = null }) => {

  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };



  const renderItem = ({ item, index }, parallaxProps) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{ uri: item.uri }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          showSpinner={true}
          {...parallaxProps}

        />      
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goForward}></TouchableOpacity>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 60}
        data={images}
        renderItem={renderItem}
        hasParallaxImages={true}
      />
    </View>
  );
};

export default CarouselComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "contain",
  },
});
