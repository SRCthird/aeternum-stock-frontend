import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import HomeHeader from './Components/HomeHeader';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@screens/Home';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Actions'>;
}

const Home = ({navigation}: Props) => {

  const styles = StyleSheet.create({
    action: {
      backgroundColor: '#219ebc',
      padding: 15,
      marginBottom: 5,
      width: '100%',
      alignItems: 'center',
    },
    optionText: {
      color: '#ffffff',
      fontSize: 18,
    },
  })

  return (
    <View style={{ flex: 1 }}>
      <HomeHeader 
        title=""
        navigation={navigation}
      />
      <View style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 5,
      }}>
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

export default Home;
