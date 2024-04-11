import useInventory, { Inventory } from '../Hooks/useInventory';
import { FlatList, Text } from 'react-native';
import InventoryListItem from './InventoryListItem';
import { mode } from "@utils/types";

type Props = {
  setMode: (mode: mode) => void;
  setItem: (item: Inventory) => void;
}

const InventoryList = ({ setMode, setItem }: Props) => {
  const { result, error, isLoading } = useInventory({});

  return (
    isLoading ? (
      <Text>Loading...</Text>
    ) : error ? (
      <Text>{error}</Text>
    ) : (
      <FlatList
        style={{
          width: '100%',
        }}
        data={result}
        renderItem={({ item }) => (
          <InventoryListItem 
            listItem={item} 
            setMode={setMode}
            setItem={setItem}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    )
  );
}

export default InventoryList;

