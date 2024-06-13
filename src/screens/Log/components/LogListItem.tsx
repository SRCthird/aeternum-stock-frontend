import { Log } from "../hooks/useLogs";
import moment from "moment";
import { Card, Paragraph } from "react-native-paper";
import { Dispatch, SetStateAction } from "react";
import { mode } from "@src/utils/types";
import { AntDesign } from '@expo/vector-icons';
import styles from "@src/utils/styles";

type Props = {
  log: Log
  setItem: Dispatch<SetStateAction<Log>>
  setMode: Dispatch<SetStateAction<mode>>
}

const LogListItem = ({ log, setItem, setMode }: Props) => {

  const formatDate = (date?: Date) => {
    const dt = moment(date);
    return dt.format('DD-MMM-YYYY HH:mm');
  }

  return (
    <Card
      style={styles.card_body}
      onPress={() => {
        setItem(log);
        setMode('edit');
      }}
    >
      <Card.Content style={styles.card_line}>
        <Paragraph style={styles.card_paragraph}>{formatDate(log.date_time)}</Paragraph>
        <Paragraph style={styles.card_paragraph}>{log.lot_number}</Paragraph>
        <Paragraph style={styles.card_paragraph}>{log.quantity_moved}</Paragraph>
      </Card.Content>
      <Card.Content style={styles.card_comments}>
        <Paragraph style={styles.card_paragraph}>{log.from_location}</Paragraph>
        <AntDesign name="arrowright" size={24} color="black" />
        <Paragraph style={styles.card_paragraph}>{log.to_location}</Paragraph>
      </Card.Content>
    </Card>
  )
}

export default LogListItem;
