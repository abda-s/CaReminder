import { View, StyleSheet } from "react-native"
import Clock from "./Clock"
import CalendarButton from "./CalendarButton";
import CalendarButton2 from "./CalendarButton2";
function Navbar() {
  return (
    <View style={styles.container} >

      <View style={styles.child}>
        <CalendarButton />
      </View>

      <View style={styles.child}>
        <Clock />
      </View>

      <View style={styles.child}>
        <CalendarButton2 />
      </View>

    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    height: 120,
    backgroundColor: "#84B0B6",
    alignItems: "center",
    flexDirection: "row"
  },
  child: {
    flex: 1,
    justifyContent:"center",
    alignItems:"center"
  }
});

export default Navbar