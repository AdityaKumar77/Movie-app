import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import SearchScreen from './screens/SearchScreen';
import EntryScreen from './screens/EntryScreen';

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Entry" component={EntryScreen} options={{ headerShown: false}} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false}} />
        <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false}} />
        <Stack.Screen name="Details" component={DetailsScreen}  options={{ headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
