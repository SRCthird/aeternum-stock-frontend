import { TextInput } from 'react-native-paper';

type Props = {
  value: number;
  defaultValue?: number;
  label: string;
  max?: number;
  onChange: (value: number) => void;
  onSubmitEditing?: () => void;
};

const NumberInput = ({ value, defaultValue, label, max, onChange, onSubmitEditing }: Props) => {
  return (
    <TextInput
      style={{
        marginBottom: 10,
        maxWidth: 700,
        width: '100%',
        alignSelf: 'center',
        backgroundColor: '#fff',
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
      onSubmitEditing={onSubmitEditing}
    />
  );
};

export default NumberInput;

