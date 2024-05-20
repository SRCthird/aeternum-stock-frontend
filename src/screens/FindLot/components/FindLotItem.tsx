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
  const { logs } = useLog({ lot_number: item.lot_number });
  const { result } = useInventory({ lot_number: item.lot_number });

  const formatDate = (date?: Date) => moment(date).format('DD-MMM-YYYY HH:mm');

  return (
    <ScrollView>
      <Card style={{ margin: 10 }}>
        <Card.Title 
          title={item.lot_number} 
          subtitle={item.product_name} 
        />
        <Divider />
        <Card.Content>
          <Title>Current Location</Title>
          {result.length > 0 ? result.map((inventory) => (
            <Card.Content key={inventory.id}>
              <Paragraph>Location: {inventory.location}</Paragraph>
              <Paragraph>Quantity: {inventory.quantity}</Paragraph>
              <Caption>Created at: {formatDate(inventory.created_at)}</Caption>
              {inventory.comments && <Paragraph>Comments: {inventory.comments}</Paragraph>}
            </Card.Content>
          )) : <Paragraph>Not found in Inventory</Paragraph>}
        </Card.Content>
        <Divider />
        <Card.Content>
          <Title>Log History</Title>
          {logs.map((log) => (
            <Card.Content key={log.id}>
              <Divider />
              <Paragraph>Transfer: {log.from_location}  to  {log.to_location}</Paragraph>
              <Paragraph>Quantity Moved: {log.quantity_moved}</Paragraph>
              <Caption>Date: {formatDate(log.date_time)}</Caption>
              <Paragraph>User: {log.user}</Paragraph>
              {log.comments && <Paragraph>Comments: {log.comments}</Paragraph>}
            </Card.Content>
          ))}
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

export default LotProfile;

