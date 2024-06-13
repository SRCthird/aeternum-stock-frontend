import { mode } from "@src/utils/types"
import { Dispatch, SetStateAction, useState } from "react"
import { Alert, View } from 'react-native';
import { Button, TextInput, Text, RadioButton } from 'react-native-paper';
import { User } from "../Authenticate/Hooks/useUser";
import { api } from "../Authenticate/Login";
import styles from "@src/utils/styles";

type Props = {
  user: User;
  setMode: Dispatch<SetStateAction<mode>>
  setUser?: Dispatch<SetStateAction<User>>
  admin?: boolean;
}

const EditProfile = ({ user, setUser, setMode, admin }: Props) => {
  const [data, setData] = useState<User>(user);

  const handleSave = () => {
    api.patch(`/api/user/${user.id}`, data)
      .then(() => {
        if (!admin && setUser) {
          setUser(data);
        }
        setMode('view');
      })
      .catch(err => {
        if (err.response.status === 409) {
          Alert.alert('Error', 'Username already exists');
          return;
        }
        Alert.alert('Error', err.message || 'Failed to update profile');
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Username"
        value={data.email}
        onChangeText={(value) => {
          setData({ ...data, email: value })
        }}
        style={styles.input}
        textColor={styles.input_text.color}
        autoCapitalize="none"
      />
      <TextInput
        label="First Name"
        value={data.first_name || ''}
        onChangeText={(value) => {
          setData({ ...data, first_name: value })
        }}
        style={styles.input}
        textColor={styles.input_text.color}
      />
      <TextInput
        label="Last Name"
        value={data.last_name || ''}
        onChangeText={(value) => {
          setData({ ...data, last_name: value })
        }}
        style={styles.input}
        textColor={styles.input_text.color}
      />
      <TextInput
        label="Bio"
        value={data.bio || ''}
        onChangeText={(value) => {
          setData({ ...data, bio: value })
        }}
        style={styles.input}
        textColor={styles.input_text.color}
        multiline
      />
      <TextInput
        label="Position"
        value={data.position || ''}
        onChangeText={(value) => {
          setData({ ...data, position: value })
        }}
        style={styles.input}
        textColor={styles.input_text.color}
      />
      {admin ? (
        <View style={styles.input}>
          <Text style={styles.card_label}>Role</Text>
          <RadioButton.Group
            onValueChange={value => {
              setData({ ...data, role: value })
            }}
            value={data.role}
          >
            <View style={styles.card_container}>
              <Text>Operator</Text>
              <RadioButton value="Operator" />
            </View>
            <View style={styles.action_container}>
              <Text>Admin</Text>
              <RadioButton value="Admin" />
            </View>
          </RadioButton.Group>
        </View>
      ) : (
        <Text 
          style={{
            ...styles.input, 
            ...styles.input_text,
            backgroundColor: 'transparent'
          }}
        >{"Role: " + user.role}</Text>
      )}
      <View style={{ flex: 1 }} />
      <Button mode="contained" onPress={handleSave} style={styles.button}>
        Save Changes
      </Button>
    </View>
  );
};

export default EditProfile;
