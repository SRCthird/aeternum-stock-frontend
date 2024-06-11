import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Appbar } from 'react-native-paper';
import * as Crypto from 'expo-crypto';
import { authState as mode } from '.';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { validateUser } from './Utils';

type Props = {
  setMode: Dispatch<SetStateAction<mode>>;
  _user?: string;
  _password?: string;
}

const LinkAccount = ({ setMode, _user, _password }: Props) => {
  const refPass = useRef<TextInput>();
  const refEndpoint = useRef<TextInput>();
  const refApiKey = useRef<TextInput>();

  const [username, setUsername] = useState(_user || '');
  const [password, setPassword] = useState(_password || '');
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
    <View style={{ flex: 1 }}>
      <Appbar>
        <Appbar.BackAction onPress={() => setMode('login')} />
        <Appbar.Content title="Link Account" />
      </Appbar>
      <View style={styles.container}>
        <TextInput
          label="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          textColor="black"
          onSubmitEditing={() => refPass.current.focus()}
        />
        <TextInput
          ref={refPass}
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          textColor="black"
          onSubmitEditing={() => refEndpoint.current.focus()}
        />
        <TextInput
          ref={refEndpoint}
          label="Endpoint"
          value={endpoint}
          onChangeText={setEndpoint}
          style={styles.input}
          textColor="black"
          onSubmitEditing={() => refApiKey.current.focus()}
        />
        <TextInput
          ref={refApiKey}
          label="API Key"
          value={apiKey}
          onChangeText={setApiKey}
          style={styles.input}
          textColor="black"
          onSubmitEditing={handleLinkAccount}
        />
        <Button mode="contained" onPress={handleLinkAccount} style={styles.button}>
          Link Account
        </Button>
      </View>
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
    maxWidth: 700,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#fff',
  },
  button: {
    marginBottom: 10,
    maxWidth: 700,
    width: '100%',
    alignSelf: 'center',
  },
});

export default LinkAccount;

