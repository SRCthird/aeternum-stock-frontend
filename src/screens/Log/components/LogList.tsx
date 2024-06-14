import { Dispatch, ReactNode, SetStateAction, useState } from "react"
import useLog, { Log } from "../hooks/useLogs"
import { FlatList, Text, View } from "react-native"
import LogListItem from "./LogListItem"
import { mode } from "@src/utils/types"
import HiddenTop from "@src/components/HiddenTop"
import { TextInput } from "react-native-paper"
import { useTheme } from "@src/context/ThemeContext"

type Props = {
  headerNode: ReactNode
  setItem: Dispatch<SetStateAction<Log>>
  setMode: Dispatch<SetStateAction<mode>>
}

const LogList = ({ headerNode, setItem, setMode }: Props) => {
  const styles = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>('')
  const { logs, error, loading } = useLog({})

  return (
    loading ? (
      <Text>Loading...</Text>
    ) : error ? (
      <Text>{error}</Text>
    ) : (
      <View style={styles.container}>
        <HiddenTop
          headerNode={
            <View style={{ width: '100%' }}>
              {headerNode}
            </View>
          }
          finalHeight={100}
          searchNode={
            <View style={styles.search_body}>
              <TextInput
                placeholder="Search..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={styles.search_input}
                textColor={styles.input_text.color}
              />
            </View>
          }
          contentNode={
            <FlatList
              style={{ width: '100%' }}
              data={
                logs.filter((item) =>
                  item.user.includes(searchQuery) ||
                  item.lot_number.includes(searchQuery) ||
                  item.to_location.includes(searchQuery) ||
                  item.from_location.includes(searchQuery) ||
                  item.comments.includes(searchQuery)
                )
              }
              renderItem={({ item }) => (
                <LogListItem
                  setItem={setItem}
                  setMode={setMode}
                  log={item}
                />
              )}
              keyExtractor={item => item.id.toString()}
            />
          }
        />
      </View>
    )
  )
}

export default LogList;
