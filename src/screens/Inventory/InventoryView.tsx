import useInventory, { Inventory } from './Hooks/useInventory';
import { FlatList, Text } from 'react-native';
import InventoryListItem from './Components/InventoryListItem';
import { mode } from "@utils/types";
import HiddenTop from '@src/components/HiddenTop';
import { View } from "react-native";
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { TextInput } from 'react-native-paper';

type Props = {
  setMode: Dispatch<SetStateAction<mode>>;
  setItem: Dispatch<SetStateAction<Inventory>>;
  headerNode: ReactNode;
}

const InventoryView = ({ setMode, setItem, headerNode }: Props) => {
  const { result, error, isLoading } = useInventory({});
  const [searchQuery, setSearchQuery] = useState<string>('');

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
              textColor="black"
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
            data={result.filter((item) => 
                item.location.includes(searchQuery) ||
                item.lot_number.includes(searchQuery) ||
                item.created_by.includes(searchQuery) ||
                item.updated_by?.includes(searchQuery)
            )}
            renderItem={({ item }) => (
              <InventoryListItem
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

export default InventoryView;

