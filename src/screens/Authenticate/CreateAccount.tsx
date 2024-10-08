import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { View, Alert, ImageBackground, useColorScheme, Platform } from 'react-native';
import { TextInput, Button, Appbar } from 'react-native-paper';
import * as Crypto from 'expo-crypto';
import { authState as mode } from '.';
import { postUser, validateUser } from './Utils';
import { useTheme } from '@src/context/ThemeContext';

type Props = {
  setMode: Dispatch<SetStateAction<mode>>;
}

const CreateAccount = ({ setMode }: Props) => {
  const styles = useTheme();

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
      if (Platform.OS === 'web') {
        alert('Error:\nPasswords do not match')
      } else {
        Alert.alert('Error', 'Passwords do not match');
      }
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
            if (Platform.OS === 'web') {
              alert(`Error:\n${err.message}`)
            } else {
              Alert.alert('Error', err.message);
            }
          });
      })
      .catch(err => {
        if (Platform.OS === 'web') {
          alert(`Error:\n${err.message}`)
        } else {
          Alert.alert('Error', err.message);
        }
      });
  };

  return (
    <View style={{
      width: '90%',
      height: '90%',
      borderRadius: 15,
      backgroundColor: styles.input.backgroundColor,
      opacity: 0.7,
      overflow: 'hidden'
    }}>
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
          textColor={styles.input_text.color}
          onSubmitEditing={() => refPass.current.focus()}
        />
        <TextInput
          ref={refPass}
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          textColor={styles.input_text.color}
          onSubmitEditing={() => refVerifyPass.current.focus()}
        />
        <TextInput
          ref={refVerifyPass}
          label="Verify Password"
          value={verifyPassword}
          onChangeText={setVerifyPassword}
          secureTextEntry
          style={styles.input}
          textColor={styles.input_text.color}
          onSubmitEditing={() => refFirst.current.focus()}
        />
        <View style={{ flex: 1 }}></View>
        <TextInput
          ref={refFirst}
          label="First Name"
          value={first_name}
          onChangeText={setFirstName}
          style={styles.input}
          textColor={styles.input_text.color}
          onSubmitEditing={() => refLast.current.focus()}
        />
        <TextInput
          ref={refLast}
          label="Last Name"
          value={last_name}
          onChangeText={setLastName}
          style={styles.input}
          textColor={styles.input_text.color}
          onSubmitEditing={() => refEndpoint.current.focus()}
        />
        <View style={{ flex: 1 }}></View>
        <TextInput
          ref={refEndpoint}
          label="Endpoint"
          value={endpoint}
          onChangeText={setEndpoint}
          style={styles.input}
          textColor={styles.input_text.color}
          onSubmitEditing={() => refApiKey.current.focus()}
        />
        <TextInput
          ref={refApiKey}
          label="API Key"
          value={apiKey}
          onChangeText={setApiKey}
          style={styles.input}
          textColor={styles.input_text.color}
          onSubmitEditing={handleCreateAccount}
        />
        <Button mode="contained" onPress={handleCreateAccount} style={styles.button}>
          Create Account
        </Button>
      </View>
    </View>
  );
};

export default CreateAccount;
