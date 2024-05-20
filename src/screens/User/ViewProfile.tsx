import { mode } from "@src/utils/types"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamList } from ".."
import { User } from "../Authenticate/Hooks/useUser"
import { View, StyleSheet, Image, ScrollView } from 'react-native'
import { Card, Title, Paragraph, Text } from 'react-native-paper'
import { useAccount } from "@src/context/AccountContext"

type Props = {
  user: User;
  setMode?: Dispatch<SetStateAction<mode>>
  navigation?: StackNavigationProp<RootStackParamList, 'User'>;
}
const ViewProfile = ({ user, setMode, navigation }: Props) => {
  const [allowEdit, setAllowEdit] = useState(false)
  const { user: currentUser } = useAccount();

  useEffect(() => {
    if (currentUser.id === user.id || currentUser.role === 'Admin') {
      setAllowEdit(true);
    }
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Card 
        style={styles.card}
        onPress={() => {
          if (setMode && allowEdit) {
            setMode('edit');
          }
        }}
      >
        <Card.Content>
          {user.image && (
            <Image source={{ uri: user.image }} style={styles.image} />
          )}
          <Title style={styles.title}>{user.first_name} {user.last_name}</Title>
          <Paragraph style={styles.paragraph}>{user.email}</Paragraph>
          <Text style={styles.text}>Role: {user.role}</Text>
          {user.position && <Text style={styles.text}>Position: {user.position}</Text>}
          {user.bio && <Text style={styles.text}>Bio: {user.bio}</Text>}
          <Text style={styles.text}>Member since: {new Date(user.created_at).toLocaleDateString()}</Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    elevation: 3,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default ViewProfile;
