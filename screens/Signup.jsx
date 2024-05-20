import React, { useState } from 'react'
import {
    Text,
    View,
    TextInput,
    Button,
} from 'react-native'
import axios from 'axios';
import { logger } from "react-native-logs";
const baseUrl = 'http://10.0.2.2:3001';

function Signup({ navigation }) {
    const log = logger.createLogger();

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const signup = () => {
        const data = { username: username, email: email, password: password }
        axios
            .post(`${baseUrl}/auth/signup`, data)
            .then((response) => {
                log.info(response.data)
            }).catch((error) => {
                log.info(error)
            })
    }
    return (
        <View>
            <TextInput
                onChangeText={setUsername}
                value={username}
                placeholder="username"
                keyboardType="default"
            />
            <TextInput
                onChangeText={setEmail}
                value={email}
                placeholder="email"
                keyboardType="email-address"
            />
            <TextInput
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}
                placeholder="password"
                keyboardType="default"
            />
            <Button
                onPress={signup}
                title="signup"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />


        </View>)
}

export default Signup