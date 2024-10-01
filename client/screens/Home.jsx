import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';
import { AuthContext } from "../helpers/AuthContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BaseUrlContext} from "../helpers/BaseUrlContext"

import Navbar from './components/Navbar';
import Events from './components/Events';
import AddButton from './components/AddButton';

// const baseUrl = 'http://10.0.2.2:3001';

const App = () => {
    const { baseUrl} = useContext(BaseUrlContext);

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const { setIsSignedIn } = useContext(AuthContext);
    const [data, setData] = useState([])


    useEffect(() => {
        const fetchToken = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const data = { token: token }
                axios
                    .post(`${baseUrl}/auth/userdata`, data)
                    .then((response) => {
                        console.log(response.data)
                        setUsername(response.data.username)
                        setEmail(response.data.email)
                    }).catch((error) => {
                        console.log(error)
                    })
            } catch (error) {
                console.error('Error fetching the token:', error);
            }
        };


        setInterval(() => {
            axios.get(`${baseUrl}/events`).then((response) => {
                setData(response.data)
            })          }, 1000 * 1)

            fetchToken();
    }, []);
    const signout = async () => {
        await AsyncStorage.removeItem('token')
        setIsSignedIn(false)
    }
    return (
        <View style={{ backgroundColor: "#aaccce", flex: 1 }} >
            <Navbar />
            {/* <Text>username: {username}</Text>
            <Text>email:{email} </Text>
            <Button
                onPress={signout}
                title="sginout"
                color="#f24"
                accessibilityLabel="Learn more about this purple button"
            /> */}
            <Events data={data} />
            <AddButton />

        </View>
    );
};

export default App;
