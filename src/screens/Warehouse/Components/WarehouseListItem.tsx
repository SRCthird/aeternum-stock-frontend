import { Warehouse } from '../Hooks/useWarehouse';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { mode } from '../types';

type Props = {
  listItem: Warehouse;
  setMode: (mode: mode) => void;
  setItem: (item: Warehouse) => void;
}
const WarehouseListItem = ({ listItem, setMode, setItem }: Props) => {

  return (
    <TouchableOpacity
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        padding: 10,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#ccc',
        margin: 10
      }}
      onPress={() => {
        setItem(listItem);
        setMode('edit');
      }}
    >
      <Text style={{ flex: 1 }}>{listItem.name}</Text>
    </TouchableOpacity>
  );
}

export default WarehouseListItem;

