import { useTheme } from "@src/context/ThemeContext";
import useInventory from "@src/screens/Inventory/Hooks/useInventory";
import useLog from "@src/screens/Log/hooks/useLogs";
import { ProductLot } from "@src/screens/ProductLot/Hooks/useProductLot";
import { mode } from "@src/utils/types";
import moment from "moment";
import { Dispatch, SetStateAction } from "react";
import { ScrollView } from "react-native";
import { Card, Paragraph, Title, Caption, Divider } from "react-native-paper";

type Props = {
  item: ProductLot;
  setMode: Dispatch<SetStateAction<mode>>;
}

const LotProfile = ({ item, setMode }: Props) => {
  const styles = useTheme();
  const { logs } = useLog({ lot_number: item.lot_number });
  const { result } = useInventory({ lot_number: item.lot_number });

  const formatDate = (date?: Date) => moment(date).format('DD-MMM-YYYY HH:mm');

  return (
    <ScrollView>
      <Card style={styles.card_body}>
        <Card.Title 
          titleStyle={styles.header_title}
          title={item.lot_number} 
          subtitleStyle={styles.header_title}
          subtitle={item.product_name} 
        />
        <Divider />
        <Card.Content>
          <Title style={styles.header_title}>Current Location</Title>
          {result.length > 0 ? result.map((inventory) => (
            <Card.Content key={inventory.id}>
              <Paragraph style={styles.header_title}>Location: {inventory.location}</Paragraph>
              <Paragraph style={styles.header_title}>Quantity: {inventory.quantity}</Paragraph>
              <Caption style={styles.header_title}>Created at: {formatDate(inventory.created_at)}</Caption>
              {inventory.comments && <Paragraph style={styles.header_title}>Comments: {inventory.comments}</Paragraph>}
            </Card.Content>
          )) : <Paragraph style={styles.header_title}>Not found in Inventory</Paragraph>}
        </Card.Content>
        <Divider />
        <Card.Content>
          <Title style={styles.header_title}>Log History</Title>
          {logs.map((log) => (
            <Card.Content key={log.id}>
              <Divider />
              <Paragraph style={styles.header_title}>Transfer: {log.from_location}  to  {log.to_location}</Paragraph>
              <Paragraph style={styles.header_title}>Quantity Moved: {log.quantity_moved}</Paragraph>
              <Caption style={styles.header_title}>Date: {formatDate(log.date_time)}</Caption>
              <Paragraph style={styles.header_title}>User: {log.user}</Paragraph>
              {log.comments && <Paragraph style={styles.header_title}>Comments: {log.comments}</Paragraph>}
            </Card.Content>
          ))}
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

export default LotProfile;

