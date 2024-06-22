import React, { useRef, useCallback, useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { AgendaList, CalendarProvider, WeekCalendar } from 'react-native-calendars';
import DropShadow from "react-native-drop-shadow";
import axios from 'axios';
import dayjs from 'dayjs'
import EventView from './components/EventView';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['ReactImageView: Image source "null" doesn\'t exist']);


const baseUrl = 'http://10.0.2.2:3001';

const Calendar = () => {
    const today = dayjs().format("YYYY-MM-DD")

    const [events, setEvents] = useState({});
    const [selectedDay, setSelectedDay] = useState(today);

    const marked = useRef({}); // Initialize as empty object

    useEffect(() => {
        axios.get(`${baseUrl}/events/occ`)
            .then((res) => {
                setEvents(res.data);
                const markedDates = {};
                Object.keys(res.data).forEach(date => {
                    if (res.data[date].length > 0) {
                        markedDates[date] = { marked: true };
                    }
                });
                marked.current = markedDates;
            });
    }, []);

    const renderItem = useCallback(({ item }) => (
        <>
            <EventView
                title={item.name}
                startTime={item.time}
                lable="After lunch"
            />
        </>
    ), []);

    const onDayPress = (day) => {
        setSelectedDay(day.dateString);
    };

    const agendaItems = selectedDay ? [
        {
            title: selectedDay,
            data: events[selectedDay] || []
        }
    ] : [];
    // const agendaItems = Object.keys(events).map(date => ({
    //     title: date,
    //     data: events[date]
    // }));

    return (
        <View style={{ flex: 1 }}>
            {Object.keys(events).length > 0 && (
                <CalendarProvider
                    date={today}
                    showTodayButton
                    theme={{
                        todayBackgroundColor: "#84B0B6",
                        todayButtonTextColor: "black"
                    }}
                >
                    <WeekCalendar
                        futureScrollRange={2}
                        pastScrollRange={2}
                        onDayPress={onDayPress}
                        theme={{
                            calendarBackground: '#F5DFC7',
                            textSectionTitleColor: 'balck',
                            dayTextColor: 'black',
                            todayTextColor: '#638488',
                            selectedDayBackgroundColor: '#ABCDCF',
                            selectedDayTextColor: 'white',
                            monthTextColor: 'black'
                        }}

                    />
                    <View style={{ flex: 1, backgroundColor: '#ABCDCF', alignItems: "center" }}>
                        <AgendaList
                            sections={agendaItems}
                            renderItem={renderItem}
                            sectionStyle={styles.section}
                            style={{ flex: 1 }}
                            theme={{
                                calendarBackground: "black",
                                todayBackgroundColor: "black",
                                backgroundColor: "black"
                            }}
                        />
                    </View>

                </CalendarProvider>
            )}

        </View>
    );
};
const styles = StyleSheet.create({
    section: {
        backgroundColor: '#ABCDCF',
        color: 'grey',
        textTransform: 'capitalize',
        padding: 10,
        fontSize: 20,
        color: "black",
    },
});



export default Calendar;
