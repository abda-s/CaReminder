import { View, Text, StyleSheet } from "react-native"
import DropShadow from "react-native-drop-shadow";
import moment from 'moment';
import CheckBox from "@react-native-community/checkbox"

const EventView = ({ title, startTime }) => {
    const formattedTime = moment(startTime, 'HH:mm:ss').format('hh:mm A');
    return (
        <DropShadow style={styles.comonProp}>
            <View style={styles.container}>
                <View style={styles.child}>
                    <View style={styles.timecon}>
                        <CheckBox style={styles.CheckBox} />
                        <Text style={styles.title} >{title}</Text>
                    </View>
                </View>

                <View style={styles.child}>
                    {/* <Text style={styles.lable} >{lable}</Text> */}
                    <Text style={styles.time} >{formattedTime}</Text>
                </View>
            </View>
        </DropShadow>

    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: 90,
        width: 370,
        alignItems: 'center',     // Added for centering content horizontally
        margin: 10,
        borderRadius: 30,
        flexDirection: "row",


        // elevation: 5,

    },
    child: {
        flex: 1,
        alignItems: 'center', // Center content horizontally

        // borderWidth: 1,
        // borderColor: '#ccc',


    },
    comonProp: {
        shadowColor: "black",
        shadowOffset: { width: 3, height: 7 },
        shadowOpacity: 0.5,
        shadowRadius: 2
    },
    timecon: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "center"
    },
    CheckBox: {
        padding: 0,
        margin: 0,
        // backgroundColor:"black",
        flex:1,
        justifyContent:"flex-start",
        marginLeft:10,

    },
    lable: {
        backgroundColor: "#F5DFC7",
        fontSize: 18,
        fontWeight: "400",
        color: "#1B2D31",
        paddingHorizontal: 8,
        borderRadius: 39,
        borderWidth: 1,
        marginTop: 5,
    },
    titleCon: {
        backgroundColor: "white"
    },
    title: {
        color: '#1B2D31',
        fontWeight: "400",
        fontSize: 32,
    },
    time: {
        color: "#1B2D31",
        fontWeight: "400",
        fontSize: 22,
        backgroundColor:"#F5DFC7",
        padding:5,
        borderRadius:10,
        borderWidth:2,
        borderColor:"black"
    },



});

export default EventView