import { TextInput } from "react-native-paper";

type Props = {
  value: number;
  defaultValue?: number;
  label: string;
  onChange: (value: number) => void;
}
const NumberInput = ({ value, defaultValue, label, onChange }: Props) => {

  return (
    <TextInput
      style={{
        minWidth: '100%',
        margin: 10,
      }}
      label={label}
      mode="outlined"
      keyboardType="numeric"
      value={value.toString()}
      defaultValue={defaultValue?.toString()}
      onChangeText={text => {
        let quantity = text.replace(/[^0-9]/g, '');
        let parsedQuantity = parseInt(quantity, 10);
        if (isNaN(parsedQuantity)) {
          parsedQuantity = 0;
        }
        onChange(parsedQuantity);
      }}
    />
  )
}

export default NumberInput;
