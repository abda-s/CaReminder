import { Text, View, TouchableOpacity, StyleSheet } from "react-native"
import DropShadow from "react-native-drop-shadow";
import { useNavigation } from '@react-navigation/native';

function AddButton() {
    const navigation = useNavigation();

    return (
        <DropShadow style={styles.containerShadow}>
            <View style={styles.container} >
                <DropShadow style={styles.buttonShadow}>
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Add')}>
                        <Text style={styles.buttonText} >Add</Text>
                    </TouchableOpacity>
                </DropShadow>
            </View>
        </DropShadow>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#84B0B6",
        width: "100%",
        height: 80,
        justifyContent: "center",
        alignItems: 'center'

    },
    containerShadow: {
        shadowColor: "#638488",
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.8,
        shadowRadius: 1
    },
    buttonContainer: {
        width: 145,
        height: 55,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 39,
    },
    buttonShadow: {
        shadowColor: "#638488",
        shadowOffset: { width: 3, height: 7 },
        shadowOpacity: 1,
        shadowRadius: 1
    },
    buttonText: {
        fontSize: 30,
        color: "#1B2D31"

    }

});
export default AddButton