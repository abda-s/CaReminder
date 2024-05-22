import dayjs from 'dayjs'
import React,{useState, useEffect} from 'react'
import { Text } from 'react-native';

function Clock() {
    const [day,setDay] = useState(dayjs);

    useEffect(()=>{
        setInterval(()=>{
            setDay(dayjs());
        },1000 * 1)
    },[])
  return (
    <>
        <Text>{day.format("dddd, MMMM D")}</Text>
        <Text>{day.format("hh:mm")}</Text>
    </>
  )
}

export default Clock