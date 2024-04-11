import { TextInput } from 'react-native-paper';

type Props = {
  value: number;
  defaultValue?: number;
  label: string;
  max?: number;
  onChange: (value: number) => void;
};

const NumberInput = ({ value, defaultValue, label, max, onChange }: Props) => {
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
      onChangeText={(text) => {
        let quantity = text.replace(/[^0-9]/g, '');
        let parsedQuantity = parseInt(quantity, 10);
        if (isNaN(parsedQuantity)) {
          parsedQuantity = 0;
        }
        if (max !== undefined && parsedQuantity > max) {
          parsedQuantity = max;
        }
        onChange(parsedQuantity);
      }}
    />
  );
};

export default NumberInput;

