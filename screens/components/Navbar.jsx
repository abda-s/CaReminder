import { View, StyleSheet } from "react-native"
import Clock from "./Clock"
import CalendarButton from "./CalendarButton";
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
        <CalendarButton />
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