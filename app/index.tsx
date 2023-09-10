import { Redirect } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ROUTES } from "../constants/constants";

export default function Index() {
  return (
    <SafeAreaProvider>
      <Redirect href={ROUTES.SCREEN.HOME} />
    </SafeAreaProvider>
  );
}
