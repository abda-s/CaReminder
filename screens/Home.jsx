import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';
import { AuthContext } from "../helpers/AuthContext";
import AsyncStorage from '@react-native-async-storage/async-storage';

import Clock from './components/Clock';
const baseUrl = 'http://10.0.2.2:3001';

const App = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const { setIsSignedIn } = useContext(AuthContext);


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

        fetchToken();
    }, []);
    const signout = async () => {
        await AsyncStorage.removeItem('token')
        setIsSignedIn(false)
    }
    return (
        <View>
            <Clock />
            <Text>username: {username}</Text>
            <Text>email:{email} </Text>
            <Button
                onPress={signout}
                title="sginout"
                color="#f24"
                accessibilityLabel="Learn more about this purple button"
            />


        </View>
    );
};

export default App;
