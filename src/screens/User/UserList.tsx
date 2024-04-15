import { FlatList, Text } from "react-native";
import useUser, { User } from "../Authenticate/Hooks/useUser";
import UserListItem from "./components/UserListItem";
import { Dispatch, SetStateAction } from "react";

type Props = {
  onUserSelect: (user: User) => void;
}

const UserList = ({ onUserSelect }: Props) => {
  const { users, error, loading } = useUser({});

  return (
    loading ? (
      <Text>Loading...</Text>
    ) : error ? (
      <Text>{error}</Text>
    ) : (
      <FlatList
        style={{
          width: '100%',
        }}
        data={users}
        renderItem={({ item }) => (
          <UserListItem 
            user={item} 
            onUserSelect={onUserSelect}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    )
  );
}

export default UserList;
