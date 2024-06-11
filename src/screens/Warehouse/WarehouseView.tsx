import useWarehouse, { Warehouse } from './Hooks/useWarehouse';
import { FlatList, Text, View } from 'react-native';
import WarehouseListItem from './Components/WarehouseListItem';
import { mode } from '@utils/types';
import { ReactNode, useState } from 'react';
import HiddenTop from '@src/components/HiddenTop';
import { TextInput } from 'react-native-paper';

type Props = {
  headerNode: ReactNode;
  setMode: (mode: mode) => void;
  setItem: (item: Warehouse) => void;
}

const WarehouseView = ({ headerNode, setMode, setItem }: Props) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { result, error, isLoading } = useWarehouse({});

  return (
    isLoading ? (
      <Text>Loading...</Text>
    ) : error ? (
      <Text>{error}</Text>
    ) : (
      <HiddenTop
        searchNode={
          <View style={{
            width: '100%',
            padding: 10,
            paddingTop: 30,
          }}>
            <TextInput
              placeholder="Search..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={{
                width: '100%',
                backgroundColor: 'white',
              }}
            />
          </View>
        }
        finalHeight={100}
        headerNode={
          <View style={{ width: '100%' }}>
            {headerNode}
          </View>
        }
        contentNode={
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
        }
      />
    )
  );
}

export default WarehouseView;
