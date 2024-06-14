import { useTheme } from "@src/context/ThemeContext";
import { Text } from "react-native";
import { Button } from "react-native-paper";

type Props = {
  setSubmit: (submit: boolean) => void;
}

const SaveButton = ({ setSubmit }: Props) => {
  const styles = useTheme();
  return (
    <Button
      style={[styles.button, styles.save]}
      onPress={() => { setSubmit(true); }}
    >
      <Text style={styles.save}>Save</Text>
    </Button>
  )
}

export default SaveButton;
