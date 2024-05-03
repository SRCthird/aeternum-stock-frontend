
import { mode } from "@utils/types";
import { FlatList, Text, View } from "react-native";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import HiddenTop from "@src/components/HiddenTop";
import { TextInput } from "react-native-paper";
import useProductLot, { ProductLot } from "@src/screens/ProductLot/Hooks/useProductLot";
import ProductLotListItem from "@src/screens/ProductLot/Components/ProductLotListItem";

type Props = {
  headerNode: ReactNode;
  setMode: Dispatch<SetStateAction<mode>>;
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
              item.lotNumber.includes(searchQuery) ||
              item.internalReference.includes(searchQuery) ||
              item.productName.includes(searchQuery)
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

