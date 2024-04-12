import React, { Dispatch, SetStateAction, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import { mode } from '.';

type Props = {
  setMode: Dispatch<SetStateAction<mode>>;
}

const CreateAccount = ({ setMode }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [endpoint, setEndpoint] = useState('');
  const [apiKey, setApiKey] = useState('');

  const handleCreateAccount = async () => {
    if (password !== verifyPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    const hashedPassword = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );

    await AsyncStorage.setItem(`user:${username}`, hashedPassword);
    await AsyncStorage.setItem(`${username}:endpoint`, endpoint);
    await AsyncStorage.setItem(`${username}:apiKey`, apiKey);

    Alert.alert('Success', 'Account created successfully');
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
        label="Verify Password"
        value={verifyPassword}
        onChangeText={setVerifyPassword}
        secureTextEntry
        style={styles.input}
      />
      <View style={{ flex: 1 }}></View>
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
      <Button mode="contained" onPress={handleCreateAccount} style={styles.button}>
        Create Account
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    paddingTop:80,
    paddingBottom:80,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});

export default CreateAccount;

