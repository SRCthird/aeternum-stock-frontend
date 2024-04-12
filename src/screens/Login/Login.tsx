import { StackNavigationProp } from '@react-navigation/stack';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { RootStackParamList } from '@screens';
import { mode } from '.';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>;
  setMode: Dispatch<SetStateAction<mode>>;
}

const LoginScreen = ({ navigation, setMode }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const hashedPassword = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );

    const storedHashedPassword = await AsyncStorage.getItem(`user:${username}`);

    if (hashedPassword === storedHashedPassword) {
      await AsyncStorage.setItem('user', username);
      navigation.navigate('Actions');
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
      <Button mode="text" onPress={() => {setMode('createAccount')} } style={styles.button}>
        Create Account
      </Button>
      <Button mode="text" onPress={() => {setMode('link')} } style={styles.button}>
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
