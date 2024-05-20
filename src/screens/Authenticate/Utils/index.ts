import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { createUser } from "../Hooks/useUser";
import { Alert } from "react-native";

export const postUserRemote = (endpoint: string, apiKey: string, user: createUser) => {
  return axios.post(endpoint + '/api/user', user, {
    headers: {
      'x-api-key': apiKey
    }
  })
}

export const postUserLocal = async (endpoint: string, apiKey: string, user: createUser) => {
  await AsyncStorage.setItem(`user:${user.email}`, user.password);
  await AsyncStorage.setItem(`${user.email}:endpoint`, endpoint);
  await AsyncStorage.setItem(`${user.email}:apiKey`, apiKey);
}

export const postUser = async (endpoint: string, apiKey: string, user: createUser) => {
  await postUserLocal(endpoint, apiKey, user);
  return postUserRemote(endpoint, apiKey, user);
}

export const validateUser = async (endpoint: string, apiKey: string, username: string, password: string) => {
  await validateUserLocal(username, password);
  await validateUserRemote(endpoint, apiKey, username, password);
}

export const validateUserLocal = async (username: string, password: string) => {
  const userPass = await AsyncStorage.getItem(`user:${username}`);
  if (userPass === null) return;
  if (userPass === password) {
    Alert.alert('Warning', 'This user already exists in local storage');
    return;
  }
  throw new Error('User already exists in local storage')
}

export const validateUserRemote = async (endpoint: string, apiKey: string, username: string, password: string) => {
  await axios.get(endpoint + `/api/user/?email=${username}`, {
    headers: {
      'x-api-key': apiKey
    }
  })
    .then(res => {
      if (res.data.length === 0) return;
      const passwd: string = res.data[0].password || "";
      if (passwd === password) return;
      throw new Error('User does not match remote credentials');
    })
    .catch(err => {
      throw new Error(err);
    });
}
