import useInventoryBay, { InventoryBay } from '../Hooks/useInventoryBay';
import { FlatList, Text } from 'react-native';
import WarehouseListItem from './InventoryBayListItem';
import { mode } from '../types';

type Props = {
  setMode: (mode: mode) => void;
  setItem: (item: InventoryBay) => void;
}

const WarehouseList = ({ setMode, setItem }: Props) => {
  const { result, error, isLoading } = useInventoryBay({});

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
          <WarehouseListItem 
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

export default WarehouseList;

