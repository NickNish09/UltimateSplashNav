import { StyleSheet } from "react-native";
import { dimensions, colors } from "../styles/base";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary
  },
  scrollView: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    paddingVertical: 10
  },
  endPadding: {
    paddingRight: 20
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center"
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(130,4,150, 0.9)"
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)"
  }
});

export default styles;
