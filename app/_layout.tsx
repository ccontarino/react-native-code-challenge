import { Slot, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { COLORS } from "../constants";
import { ROUTES } from "../constants/constants";
// import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "home",
};

const Layout = () => {
  const [fontsLoaded] = useFonts({
    DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <Slot />;
  }

  return (
    <Stack initialRouteName={ROUTES.SCREEN.HOME}>
      <Stack.Screen
        name={ROUTES.SCREEN.CAMERA}
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerTitle: "",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={ROUTES.SCREEN.HOME}
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerTitle: "",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default Layout;
