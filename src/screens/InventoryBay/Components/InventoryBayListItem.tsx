import { InventoryBay } from '../Hooks/useInventoryBay';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { mode } from "@utils/types";

type Props = {
  listItem: InventoryBay;
  setMode: (mode: mode) => void;
  setItem: (item: InventoryBay) => void;
}
const InventoryBayListItem = ({ listItem, setMode, setItem }: Props) => {

  return (
    <TouchableOpacity
      style={{
        width: '100%',
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
      <Text style={{ flex: 1 }}>{listItem.warehouse_name}</Text>
      <Text style={{ flex: 1 }}>{listItem.max_unique_lots}</Text>
    </TouchableOpacity>
  );
}

export default InventoryBayListItem;

