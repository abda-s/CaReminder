import dayjs from 'dayjs'
import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native';
import DropShadow from "react-native-drop-shadow";

function Clock() {
  const [day, setDay] = useState(dayjs);

  useEffect(() => {
    setInterval(() => {
      setDay(dayjs());
    }, 1000 * 1)
  }, [])
  return (
    <DropShadow style={styles.clockShadow}>
      <View style={styles.clockContainer}>
        {/* <Text>{day.format("dddd, MMMM D")}</Text> */}
        <Text style={styles.clockTime} >{day.format("hh:mm")}</Text>
        <Text style={styles.clockAM} >{day.format("A")}</Text>
      </View>
    </DropShadow>
  )
}
const styles = StyleSheet.create({
  clockContainer: {
    alignItems: 'center', // Center items horizontally
    justifyContent: "center",
    height: 115,
    width: 115,
    backgroundColor: "white",
    borderRadius: 65,
    borderBlockColor: "black",
    borderWidth: 3,
    zIndex: 1,


  },
  clockShadow: {
    shadowColor: "#638488",
    shadowOffset: { width: 3, height: 7 },
    shadowOpacity: 0.7,
    shadowRadius: 1,
    
},
  clockTime: {
    fontSize: 40,
    color: "#1B2D31",
    marginTop: 20,
  },
  clockAM: {
    fontSize: 20,
    color: "#1B2D31",
  }

});
export default Clock