import { View, Text, TextInput, ScrollView, SafeAreaView, TouchableOpacity, StyleSheet, Platform } from "react-native"
import { useState, useEffect } from "react"
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DropShadow from "react-native-drop-shadow";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import moment from "moment";

import axios from 'axios';
const baseUrl = 'http://10.0.2.2:3001';

const items = [
    { name: 'Sun', id: 1 },
    { name: 'Mon', id: 2 },
    { name: 'Tue', id: 3 },
    { name: 'Wed', id: 4 },
    { name: 'Thu', id: 5 },
    { name: 'Fri', id: 6 },
    { name: 'Sat', id: 7 },
];

function Add() {
    const navigation = useNavigation();

    const [name, setName] = useState("")

    const [description, setDescription] = useState("")

    const [selectedItems, setSelectedItems] = useState([]);

    const [container, setContainer] = useState("")
    const [snooze, setSnooze] = useState("")


    const [date, setDate] = useState(new Date())
    const [showDate, setShowDate] = useState(false)
    const [endDate, setEndDate] = useState("Empty")

    const [inputs, setInputs] = useState([{ time: new Date(), dosage: "1", showTime: false, timeText: "Empty" }]);



    const onChangeDate = (event, selectedDate) => {
        const currenDate = selectedDate || date
        setShowDate(Platform.OS === "ios")
        setDate(currenDate);

        let tempDate = new Date(currenDate);
        let year = tempDate.getFullYear();
        let month = String(tempDate.getMonth() + 1).padStart(2, '0'); // Pad month with leading zero
        let day = String(tempDate.getDate()).padStart(2, '0'); // Pad day with leading zero
        let fDate = year + '-' + month + '-' + day;
        setEndDate(fDate);
    }

    const onChangeTime = (index, event, selectedTime) => {
        const currentTime = selectedTime || inputs[index].time;
        const newInputs = [...inputs];
        newInputs[index].showTime = Platform.OS === "ios";
        newInputs[index].time = currentTime;

        let tempDate = new Date(currentTime);
        let hours = String(tempDate.getHours()).padStart(2, '0'); // Pad hours with leading zero
        let minutes = String(tempDate.getMinutes()).padStart(2, '0'); // Pad minutes with leading zero
        let fTime = hours + ":" + minutes;
        newInputs[index].timeText = fTime;

        setInputs(newInputs);
    };

    const handleAddInput = () => {
        setInputs([...inputs, { time: new Date(), dosage: "1", showTime: false, timeText: "Empty" }]);
    };

    const handleDeleteInput = (index) => {
        const newInputs = inputs.filter((_, i) => i !== index);
        setInputs(newInputs);
    };

    let errorText = 'Fill these fields:'

    const checkFields = (field, name) => {
        if (field == "") {
            errorText += name;
        }
    }

    const submit = () => {
        const selectedNames = selectedItems.map(id => {
            const item = items.find(item => item.id === id);
            return item ? item.name : null;
        }).filter(name => name !== null);
        const recurrencePattern = selectedNames.join(',');

        const schuleData = inputs.reduce((acc, input) => {
            acc[input.timeText] = parseInt(input.dosage);
            return acc;
        }, {});

        function formatSnoozeTime(snooze) {
            // Convert snooze string to integer
            const snoozeMinutes = parseInt(snooze, 10);
            
            // Create a moment duration object
            const snoozeDuration = moment.duration(snoozeMinutes, 'minutes');
            
            // Format the duration as hh:mm
            const formattedTime = moment.utc(snoozeDuration.asMilliseconds()).format('HH:mm');
            
            return formattedTime;
        }
        
        
        const data = {
            title: name,
            description: description,
            recurrencePattern: recurrencePattern,
            schule: schuleData,
            endDate: endDate,
            snooze: formatSnoozeTime(snooze),
            container: container,
            userId: 4
        };

        axios
            .post(`${baseUrl}/events`, data)
            .then((response) => {
                navigation.navigate('Home');
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            });
    };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#ABCDCF" }}>
            <ScrollView>
                <Text style={styles.frequencyText}>Medication name: </Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={setName}
                    value={name}
                    placeholder=""
                    keyboardType="default"
                />

                <Text style={styles.frequencyText}>Description (optional): </Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={setDescription}
                    value={description}
                    placeholder=""
                    keyboardType="default"
                />


                <Text style={styles.frequencyText}>Container number: </Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={setContainer}
                    value={container}
                    placeholder=""
                    keyboardType="number-pad"
                />

                <Text style={styles.frequencyText}>Snooze Time in (min): </Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={setSnooze}
                    value={snooze}
                    placeholder=""
                    keyboardType="number-pad"
                />


                <Text style={styles.frequencyText}>Frequency: </Text>
                <View style={styles.container}>
                    <SectionedMultiSelect
                        items={items}
                        IconRenderer={Icon}
                        uniqueKey="id"
                        onSelectedItemsChange={setSelectedItems}
                        selectedItems={selectedItems}
                        hideSearch={true}
                        selectText="Select days"
                        colors={{ itemBackground: "#84B0B6", chipColor: "#1B2D31" }}
                        styles={{
                            selectToggle: {
                                backgroundColor: "white",
                                padding: 10,
                                borderRadius: 25,
                                elevation: 5,
                                marginBottom: 5
                            },
                            selectToggleText: {
                                color: "#1B2D31"
                            },
                            item: {
                                paddingHorizontal: 20,
                                marginVertical: 10,
                                borderRadius: 20,
                                backgroundColor: "white",
                                elevation: 5,
                            },
                            container: {
                                backgroundColor: "#84B0B6",
                                borderRadius: 20,
                                padding: 20,
                                marginVertical: 180,
                            },
                            scrollView: {
                                borderRadius: 20,
                            },
                            button: {
                                borderRadius: 30,
                                backgroundColor: "#F5DFC7",
                                elevation: 5,
                            },
                            confirmText: {
                                color: "#1B2D31"
                            }
                        }}
                    />
                </View>



                <Text style={styles.frequencyText}>Schule: </Text>
                {inputs.map((input, index) => (
                    <View key={index} style={styles.schuleContainer}>
                        <View style={styles.schuleChild}>
                            <Text style={styles.schuleTitles}>Select time:</Text>
                            <View style={styles.schuleTimeContainer}>
                                <View style={styles.schuleTimeChild}>
                                    <TouchableOpacity style={styles.schuleTimeButtonContainer} onPress={() => {
                                        const newInputs = [...inputs];
                                        newInputs[index].showTime = true;
                                        setInputs(newInputs);
                                    }}>
                                        <Text style={styles.schuleTimeButtonText}>Select</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.schuleTimeChild}>
                                    <Text style={[styles.endDateText, styles.schuleTimeText]}>{input.timeText}</Text>
                                </View>
                            </View>
                            {input.showTime && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={input.time}
                                    mode="time"
                                    is24Hour={false}
                                    display="default"
                                    onChange={(event, selectedTime) => onChangeTime(index, event, selectedTime)}
                                />
                            )}
                        </View>
                        <View style={styles.schuleChild}>
                            <Text style={styles.schuleTitles}>Dosage:</Text>
                            <TextInput
                                style={[styles.textInput, styles.schuleTextInput]}
                                onChangeText={(text) => {
                                    const newInputs = [...inputs];
                                    newInputs[index].dosage = text;
                                    setInputs(newInputs);
                                }}
                                value={input.dosage}
                                placeholder="1"
                                keyboardType="number-pad"
                            />
                        </View>
                        <View style={styles.deleteButtonContainer}>
                            {index > 0 && (
                                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteInput(index)}>
                                    <Icon name="delete" size={30} color="#84B0B6" />
                                </TouchableOpacity>
                            )}
                        </View>

                    </View>
                ))}

                <View style={{ alignItems: 'center', marginBottom: 20 }}>
                    <TouchableOpacity style={styles.addButtonContainer} onPress={handleAddInput}>
                        <Text style={styles.addButtonText}>Add</Text>
                    </TouchableOpacity>
                </View>



                <Text style={styles.frequencyText}>End Date: </Text>
                <View style={styles.endDateContainer}>
                    <View style={styles.endDateChild}>
                        <DropShadow style={styles.buttonShadow}>
                            <TouchableOpacity style={styles.buttonContainer} onPress={() => { setShowDate(true) }}>
                                <Text style={styles.buttonText} >Select</Text>
                            </TouchableOpacity>
                        </DropShadow>
                    </View>
                    <View style={styles.endDateChild}>
                        <Text style={styles.endDateText} >{endDate}</Text>
                    </View>

                    {showDate && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode="date"
                            is24Hour={false}
                            display="default"
                            onChange={onChangeDate}
                        />
                    )}
                </View>

                <View style={styles.doneContainer} >
                    <DropShadow style={styles.buttonShadow}>
                        <TouchableOpacity style={styles.DoneButtonContainer} onPress={() => { submit() }}>
                            <Text style={styles.DoneButtonText} >Done</Text>
                        </TouchableOpacity>
                    </DropShadow>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    frequencyText: {
        marginVertical: 5,
        marginHorizontal: 16,
        fontSize: 20,
        color: "#1B2D31",
    },
    textInput: {
        backgroundColor: "white",
        borderRadius: 30,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        marginBottom: 10,
        elevation: 5,
    },
    schuleContainer: {
        backgroundColor: "#F5DFC7",
        borderRadius: 30,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "center",
    },
    schuleChild: {
        flex: 1,
        justifyContent: "center",
    },
    schuleTextInput: {
        marginBottom: 15,
    },
    schuleTitles: {
        marginHorizontal: 15,
        padding: 0,
        marginTop: 10,
        marginBottom: 2,
        color: "#1B2D31",
        fontSize: 20,
    },
    schuleTimeContainer: {
        flexDirection: "row",
        borderRadius: 20,
        alignItems: "center", //virtical
        marginTop: -15,
        flex: 1,

    },
    schuleTimeChild: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    schuleTimeText: {
        fontSize: 22,
    },

    schuleTimeButtonContainer: {
        width: 80,
        height: 30,
        backgroundColor: "white",
        borderRadius: 30,
        alignItems: "center", //virtical
        justifyContent: "center", //horizantal
        elevation: 5,
    },
    schuleTimeButtonText: {
        fontSize: 20,
        color: "#1B2D31",
    },

    endDateContainer: {
        backgroundColor: "white",
        flexDirection: "row",
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginHorizontal: 10
    },
    endDateChild: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center", //horizantal

    },
    buttonContainer: {
        width: 130,
        height: 50,
        backgroundColor: "#F5DFC7",
        borderRadius: 30,
        alignItems: "center", //virtical
        justifyContent: "center", //horizantal
    },
    buttonText: {
        fontSize: 25,
        color: "#1B2D31",
    },
    endDateText: {
        fontSize: 25,
        color: "#1B2D31",

    },
    buttonShadow: {
        shadowColor: "#638488",
        shadowOffset: { width: 3, height: 7 },
        shadowOpacity: 1,
        shadowRadius: 1
    },
    doneContainer: {
        width: "100%",
        height: 100,
        justifyContent: "center",
        alignItems: 'center',

    },
    containerShadow: {
        shadowColor: "#638488",
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.8,
        shadowRadius: 1
    },
    DoneButtonContainer: {
        width: 145,
        height: 55,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 39,
    },
    DoneButtonText: {
        fontSize: 30,
        color: "#1B2D31"
    },
    addButtonContainer: {
        width: 80,
        height: 40,
        backgroundColor: "#84B0B6",
        borderRadius: 20,
        alignItems: "center", // vertical
        justifyContent: "center", // horizontal
        elevation: 5,
        marginTop: 10,
    },
    addButtonText: {
        fontSize: 18,
        color: "white",
    },
    deleteButtonContainer: {
        justifyContent: "center"
    }

});
export default Add