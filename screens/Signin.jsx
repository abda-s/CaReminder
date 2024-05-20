import { useState } from 'react'
import {
    View,
    TextInput,
    Button,
} from 'react-native'
import axios from 'axios';
import { logger } from "react-native-logs";
import AsyncStorage from '@react-native-async-storage/async-storage' ;

const baseUrl = 'http://10.0.2.2:3001';

const log = logger.createLogger();





const Signin = ({ navigation }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const signin = () => {

        const data = { username: username, password: password }
        axios
            .post(`${baseUrl}/auth/login`, data)
            .then((response) => {
                log.info(response.data)
                AsyncStorage.setItem("token",response.data.token)
                if (response.data.status == "ok") {
                    navigation.navigate('Home')
                }
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
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}
                placeholder="password"
                keyboardType="default"
            />
            <Button
                onPress={signin}
                title="signin"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />

            <Button
                onPress={() => navigation.navigate('Signup')}
                title="sginup"
                color="#f24"
                accessibilityLabel="Learn more about this purple button"
            />
        </View>
    );
}

export default Signin;