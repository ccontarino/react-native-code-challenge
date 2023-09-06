import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS } from "../constants";

export default function Home() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS.lightWhite,
          
            shadowOpacity: 0,
          },
          headerTitle: "",
          headerShadowVisible: false,
          
        }}
      >
        <Text>asddsa, world!</Text>
      </Stack.Screen>
    </SafeAreaView>
  );
}
