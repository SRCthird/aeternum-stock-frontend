import useWarehouse, { Warehouse } from './Hooks/useWarehouse';
import { FlatList, Text, View } from 'react-native';
import WarehouseListItem from './Components/WarehouseListItem';
import { mode } from '@utils/types';
import { ReactNode, useState } from 'react';
import HiddenTop from '@src/components/HiddenTop';
import { TextInput } from 'react-native-paper';
import styles from '@src/utils/styles';

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
          <View style={styles.search_body}>
            <TextInput
              placeholder="Search..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.search_input}
              textColor={styles.input_text.color}
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
            style={{ width: '100%' }}
            data={result.filter((item) => 
              item.name.includes(searchQuery)
            )}
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
