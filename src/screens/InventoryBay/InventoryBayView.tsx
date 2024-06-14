import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { mode } from "@utils/types";
import useInventoryBay, { InventoryBay } from "./Hooks/useInventoryBay";
import { FlatList, Text, View } from "react-native";
import InventoryBayListItem from "./Components/InventoryBayListItem";
import HiddenTop from "@src/components/HiddenTop";
import { TextInput } from 'react-native-paper';
import { useTheme } from "@src/context/ThemeContext";

type Props = {
  headerNode: ReactNode;
  setMode: Dispatch<SetStateAction<mode>>;
  setItem: Dispatch<SetStateAction<InventoryBay>>;
}

const InventoryBayView = ({ headerNode, setMode, setItem }: Props) => {
  const styles = useTheme();
  const { result, error, isLoading } = useInventoryBay({});
  const [searchQuery, setSearchQuery] = useState<string>('');

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
              item.name.includes(searchQuery) ||
              item.warehouse_name.includes(searchQuery)
            )}
            renderItem={({ item }) => (
              <InventoryBayListItem
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

export default InventoryBayView;

