import { Product } from '../Hooks/useProduct';
import { mode } from "@utils/types";
import { Card } from 'react-native-paper';
import styles from '@src/utils/styles';

type Props = {
  listItem: Product;
  setMode: (mode: mode) => void;
  setItem: (item: Product) => void;
}
const ProductListItem = ({ listItem, setMode, setItem }: Props) => {

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
        subtitle={listItem.description}
      />
    </Card>
  );
}

export default ProductListItem;

