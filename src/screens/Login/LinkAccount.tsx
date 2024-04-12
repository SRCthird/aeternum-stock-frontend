import React, { Dispatch, SetStateAction, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as Crypto from 'expo-crypto';
import axios from 'axios';
import { mode } from '.';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  setMode: Dispatch<SetStateAction<mode>>;
}

const LinkAccount = ({ setMode }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [endpoint, setEndpoint] = useState('');
  const [apiKey, setApiKey] = useState('');

  const handleLinkAccount = async () => {
    const hashedPassword = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );

    axios.post(endpoint, {
      username,
      password: hashedPassword,
    }, {
      headers: {
        'X-API-Key': apiKey,
      },
    })
      .then(res => {
        Alert.alert('Success', 'Account linked successfully');
        AsyncStorage.setItem(`user:${username}`, hashedPassword);
        AsyncStorage.setItem(`${username}:endpoint`, endpoint);
        AsyncStorage.setItem(`${username}:apiKey`, apiKey);
        setMode('login');
      })
      .catch(err => {
        if (err.response.status === 500) {
          Alert.alert('Error', 'User does not exist');
        } else {
          Alert.alert('Error', 'Failed to link account');
        }
      });
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
      <TextInput
        label="Endpoint"
        value={endpoint}
        onChangeText={setEndpoint}
        style={styles.input}
      />
      <TextInput
        label="API Key"
        value={apiKey}
        onChangeText={setApiKey}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleLinkAccount} style={styles.button}>
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

export default LinkAccount;

