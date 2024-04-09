import { Product } from '@hooks/useProduct';
import { Text, View } from 'react-native';

type Props = {
  listItem: Product;
}
const ProductListItem = ({ listItem }:Props) => {

  return (
    <View style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'stretch',
      padding: 10,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#ccc',
      margin: 10
    }}>
      <Text style={{flex: 1}}>{listItem.id}</Text>
      <Text style={{flex: 2}}>{listItem.name}</Text>
      <Text style={{flex: 3}}>{listItem.description}</Text>
    </View>
  );
}

export default ProductListItem;

