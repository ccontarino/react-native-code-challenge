import { StyleSheet } from "react-native";
import { FONT, SIZES } from "../constants";

const styles = StyleSheet.create({
  textContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: SIZES.large,
  },
});
export default styles;
