import { Stack } from "expo-router";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();
export default function HomeLayout() {
  const [fontsLoaded] = useFonts({
    DMbold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMmedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMregular: require("../assets/fonts/DMSans-Regular.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return <Stack onLayout={onLayoutRootView} />;
}
