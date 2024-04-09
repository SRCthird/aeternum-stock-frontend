import { View, Text, TouchableOpacity } from 'react-native';
import Header from '@components/Header';
import { styles } from '@styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@screens/Home';
import { useNavigation } from '@react-navigation/native';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ActionScreen'>;
}

const ActionScreen = ({navigation}: Props) => {
  return (
    <View style={styles.container}>
      <Header 
        title=""
        navigation={navigation}
      />
      <View style={styles.body}>
        <TouchableOpacity style={styles.action} onPress={() => { }}>
          <Text style={styles.optionText}>Create Item</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action} onPress={() => { }}>
          <Text style={styles.optionText}>Inventory Transfer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action} onPress={() => { }}>
          <Text style={styles.optionText}>Release Item</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action} onPress={() => { }}>
          <Text style={styles.optionText}>Scrap Items</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ActionScreen;
