import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { TextInput } from 'react-native-paper';
import useProduct, { Product } from "./Hooks/useProduct";
import { FlatList, Text, View } from "react-native";
import ProductListItem from "./Components/ProductListItem";
import HiddenTop from "@src/components/HiddenTop";
import { mode } from "@src/utils/types";

type Props = {
  setMode: Dispatch<SetStateAction<mode>>;
  setItem: Dispatch<SetStateAction<Product>>;
  headerNode: ReactNode;
}

const ProductListView = ({ setMode, setItem, headerNode }: Props) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { result, error, isLoading } = useProduct({});

  return (
    isLoading ? (
      <Text>Loading...</Text>
    ) : error ? (
      <Text>{error}</Text>
    ) : (
      <View style={{ flex: 1 }}>
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
                item.name.includes(searchQuery) ||
                item.description.includes(searchQuery)
              )}
              renderItem={({ item }) => (
                <ProductListItem
                  listItem={item}
                  setMode={setMode}
                  setItem={setItem}
                />
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          }
        />
      </View>
    )
  );
}

export default ProductListView;

