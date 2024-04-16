import { StyleSheet, Text, View } from "react-native";
import { Log } from "../hooks/useLogs";
import moment from "moment";
import { Card } from "react-native-paper";
import { Dispatch, SetStateAction } from "react";
import { mode } from "@src/utils/types";

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
      style={styles.container}
      onPress={() => {
        setItem(log);
        setMode('edit');
      }}
    >
      <Card.Content style={styles.line}>
        <Text style={styles.text}>{formatDate(log.dateTime)}</Text>
        <Text style={styles.text}>{log.lotNumber}</Text>
        <Text style={styles.text}>{log.quantityMoved}</Text>
        <Text style={styles.text}>{log.toLocation}</Text>
      </Card.Content>
    </Card>
  )
}

const styles = StyleSheet.create({
  line: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  text: {
    fontSize: 16
  },
  container: {
    borderWidth: 1,
    borderColor: "#000",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  comments: {
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  }
})

export default LogListItem;
