import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Appbar } from 'react-native-paper';
import * as Crypto from 'expo-crypto';
import { authState as mode } from '.';
import { postUser, validateUser } from './Utils';

type Props = {
  setMode: Dispatch<SetStateAction<mode>>;
}

const CreateAccount = ({ setMode }: Props) => {
  const refPass = useRef<TextInput>();
  const refVerifyPass = useRef<TextInput>();
  const refFirst = useRef<TextInput>();
  const refLast = useRef<TextInput>();
  const refEndpoint = useRef<TextInput>();
  const refApiKey = useRef<TextInput>();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
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
        postUser(endpoint, apiKey, { 
          email: username, 
          password: hashedPassword,
          first_name: first_name,
          last_name: last_name
        })
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
    <View style={{ flex: 1 }}>
      <Appbar>
        <Appbar.BackAction onPress={() => setMode('login')} />
        <Appbar.Content title="Create Account" />
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
          onSubmitEditing={() => refVerifyPass.current.focus()}
        />
        <TextInput
          ref={refVerifyPass}
          label="Verify Password"
          value={verifyPassword}
          onChangeText={setVerifyPassword}
          secureTextEntry
          style={styles.input}
          textColor="black"
          onSubmitEditing={() => refFirst.current.focus()}
        />
        <View style={{ flex: 1 }}></View>
        <TextInput
          ref={refFirst}
          label="First Name"
          value={first_name}
          onChangeText={setFirstName}
          style={styles.input}
          textColor="black"
          onSubmitEditing={() => refLast.current.focus()}
        />
        <TextInput
          ref={refLast}
          label="Last Name"
          value={last_name}
          onChangeText={setLastName}
          style={styles.input}
          textColor="black"
          onSubmitEditing={() => refEndpoint.current.focus()}
        />
        <View style={{ flex: 1 }}></View>
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
          onSubmitEditing={handleCreateAccount}
        />
        <Button mode="contained" onPress={handleCreateAccount} style={styles.button}>
          Create Account
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
    paddingTop: 80,
    paddingBottom: 80,
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

export default CreateAccount;

