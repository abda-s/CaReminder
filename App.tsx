/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useState } from 'react'
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  Button,
} from 'react-native'

import axios from 'axios';
import { logger } from "react-native-logs";

const baseUrl = 'http://10.0.2.2:3001';

export const App = () => {
  const log = logger.createLogger();

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signup = () => {
    const data = { username: username, email: email, password: password }
    axios
    .post(`${baseUrl}/auth/signup`, data)
    .then((response)=>{
      console.log(response.data)
      log.info(response.data)
    }).catch((error)=>{
      console.log(error)
    })
  }
  return (
    <View>
      <SafeAreaView>

        <Text>wow</Text>
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

      </SafeAreaView>
    </View>
  )
}


export default App;
