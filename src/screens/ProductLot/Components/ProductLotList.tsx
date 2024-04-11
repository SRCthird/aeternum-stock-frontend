import { FlatList, Text } from 'react-native';
import ProductLotListItem from './ProductLotListItem';
import { mode } from "@utils/types";
import useProductLot, { ProductLot } from '../Hooks/useProductLot';

type Props = {
  setMode: (mode: mode) => void;
  setItem: (item: ProductLot) => void;
}

const ProductLotList = ({ setMode, setItem }: Props) => {
  const { result, error, isLoading } = useProductLot({});
  console.log(result);

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
        renderItem={({ item }) => (
          <ProductLotListItem 
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

export default ProductLotList;

