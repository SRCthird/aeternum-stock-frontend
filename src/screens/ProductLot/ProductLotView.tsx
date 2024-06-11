import { mode } from "@utils/types";
import useProductLot, { ProductLot } from "./Hooks/useProductLot";
import { FlatList, Text, View } from "react-native";
import ProductLotListItem from './Components/ProductLotListItem';
import { ReactNode, useState } from "react";
import HiddenTop from "@src/components/HiddenTop";
import { TextInput } from "react-native-paper";

type Props = {
  headerNode: ReactNode;
  setMode: (mode: mode) => void;
  setItem: (item: ProductLot) => void;
}

const ProductListView = ({ headerNode, setMode, setItem }: Props) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { result, error, isLoading } = useProductLot({});

  return (
    isLoading ? (
      <Text>Loading...</Text>
    ) : error ? (
      <Text>{error}</Text>
    ) : (
      <HiddenTop
        headerNode={
          <View style={{ width: '100%' }}>
            {headerNode}
          </View>
        }
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
        contentNode={
          <FlatList
            style={{
              width: '100%',
            }}
            data={result.filter((item) =>
              item.lot_number.includes(searchQuery) ||
              item.internal_reference.includes(searchQuery) ||
              item.product_name.includes(searchQuery)
            )}
            renderItem={({ item }) => (
              <ProductLotListItem
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

export default ProductListView;

