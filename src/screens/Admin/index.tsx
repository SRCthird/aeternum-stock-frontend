import { View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@screens';
import AdminActions from './AdminActions';
import AdminHeader from './Components/AdminHeader';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Admin'>;
}

const AdminIndex = ({ navigation }: Props) => {

  return (
    <View style={{ flex: 1 }}>
      <AdminHeader title="Admin" navigation={navigation}/>
      <AdminActions navigation={navigation} />
    </View>
  );
};

export default AdminIndex;
