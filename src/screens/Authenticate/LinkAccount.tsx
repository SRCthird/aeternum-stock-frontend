import React, { Dispatch, SetStateAction, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as Crypto from 'expo-crypto';
import { authState as mode } from '.';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { validateUser } from './Utils';

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

    validateUser(endpoint, apiKey, username, hashedPassword)
      .then(() => {
        AsyncStorage.setItem(`user:${username}`, hashedPassword);
        AsyncStorage.setItem(`${username}:endpoint`, endpoint);
        AsyncStorage.setItem(`${username}:apiKey`, apiKey);
      })
      .catch(err => {
        Alert.alert('Error', err.message);
      });
    setMode('login');
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

