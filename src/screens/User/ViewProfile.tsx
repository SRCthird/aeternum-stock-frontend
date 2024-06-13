import { mode } from "@src/utils/types"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { User } from "../Authenticate/Hooks/useUser"
import { Image, View } from 'react-native'
import { Card, Title, Paragraph, Caption } from 'react-native-paper'
import { useAccount } from "@src/context/AccountContext"
import styles from "@src/utils/styles"

type Props = {
  user: User;
  setMode?: Dispatch<SetStateAction<mode>>
}
const ViewProfile = ({ user, setMode }: Props) => {
  const [allowEdit, setAllowEdit] = useState(false)
  const { user: currentUser } = useAccount();

  useEffect(() => {
    if (currentUser.id === user.id || currentUser.role === 'Admin') {
      setAllowEdit(true);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Card 
        style={styles.card_body}
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
          <Title style={styles.card_title}>{user.first_name} {user.last_name}</Title>
          <Paragraph style={styles.card_paragraph}>{user.email}</Paragraph>
          <Caption style={styles.card_caption}>Role: {user.role}</Caption>
          {user.position && <Caption style={styles.card_caption}>Position: {user.position}</Caption>}
          {user.bio && <Caption style={styles.card_caption}>Bio: {user.bio}</Caption>}
          <Caption style={styles.card_caption}>Member since: {new Date(user.created_at).toLocaleDateString()}</Caption>
        </Card.Content>
      </Card>
      <View style={{ flex: 1 }} />
    </View>
  );
};

export default ViewProfile;
