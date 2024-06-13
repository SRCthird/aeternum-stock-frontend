import { Avatar, Card, Paragraph } from 'react-native-paper';
import { User } from "@src/screens/Authenticate/Hooks/useUser";
import styles from '@src/utils/styles';

interface Props {
  user: User;
  onUserSelect: (user: User) => void;
}

const UserListItem = ({ user, onUserSelect }: Props) => {
  const avatarUrl = user.image || 'https://www.example.com/default-avatar.png';

  return (
    <Card
      style={styles.card_body}
      onPress={() => {
        onUserSelect(user);
      }}
    >
      <Card.Title
        title={`${user.first_name} ${user.last_name}`}
        subtitle={user.email}
        left={(props) => <Avatar.Image {...props} source={{ uri: avatarUrl }} />}
      />
      <Card.Content>
        <Paragraph>{user.position || 'No position'}</Paragraph>
      </Card.Content>
    </Card>
  );
};

export default UserListItem;

