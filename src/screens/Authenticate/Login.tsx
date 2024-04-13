import React, { Dispatch, SetStateAction, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { authState as mode } from '.';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import axios from 'axios';

type Props = {
  setMode: Dispatch<SetStateAction<mode>>;
  setUser: Dispatch<SetStateAction<string>>;
}

export const api = axios.create();

const LoginScreen = ({ setMode, setUser }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const hashedPassword = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );

    const storedHashedPassword = await AsyncStorage.getItem(`user:${username}`);

    if (hashedPassword === storedHashedPassword) {
      const endpoint = await AsyncStorage.getItem(`${username}:endpoint`);
      if (!endpoint) {
        Alert.alert('Error', 'No endpoint found');
        return;
      };
      api.defaults.baseURL = endpoint;

      const key = await AsyncStorage.getItem(`${username}:apiKey`);
      if (!key) {
        Alert.alert("No API key found");
      } else {
        api.defaults.headers['x-api-key'] = key;
      }

      await AsyncStorage.setItem('user', username);
      setUser(username);
      setMode('loggedIn');
    } else {
      Alert.alert('Error', 'Invalid username or password');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Submit
      </Button>
      <Button mode="text" onPress={() => { setMode('createAccount') }} style={styles.button}>
        Create Account
      </Button>
      <Button mode="text" onPress={() => { setMode('link') }} style={styles.button}>
        Link Account
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});

export default LoginScreen;
