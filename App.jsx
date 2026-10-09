// App.jsx — define as telas do app e como navegar entre elas.
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import VehicleListScreen from './src/screens/VehicleListScreen';
import VehicleFormScreen from './src/screens/VehicleFormScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Movion' }} />
        <Stack.Screen name="VehicleList" component={VehicleListScreen} options={{ title: 'Meus veículos' }} />
        <Stack.Screen name="VehicleForm" component={VehicleFormScreen} options={{ title: 'Novo veículo' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
