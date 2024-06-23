import React from 'react';
import { ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import MainEventView from './MainEventView';

const Events = ({ data }) => {
    return (
        <SafeAreaView style={{flex:1}}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {data.map((event, index) => (
                    <MainEventView
                        key={index}
                        title={event.title}
                        startTime={event.startTime}
                        description={event.description}
                        endDate={event.endDate}
                        recurrencePattern={event.recurrencePattern}
                        id={event.id}

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
