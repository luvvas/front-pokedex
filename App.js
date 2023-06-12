import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { FavoritePokemonProvider } from './src/contexts/FavoritesContext'

import { Auth } from './src/screens/Auth'
import { Menu } from './src/screens/Menu'
import { Home } from './src/screens/Home'
import { Pokemon } from './src/screens/Pokemon'

import { Poppins_700Bold, Poppins_700Bold_Italic, Poppins_500Medium, useFonts } from '@expo-google-fonts/poppins'

const Stack = createStackNavigator();

export default function App() {
  const [hasLoadedFonts] = useFonts({
    Poppins_700Bold, 
    Poppins_700Bold_Italic, 
    Poppins_500Medium
  })

  if(!hasLoadedFonts) return null

  return (
    <FavoritePokemonProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={Menu} screenOptions={{headerShown: false}} >
          <Stack.Screen name="Auth" component={Auth} />
          <Stack.Screen name="Menu" component={Menu} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Pokemon" component={Pokemon} />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritePokemonProvider>
  );
}
