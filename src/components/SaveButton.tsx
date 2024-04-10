import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

type Props = {
  setSubmit: (submit: boolean) => void;
}

const SaveButton = ({ setSubmit }: Props) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#219ebc',
        padding: 15,
        marginBottom: 5,
        minWidth: '100%',
        alignItems: 'center',
      }}
      onPress={() => { setSubmit(true); }}
    >
      <Text style={{ color: '#ffffff', fontSize: 18 }}>Save</Text>
    </TouchableOpacity>
  )
}

export default SaveButton;
