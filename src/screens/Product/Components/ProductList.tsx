import useProduct, { Product } from '../Hooks/useProduct';
import { FlatList, Text } from 'react-native';
import ProductListItem from './ProductListItem';
import { mode } from "@utils/types";

type Props = {
  setMode: (mode: mode) => void;
  setItem: (item: Product) => void;
}

const ProductList = ({ setMode, setItem }: Props) => {
  const { result, error, isLoading } = useProduct({});

  return (
    isLoading ? (
      <Text>Loading...</Text>
    ) : error ? (
      <Text>{error}</Text>
    ) : (
      <FlatList
        style={{ width: '100%' }}
        data={result}
        renderItem={({ item }) => (
          <ProductListItem 
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

export default ProductList;

