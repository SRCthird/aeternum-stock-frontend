import { Warehouse } from '../Hooks/useWarehouse';
import { mode } from '@utils/types';
import { Card } from 'react-native-paper';
import styles from '@src/utils/styles';

type Props = {
  listItem: Warehouse;
  setMode: (mode: mode) => void;
  setItem: (item: Warehouse) => void;
}
const WarehouseListItem = ({ listItem, setMode, setItem }: Props) => {

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

