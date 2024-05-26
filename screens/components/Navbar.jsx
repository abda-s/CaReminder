import { View,StyleSheet  } from "react-native"
import Clock from "./Clock"
function Navbar() {
  return (
    <View style={styles.container} >
        <Clock/>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        height:120,
        backgroundColor:"#84B0B6",
        alignItems:"center",
        justifyContent:""
    },
});

export default Navbar