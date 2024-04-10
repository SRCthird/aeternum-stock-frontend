import { Product } from '../Hooks/useProduct';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { mode } from '..';

type Props = {
  listItem: Product;
  setMode: (mode: mode) => void;
  setItem: (item: Product) => void;
}
const ProductListItem = ({ listItem, setMode, setItem }: Props) => {

  return (
    <TouchableOpacity
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        padding: 10,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#ccc',
        margin: 10
      }}
      onPress={() => {
        setItem(listItem);
        setMode('edit');
      }}
    >
      <Text style={{ flex: 1 }}>{listItem.name}</Text>
      <Text style={{ flex: 2 }}>{listItem.description}</Text>
    </TouchableOpacity>
  );
}

export default ProductListItem;

