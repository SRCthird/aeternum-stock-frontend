import { useTheme } from '@src/context/ThemeContext';
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
  const styles = useTheme();
  return (
    <TextInput
      style={styles.input}
      textColor={styles.input_text.color}
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

