import { useTheme } from "@src/context/ThemeContext";
import { Text } from "react-native";
import { Button } from "react-native-paper";

type Props = {
  onPress: () => void;
}

const DeleteButton = ({ onPress }: Props) => {
  const styles = useTheme();
  return (
    <Button
      style={[styles.button, styles.delete]}
      onPress={onPress}
    >
      <Text style={styles.delete}>Delete</Text>
    </Button>
  )
}

export default DeleteButton;
