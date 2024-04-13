import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@screens";
import { Text, View } from "react-native";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Test">;
  route: RouteProp<RootStackParamList, "Test">;
}

const TestScreen = ({ navigation, route }: Props) => {
  return (
    <View>
      <Text>Test Screen</Text>
    </View>
  )
}

export default TestScreen;
