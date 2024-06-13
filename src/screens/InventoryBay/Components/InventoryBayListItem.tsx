import { InventoryBay } from '../Hooks/useInventoryBay';
import { mode } from "@utils/types";
import styles from '@src/utils/styles';
import { Card, Paragraph } from 'react-native-paper';

type Props = {
  listItem: InventoryBay;
  setMode: (mode: mode) => void;
  setItem: (item: InventoryBay) => void;
}
const InventoryBayListItem = ({ listItem, setMode, setItem }: Props) => {

  return (
    <Card
      style={styles.card_body}
      onPress={() => {
        setItem(listItem);
        setMode('edit');
      }}
    >
      <Card.Title
        titleStyle={styles.header_title}
        title={listItem.name}
        subtitleStyle={styles.header_title}
        subtitle={listItem.warehouse_name}
      />
      <Card.Content>
        <Paragraph style={styles.header_title}>{listItem.max_unique_lots}</Paragraph>
      </Card.Content>
    </Card>
  );
}

export default InventoryBayListItem;

