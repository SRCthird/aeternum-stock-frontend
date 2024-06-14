import { useTheme } from '@src/context/ThemeContext';
import { Warehouse } from '../Hooks/useWarehouse';
import { mode } from '@utils/types';
import { Card } from 'react-native-paper';

type Props = {
  listItem: Warehouse;
  setMode: (mode: mode) => void;
  setItem: (item: Warehouse) => void;
}
const WarehouseListItem = ({ listItem, setMode, setItem }: Props) => {
  const styles = useTheme();

  return (
    <Card
      style={styles.card_body}
      onPress={() => {
        setItem(listItem);
        setMode('edit');
      }}
    >
      <Card.Title
        title={listItem.name}
        titleStyle={styles.header_title}
      />
    </Card>
  );
}

export default WarehouseListItem;

