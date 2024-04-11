import { ProductLot } from '../Hooks/useProductLot';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { mode } from "@utils/types";

type Props = {
  listItem: ProductLot;
  setMode: (mode: mode) => void;
  setItem: (item: ProductLot) => void;
}
const ProductListItem = ({ listItem, setMode, setItem }: Props) => {

  const styles = StyleSheet.create({
    body: {
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
        marginVertical: 5,
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    container: {
      flexDirection: 'row', 
      justifyContent: 'space-between',
    },
    text: {
      flex: 1,
      textAlign: 'center',
    },
  });

  return (
    <TouchableOpacity
      style={styles.body}
      onPress={() => {
        setItem(listItem);
        setMode('edit');
      }}
    >
      <View style={styles.container}>
        <Text style={styles.text}>{listItem.lotNumber}</Text>
        <Text style={styles.text}>{listItem.productName}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>{listItem.internalReference}</Text>
        <Text style={styles.text}>{"Total: " + listItem.quantity}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default ProductListItem;

