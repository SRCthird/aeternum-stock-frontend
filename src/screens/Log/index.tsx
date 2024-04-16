import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamList } from ".."
import { Text, View } from "react-native";
import LogList from "./components/LogList";
import { useState } from "react";
import { mode } from "@src/utils/types";
import LogHeader from "./components/LogHeader";
import { Log } from "./hooks/useLogs";
import LogListItem from "./components/LogListItemAll";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Log'>;
}

const LogIndex = ({ navigation }: Props) => {
  const [mode, setMode] = useState<mode>('view');
  const [key, setKey] = useState<number>(0);
  const [item, setItem] = useState<Log>({
    id: 0,
    fromLocation: '',
    toLocation: '',
    dateTime: new Date(),
    user: '',
    lotNumber: '',
    quantityMoved: 0,
    comments: ''
  });

  switch (mode) {
    case 'view':
      return (
        <View style={{ flex: 1 }}>
          <LogHeader 
            label="View logs"
            setMode={setMode} 
            navigation={navigation} 
            setKey={setKey}
          />
          <LogList 
            setItem={setItem}
            setMode={setMode}
            key={key}
          />
        </View>
      )
    default:
      return (
        <View style={{ flex: 1 }}>
          <LogHeader 
            label="View log"
            setMode={setMode} 
            navigation={navigation} 
            setKey={setKey}
          />
          <LogListItem
            log={item}
          />
        </View>
      )
  }
}

export default LogIndex;
