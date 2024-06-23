import { useState, useContext } from 'react';
import {
  View,
  TextInput,
  Button,
  Text
} from 'react-native';
import axios from 'axios';
import { logger } from "react-native-logs";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from "../helpers/AuthContext";
import { BaseUrlContext } from '../helpers/BaseUrlContext';

const log = logger.createLogger();

const Signin = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [serverURL, setServerURL] = useState('http://');

  const { setIsSignedIn } = useContext(AuthContext);
  const { baseUrl, setBaseUrl } = useContext(BaseUrlContext);

  const signin = async () => {
    const data = { username: username, password: password };
    try {
      const response = await axios.post(`${baseUrl}/auth/login`, data);
      if (response.data.status === "ok") {
        await AsyncStorage.setItem('token', response.data.token);
        setIsSignedIn(true);
        navigation.navigate('Home');
      }
    } catch (error) {
      log.info(error);
    }
  };

  const setServer = async () => {
    await AsyncStorage.setItem('serverURL', serverURL);
    setBaseUrl(serverURL);
  };

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
      <TextInput
        onChangeText={setServerURL}
        value={serverURL}
        secureTextEntry={false}
        placeholder="server"
        keyboardType="default"
      />
      <Button
        onPress={setServer}
        title="change server"
        color="red"
        accessibilityLabel="Learn more about this purple button"
      />
      <Text>{baseUrl}</Text>
    </View>
  );
};

export default Signin;
