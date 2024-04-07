import useProduct from '@src/hooks/useProduct';
import { FlatList, Text } from 'react-native';

const ProductList = () => {
  const { result, error, isLoading } = useProduct({});

  return (
    isLoading ? (
      <Text>Loading...</Text>
    ) : (
      <FlatList
        data={result}
        renderItem={({ item }) => <Text>{item.lotnumber}</Text>}
        keyExtractor={(item) => item.id.toString()}
      />
    )
  );
}

export default ProductList;

