/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useState, useEffect } from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { AuthContext } from "./helpers/AuthContext";

import Signup from './screens/Signup';
import Signin from './screens/Signin';
import Home from './screens/Home';
import Add from './screens/Add';
import Calendar from './screens/Calendar';
const Stack = createNativeStackNavigator();


export const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const baseUrl = 'http://10.0.2.2:3001';

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const data = { token: token }
        axios
          .post(`${baseUrl}/auth/userdata`, data)
          .then((response) => {
            if (response.data.error) {
              setIsSignedIn(false)
            } else (
              setIsSignedIn(true)
            )
          }).catch((error) => {
            console.log(error)
          })
      } catch (error) {
        console.error('Error fetching the token:', error);
      }
    };

    fetchToken();
  }, []);


  return (
    <AuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
      <NavigationContainer  >
        <Stack.Navigator >
          {isSignedIn ? (
            <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Add" component={Add} />
              <Stack.Screen name="Calendar" component={Calendar} />
            </>
          ) : (
            <>
              <Stack.Screen name="Signin" component={Signin} />
              <Stack.Screen name="Signup" component={Signup} />
            </>
          )}


        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>

  )
}


export default App;
