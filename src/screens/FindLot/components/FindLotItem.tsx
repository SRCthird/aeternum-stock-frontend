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
      <Card style={{ 
        margin: 10,
        backgroundColor: 'white'
      }}>
        <Card.Title 
          titleStyle={{ color: 'black' }}
          title={item.lot_number} 
          subtitleStyle={{ color: 'black' }}
          subtitle={item.product_name} 
        />
        <Divider />
        <Card.Content>
          <Title style={{ color: 'black'}}>Current Location</Title>
          {result.length > 0 ? result.map((inventory) => (
            <Card.Content key={inventory.id}>
              <Paragraph style={{ color: 'black'}}>Location: {inventory.location}</Paragraph>
              <Paragraph style={{ color: 'black'}}>Quantity: {inventory.quantity}</Paragraph>
              <Caption style={{ color: 'black'}}>Created at: {formatDate(inventory.created_at)}</Caption>
              {inventory.comments && <Paragraph style={{ color: 'black'}}>Comments: {inventory.comments}</Paragraph>}
            </Card.Content>
          )) : <Paragraph style={{ color: 'black'}}>Not found in Inventory</Paragraph>}
        </Card.Content>
        <Divider />
        <Card.Content>
          <Title style={{ color: 'black'}}>Log History</Title>
          {logs.map((log) => (
            <Card.Content key={log.id}>
              <Divider />
              <Paragraph style={{ color: 'black'}}>Transfer: {log.from_location}  to  {log.to_location}</Paragraph>
              <Paragraph style={{ color: 'black'}}>Quantity Moved: {log.quantity_moved}</Paragraph>
              <Caption style={{ color: 'black'}}>Date: {formatDate(log.date_time)}</Caption>
              <Paragraph style={{ color: 'black'}}>User: {log.user}</Paragraph>
              {log.comments && <Paragraph style={{ color: 'black'}}>Comments: {log.comments}</Paragraph>}
            </Card.Content>
          ))}
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

export default LotProfile;

