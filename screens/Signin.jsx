import { useState, useContext } from 'react'
import {
    View,
    TextInput,
    Button,
} from 'react-native'
import axios from 'axios';
import { logger } from "react-native-logs";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from "../helpers/AuthContext";

const baseUrl = 'http://10.0.2.2:3001';

const log = logger.createLogger();





const Signin = ({ navigation }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { setIsSignedIn } = useContext(AuthContext);
    const signin = () => {
        // const value = await AsyncStorage.getItem('my-key');
        const data = { username: username, password: password }
        axios
            .post(`${baseUrl}/auth/login`, data)
            .then((response) => {
                // log.info(response.data)
                
                // log.info(value)
                if (response.data.status == "ok") {
                    AsyncStorage.setItem('token', response.data.token);
                    setIsSignedIn(true)
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