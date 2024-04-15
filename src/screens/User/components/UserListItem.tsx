import React, { Dispatch, SetStateAction } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Avatar, Card } from 'react-native-paper';
import { User } from "@src/screens/Authenticate/Hooks/useUser";
import { mode } from '@src/utils/types';

interface Props {
  user: User;
  onUserSelect: (user: User) => void;
}

const UserListItem = ({ user, onUserSelect }: Props) => {
  const avatarUrl = user.image || 'https://www.example.com/default-avatar.png';

  return (
    <Card
      style={styles.card}
      onPress={() => {
        onUserSelect(user);
      }}
    >
      <Card.Title
        title={`${user.firstName} ${user.lastName}`}
        subtitle={user.email}
        left={(props) => <Avatar.Image {...props} source={{ uri: avatarUrl }} />}
      />
      <Card.Content>
        <Text style={styles.position}>{user.position || 'No position'}</Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 8,
    elevation: 2,
  },
  position: {
    fontSize: 14,
    marginTop: 4,
  },
});

export default UserListItem;

