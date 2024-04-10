import { InventoryBay } from '../Hooks/useInventoryBay';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { mode } from '../types';

type Props = {
  listItem: InventoryBay;
  setMode: (mode: mode) => void;
  setItem: (item: InventoryBay) => void;
}
const InventoryBayListItem = ({ listItem, setMode, setItem }: Props) => {

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
      <Text style={{ flex: 1 }}>{listItem.warehouseName}</Text>
      <Text style={{ flex: 1 }}>{listItem.maxUniqueLots}</Text>
    </TouchableOpacity>
  );
}

export default InventoryBayListItem;

