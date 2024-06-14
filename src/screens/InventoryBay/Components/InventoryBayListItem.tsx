import { useTheme } from '@src/context/ThemeContext';
import { InventoryBay } from '../Hooks/useInventoryBay';
import { mode } from "@utils/types";
import { Card, Paragraph } from 'react-native-paper';

type Props = {
  listItem: InventoryBay;
  setMode: (mode: mode) => void;
  setItem: (item: InventoryBay) => void;
}
const InventoryBayListItem = ({ listItem, setMode, setItem }: Props) => {
  const styles = useTheme();

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
        <Paragraph style={styles.card_paragraph}>{listItem.max_unique_lots}</Paragraph>
      </Card.Content>
    </Card>
  );
}

export default InventoryBayListItem;

