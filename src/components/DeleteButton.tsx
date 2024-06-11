import { Text } from "react-native";
import { Button } from "react-native-paper";

type Props = {
  onPress: () => void;
}

const DeleteButton = ({ onPress }: Props) => {
  return (
    <Button
      style={{
        backgroundColor: '#ff006e',
        marginBottom: 10,
        maxWidth: 700,
        width: '100%',
        alignSelf: 'center',
        height: 70,
        justifyContent: 'center'
      }}
      onPress={onPress}
    >
      <Text style={{ color: '#ffffff', fontSize: 18 }}>Delete</Text>
    </Button>
  )
}

export default DeleteButton;
