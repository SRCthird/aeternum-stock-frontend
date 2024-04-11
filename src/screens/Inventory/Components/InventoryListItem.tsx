import { Inventory } from '../Hooks/useInventory';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { mode } from "@utils/types";

type Props = {
  listItem: Inventory;
  setMode: (mode: mode) => void;
  setItem: (item: Inventory) => void;
}
const InventoryListItem = ({ listItem, setMode, setItem }: Props) => {

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
      <Text style={{ flex: 1 }}>{listItem.lotNumber}</Text>
      <Text style={{ flex: 1 }}>{listItem.location}</Text>
      <Text style={{ flex: 1 }}>{listItem.quantity}</Text>
      <Text style={{ flex: 1 }}>{listItem.createdAt.toString()}</Text>
      <Text style={{ flex: 1 }}>{listItem.createdBy}</Text>
      <Text style={{ flex: 1 }}>{listItem.updatedAt?.toString()}</Text>
      <Text style={{ flex: 1 }}>{listItem.updatedBy}</Text>
    </TouchableOpacity>
  );
}

export default InventoryListItem;

