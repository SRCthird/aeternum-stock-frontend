import { Picker } from "@react-native-picker/picker"
import { useTheme } from "@src/context/ThemeContext";
import { ReactNode, } from "react";
import { Text, View } from "react-native"

type Props = {
  label: string;
  placeHolder?: string;
  selectedValue: string;
  loading?: boolean;
  onValueChange: (itemValue: string, itemIndex: number) => void;
  selection: ReactNode;
}

const DropDown = ({ label, placeHolder, selectedValue, loading, onValueChange, selection }: Props) => {
  const styles = useTheme();

  return (
    <View
      style={styles.input}
    >
      <Text
        style={styles.dropdown}
      >
        {label}
      </Text>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={{
          width: '100%',
          borderRadius: 4,
          backgroundColor: 'transparent',
          padding: 10,
        }}
      >
        {selectedValue === "" && (
          <Picker.Item label={placeHolder} value="" />
        )}
        {selection}
      </Picker>
    </View>
  )
}

export default DropDown;

