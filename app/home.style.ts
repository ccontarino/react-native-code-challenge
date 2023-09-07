import { StyleSheet } from "react-native";
import { SIZES } from "../constants";

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
  },
  textContainer: {
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: SIZES.large,
  },
});
export default styles;