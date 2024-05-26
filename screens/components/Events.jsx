import React from 'react';
import { ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import EventView from './EventView';

const Events = ({ data }) => {
    return (
        <SafeAreaView style={{flex:1}}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {data.map((event, index) => (
                    <EventView
                        key={index}
                        title={event.title}
                        startTime={event.startTime}
                        lable={"After Lunch"}
                        done={"false"}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    scrollViewContent: {
        paddingVertical: 20, // Adjust as needed
        alignItems: 'center', // Center items horizontally
    },
});

export default Events;
