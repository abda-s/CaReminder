import { View, Text, StyleSheet,Alert, TouchableOpacity } from "react-native"
import DropShadow from "react-native-drop-shadow";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BaseUrlContext } from "../../helpers/BaseUrlContext"
import {useContext} from "react"
import moment from 'moment';

import axios from 'axios';


const Day = ({ days }) => {


    if (days.length === 7) {
        return (
            <View style={styles.dayCon}>
                <Text style={styles.dayText}>every day</Text>
            </View>
        );
    }

    const halfLength = Math.ceil(4);
    const firstLine = days.slice(0, halfLength);
    const secondLine = days.slice(halfLength);

    return (
        <View style={styles.daysLines}>
            <View style={styles.daysCon}>
                {firstLine.map((day, index) => (
                    <View style={styles.dayCon} key={index}>
                        <Text style={styles.dayText}>
                            {day}
                        </Text>
                    </View>
                ))}
            </View>
            <View style={styles.daysCon}>

                {days.length > 3 && (
                    secondLine.map((day, index) => (
                        <View style={styles.dayCon} key={index}>
                            <Text style={styles.dayText}>
                                {day}
                            </Text>
                        </View>
                    )))}
            </View>
        </View>
    );
};


const MainEventView = ({ title, description, recurrencePattern, endDate, id }) => {
    const { baseUrl } = useContext(BaseUrlContext);

    const endDateFormatted = moment(endDate, 'YYYY-MM-DD').format('YYYY, MMMM D');
    const days = recurrencePattern.split(",")

    const deleteEvent = () => {
        Alert.alert(
            "Delete Event",
            "Are you sure you want to delete this event?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: () => {
                        console.log(id); // Ensure id is defined and logged correctly
    
                        axios
                            .delete(`${baseUrl}/events/delete/${id}`)
                            .then((response) => {
                                console.log("------------------------")
                                console.log(response.data);
                                console.log("------------------------")
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }
                }
            ],
            { cancelable: false }
        );
    };


    return (
        <DropShadow style={styles.comonProp}>
            <View style={styles.container}>
                <View style={styles.childTitle}>
                    <View style={styles.titleCon}>
                        <Text numberOfLines={1} style={styles.title} >{title}</Text>
                        <Text numberOfLines={1} >{description}</Text>
                    </View>
                </View>

                <View style={styles.child}>
                    <Text style={styles.endDateText}>{endDateFormatted}</Text>

                    <Day days={days} />
                </View>

                <TouchableOpacity onPress={deleteEvent}>
                    <Icon name="highlight-off" size={30} color="#84B0B6" style={{marginRight:10}} />
                </TouchableOpacity>

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
        alignItems: 'flex-start', // Center content horizontally
        // borderWidth: 1,
        // borderColor: '#ccc',
    },
    childTitle: {
        flex: 1,
        alignItems: "flex-start",
        marginLeft: 20,
    },
    comonProp: {
        shadowColor: "black",
        shadowOffset: { width: 3, height: 7 },
        shadowOpacity: 0.5,
        shadowRadius: 2
    },
    titleCon: {
        alignItems: "flex-start",
        justifyContent: "flex-start",
        height: 50,
    },
    CheckBox: {
        padding: 0,
        margin: 0,
        // backgroundColor:"black",
        flex: 1,
        justifyContent: "flex-start",
        marginLeft: 10,

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
    title: {
        color: '#1B2D31',
        fontWeight: "400",
        fontSize: 32,
    },
    time: {
        color: "#1B2D31",
        fontWeight: "400",
        fontSize: 22,
        backgroundColor: "#F5DFC7",
        padding: 5,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "black"
    },


    daysCon: {
        flexDirection: "row",
        marginTop: 3,
        justifyContent: "flex-start"
    },
    dayCon: {
        padding: 2,
        marginLeft: 3,
        borderRadius: 5,
        borderColor: "black",
        borderRadius: 5,
        borderWidth: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',  // Allows wrapping to new lines
        backgroundColor: "#F5DFC7",
    },
    dayText: {
        fontSize: 13,
        color: '#333',
    },
    endDateText: {
        fontSize: 18,
        color: "black"
    },

});

export default MainEventView