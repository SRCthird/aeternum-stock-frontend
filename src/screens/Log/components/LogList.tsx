import { Dispatch, SetStateAction, useState } from "react"
import useLog, { Log } from "../hooks/useLogs"
import { FlatList, Text, View } from "react-native"
import LogListItem from "./LogListItem"
import { mode } from "@src/utils/types"

type Props = {
  setItem: Dispatch<SetStateAction<Log>>
  setMode: Dispatch<SetStateAction<mode>>
}

const LogList = ({ setItem, setMode }: Props) => {
  const [id, setId] = useState<number>()
  const [location, setLocation] = useState<string>()
  const [lotNumber, setLotNumber] = useState<string>()
  const [user, setUser] = useState<string>()
  const { logs, error, loading } = useLog({
    id,
    location,
    lotNumber,
    user
  })

  return (
    <FlatList
      data={logs}
      renderItem={({ item }) => (
        <LogListItem 
          setItem={setItem}
          setMode={setMode}
          log={item} 
        />
      )}
      keyExtractor={item => item.id.toString()}
    />
  )
}

export default LogList;
