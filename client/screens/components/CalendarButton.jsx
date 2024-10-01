import { TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DropShadow from "react-native-drop-shadow";

function CalendarButton() {
    const navigation = useNavigation();

    const navigate = () =>{
        navigation.navigate("Calendar")
    }

    return (
        <DropShadow style={styles.buttonShadow} >
            <TouchableOpacity style={styles.container} onPress={navigate}>
                <Icon name="calendar-month" size={40} color="black" />
            </TouchableOpacity>
        </DropShadow>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 40,
        borderWidth:3,
        borderColor:"balck",
    },
    buttonShadow: {
        shadowColor: "#638488",
        shadowOffset: { width: 3, height: 7 },
        shadowOpacity: 1,
        shadowRadius: 1
    },
})

export default CalendarButton