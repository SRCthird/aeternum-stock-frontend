import { Inventory } from '../Hooks/useInventory';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { mode } from "@utils/types";
import { useEffect, useState } from 'react';
import moment from 'moment';

type Props = {
  listItem: Inventory;
  setMode: (mode: mode) => void;
  setItem: (item: Inventory) => void;
}
const InventoryListItem = ({ listItem, setMode, setItem }: Props) => {
  const [edited, setEdited] = useState(false);

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
    label: {
      flex: 1,
      textAlign: 'center',
    },
    text: {
      flex: 2,
      textAlign: 'center',
    },
  });

  useEffect(() => {
    if (formatDate(listItem.updated_at) !== "Invalid date") {
      setEdited(true);
    }
  }, []);

  const formatDate = (date?: Date) => {
    const dt = moment(date);
    return dt.format('DD-MMM-YYYY HH:mm');
  }

  return (
    <TouchableOpacity
      style={styles.body}
      onPress={() => {
        setItem(listItem);
        setMode('edit');
      }}
    >
      <View style={styles.container}>
        <Text style={styles.text}>{listItem.lot_number}</Text>
        <Text style={styles.text}>{listItem.location}</Text>
        <Text style={styles.text}>{listItem.quantity}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>Created: </Text>
        <Text style={styles.text}>{formatDate(listItem.created_at)}</Text>
        <Text style={styles.text}>{listItem.created_by}</Text>
      </View>
      {edited && (
        <View style={styles.container}>
          <Text style={styles.label}>Updated: </Text>
          <Text style={styles.text}>{formatDate(listItem.updated_at)}</Text>
          <Text style={styles.text}>{listItem.updated_by}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

export default InventoryListItem;

