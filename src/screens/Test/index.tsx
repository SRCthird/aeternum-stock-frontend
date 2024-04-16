import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@screens";
import SearchableDropDown2 from "@src/components/SearchableDropDown";
import { useState } from "react";
import { Text, View } from "react-native";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Test">;
  route: RouteProp<RootStackParamList, "Test">;
}

const TestScreen = ({ navigation, route }: Props) => {
  const [value, setValue] = useState<string>("Test1");


  return (
    <View style = {{ flex: 1}} >
      <View style = {{ flex: 3}} />
      <Text>Test Screen</Text>
      <View style = {{ flex: 1}} />
      <SearchableDropDown2
        label="Test"
        items={["Test1", "Test2", "Test3"]}
        selectedValue={value}
        onValueChange={setValue} 
      />
      <View style = {{ flex: 3}} />
      <Text>Selected Value: {value}</Text>
      <View style = {{ flex: 3}} />
    </View>
  )
}

export default TestScreen;
