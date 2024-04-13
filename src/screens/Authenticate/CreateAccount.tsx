import React, { Dispatch, SetStateAction, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as Crypto from 'expo-crypto';
import { authState as mode } from '.';
import { postUser, validateUser } from './Utils';

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

    await validateUser(endpoint, apiKey, username, hashedPassword)
      .then(() => {
        postUser(endpoint, apiKey, { email: username, password: hashedPassword })
          .then(() => {
            setMode('login');
          })
          .catch(err => {
            Alert.alert('Error', err.message);
          });
      })
      .catch(err => {
        Alert.alert('Error', err.message);
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

