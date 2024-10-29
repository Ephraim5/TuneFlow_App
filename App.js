import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Pages/login';
import Signup from './Pages/signup';
import Page from './Pages/page';
import Day from './Pages/day';
import Premium from './Pages/Premuim';
import Lyrics from './Pages/lyrics';
import { AudioProvider } from './AudioContext';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <AudioProvider>
    <Stack.Navigator 
     screenOptions={{
      headerShown: false, 
      headerStyle:{
      backgroundColor:"black"
      }
    }}
    initialRouteName='page'>
     
      <Stack.Screen name="page" component={Page} />
      <Stack.Screen name='login' component={Login} />
      <Stack.Screen name='day' component={Day} />
      <Stack.Screen name='signup' component={Signup} />
      <Stack.Screen name='Premium' component={Premium} />
      <Stack.Screen name='Lyrics' component={Lyrics} />
    </Stack.Navigator>
    </AudioProvider>
  </NavigationContainer>
  );
}

