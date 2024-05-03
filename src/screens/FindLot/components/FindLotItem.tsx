import { AntDesign } from "@expo/vector-icons";
import useInventory from "@src/screens/Inventory/Hooks/useInventory";
import useLog from "@src/screens/Log/hooks/useLogs";
import { ProductLot } from "@src/screens/ProductLot/Hooks/useProductLot";
import { mode } from "@src/utils/types";
import moment from "moment";
import { Dispatch, SetStateAction, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { Card, Paragraph, Title, Caption, Divider } from "react-native-paper";

type Props = {
  item: ProductLot;
  setMode: Dispatch<SetStateAction<mode>>;
}

const LotProfile = ({ item, setMode }: Props) => {
  const { logs, error, loading } = useLog({ lotNumber: item.lotNumber });
  const { result } = useInventory({ lotNumber: item.lotNumber });

  const formatDate = (date?: Date) => moment(date).format('DD-MMM-YYYY HH:mm');

  return (
    <ScrollView>
      <Card style={{ margin: 10 }}>
        <Card.Title 
          title={item.lotNumber} 
          subtitle={item.productName} 
        />
        <Divider />
        <Card.Content>
          <Title>Current Location</Title>
          {result.length > 0 ? result.map((inventory) => (
            <Card.Content key={inventory.id}>
              <Paragraph>Location: {inventory.location}</Paragraph>
              <Paragraph>Quantity: {inventory.quantity}</Paragraph>
              <Caption>Updated at: {formatDate(inventory.updatedAt)}</Caption>
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
              <Paragraph>From: {log.fromLocation}</Paragraph>
              <Paragraph>To: {log.toLocation}</Paragraph>
              <Paragraph>Quantity Moved: {log.quantityMoved}</Paragraph>
              <Caption>Date: {formatDate(log.dateTime)}</Caption>
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

