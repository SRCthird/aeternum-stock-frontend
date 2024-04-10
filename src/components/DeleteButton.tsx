import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

type Props = {
  onPress: () => void;
}

const DeleteButton = ({ onPress }: Props) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#ff006e',
        padding: 15,
        marginBottom: 5,
        minWidth: '100%',
        alignItems: 'center',
      }}
      onPress={onPress}
    >
      <Text style={{ color: '#ffffff', fontSize: 18 }}>Delete</Text>
    </TouchableOpacity>
  )
}

export default DeleteButton;
