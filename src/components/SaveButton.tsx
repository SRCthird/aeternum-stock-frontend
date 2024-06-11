import { Text } from "react-native";
import { Button } from "react-native-paper";

type Props = {
  setSubmit: (submit: boolean) => void;
}

const SaveButton = ({ setSubmit }: Props) => {
  return (
    <Button
      style={{
        backgroundColor: '#d0bcff',
        marginBottom: 10,
        maxWidth: 700,
        width: '100%',
        alignSelf: 'center',
        height: 70,
        justifyContent: 'center'
      }}
      onPress={() => { setSubmit(true); }}
    >
      <Text style={{ color: '#ffffff', fontSize: 18 }}>Save</Text>
    </Button>
  )
}

export default SaveButton;
