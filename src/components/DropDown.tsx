import { Picker } from "@react-native-picker/picker"
import { ReactNode } from "react";
import { Text, View } from "react-native"

type Props = {
  label: string;
  selectedValue: string;
  onValueChange: (itemValue: string, itemIndex: number) => void;
  selection: ReactNode;
}

const DropDown = ({ label, selectedValue, onValueChange, selection }: Props) => {
  return (
    <View
      style={{
        minWidth: '100%',
        margin: 10,
        backgroundColor: '#fffbfe',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#6d6875',
      }}
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
          minWidth: '100%',
          borderRadius: 4,
          backgroundColor: 'transparent',
          padding: 10,
        }}
      >
        {selectedValue === "" && (
          <Picker.Item label="Select a product" value="" />
        )}
        {selection}
      </Picker>
    </View>
  )
}

export default DropDown;

