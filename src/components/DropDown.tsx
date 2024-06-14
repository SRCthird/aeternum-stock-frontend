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
        style={{
          position: 'absolute',
          backgroundColor: '#f2f2f2',
          top: -10,
          left: 10,
          paddingHorizontal: 5,
          fontSize: 12,
          color: '#6d6875',
        }}
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

