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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
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
          firstName: firstName,
          lastName: lastName
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
          onSubmitEditing={() => refPass.current.focus()}
        />
        <TextInput
          ref={refPass}
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          onSubmitEditing={() => refVerifyPass.current.focus()}
        />
        <TextInput
          ref={refVerifyPass}
          label="Verify Password"
          value={verifyPassword}
          onChangeText={setVerifyPassword}
          secureTextEntry
          style={styles.input}
          onSubmitEditing={() => refFirst.current.focus()}
        />
        <View style={{ flex: 1 }}></View>
        <TextInput
          ref={refFirst}
          label="First Name"
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input}
          onSubmitEditing={() => refLast.current.focus()}
        />
        <TextInput
          ref={refLast}
          label="Last Name"
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
          onSubmitEditing={() => refEndpoint.current.focus()}
        />
        <View style={{ flex: 1 }}></View>
        <TextInput
          ref={refEndpoint}
          label="Endpoint"
          value={endpoint}
          onChangeText={setEndpoint}
          style={styles.input}
          onSubmitEditing={() => refApiKey.current.focus()}
        />
        <TextInput
          ref={refApiKey}
          label="API Key"
          value={apiKey}
          onChangeText={setApiKey}
          style={styles.input}
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
  },
  button: {
    marginTop: 10,
  },
});

export default CreateAccount;

