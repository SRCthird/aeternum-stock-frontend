import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamList } from ".."
import { View } from "react-native";
import LogList from "./components/LogList";
import { useState } from "react";
import { mode } from "@src/utils/types";
import LogHeader from "./components/LogHeader";
import { Log } from "./hooks/useLogs";
import LogListItem from "./components/LogListItemAll";
import { useTheme } from "@src/context/ThemeContext";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Log'>;
}

const LogIndex = ({ navigation }: Props) => {
  const styles = useTheme();
  const [mode, setMode] = useState<mode>('view');
  const [key, setKey] = useState<number>(0);
  const [item, setItem] = useState<Log>({
    id: 0,
    from_location: '',
    to_location: '',
    date_time: new Date(),
    user: '',
    lot_number: '',
    quantity_moved: 0,
    comments: ''
  });

  switch (mode) {
    case 'view':
      return (
        <View style={styles.container}>
          <LogList
            headerNode={
              <LogHeader
                label="View logs"
                setMode={setMode}
                navigation={navigation}
                setKey={setKey}
              />
            }
            setItem={setItem}
            setMode={setMode}
            key={key}
          />
        </View>
      )
    default:
      return (
        <View style={styles.container}>
          <LogHeader
            label="View log"
            setMode={setMode}
            navigation={navigation}
            setKey={setKey}
          />
          <LogListItem
            log={item}
          />
          <View style={{ flex: 1 }} />
        </View>
      )
  }
}

export default LogIndex;
