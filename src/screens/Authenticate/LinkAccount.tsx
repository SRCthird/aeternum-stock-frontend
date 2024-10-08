import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { View, Alert, ImageBackground, useColorScheme, Platform } from 'react-native';
import { TextInput, Button, Appbar } from 'react-native-paper';
import * as Crypto from 'expo-crypto';
import { authState as mode } from '.';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { validateUser } from './Utils';
import { useTheme } from '@src/context/ThemeContext';

type Props = {
  setMode: Dispatch<SetStateAction<mode>>;
  _user?: string;
  _password?: string;
}

const LinkAccount = ({ setMode, _user, _password }: Props) => {
  const styles = useTheme();
  const theme = useColorScheme();

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
        if (Platform.OS === 'web') {
          alert(`Error:${err.message}`)
        } else {
          Alert.alert('Error', err.message);
        }
      });
    setMode('login');
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
        <Appbar style={styles.header_bar}>
          <Appbar.BackAction
            onPress={() => setMode('login')}
            color={styles.accents.color}
          />
          <Appbar.Content
            title="Link Account"
            titleStyle={styles.header_title}
          />
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
            onSubmitEditing={() => refEndpoint.current.focus()}
          />
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
            onSubmitEditing={handleLinkAccount}
          />
          <View style={{ flex: 1 }} />
          <Button mode="contained" onPress={handleLinkAccount} style={styles.button}>
            Link Account
          </Button>
        </View>
      </View>
  );
};

export default LinkAccount;

