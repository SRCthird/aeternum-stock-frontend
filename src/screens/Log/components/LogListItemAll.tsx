import { useTheme } from "@src/context/ThemeContext";
import { Log } from "../hooks/useLogs";
import moment from "moment";
import { Card, Paragraph } from "react-native-paper";

type Props = {
  log: Log
}

const LogListItem = ({ log }: Props) => {
  const styles = useTheme();

  const formatDate = (date?: Date) => {
    const dt = moment(date);
    return dt.format('DD-MMM-YYYY HH:mm');
  }

  return (
    <Card style={styles.card_body} >
      <Card.Content style={styles.card_line}>
        <Paragraph>{log.lot_number}</Paragraph>
        <Paragraph>{log.quantity_moved}</Paragraph>
      </Card.Content>
      <Card.Content style={styles.card_line}>
        <Paragraph>{log.from_location}</Paragraph>
        <Paragraph>to</Paragraph>
        <Paragraph>{log.to_location}</Paragraph>
      </Card.Content>
      <Card.Content style={styles.card_line}>
        <Paragraph>{log.user}</Paragraph>
        <Paragraph>{formatDate(log.date_time)}</Paragraph>
      </Card.Content>
      <Card.Content style={styles.card_comments}>
        <Paragraph>Comments:</Paragraph>
      </Card.Content>
      <Card.Content style={styles.card_line}>
        <Paragraph>{log.comments}</Paragraph>
      </Card.Content>
    </Card>
  )
}

export default LogListItem;
