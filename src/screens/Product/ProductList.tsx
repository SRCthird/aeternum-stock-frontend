import useProduct from '@src/hooks/useProduct';
import { FlatList, Text } from 'react-native';
import ProductListItem from './ProductListItem';

const ProductList = () => {
  const { result, error, isLoading } = useProduct({});

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
        renderItem={({ item }) => <ProductListItem listItem={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    )
  );
}

export default ProductList;

