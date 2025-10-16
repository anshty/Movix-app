import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllMovieScreen from 'screens/AllMovieScreen';
import HomeScreen from 'screens/HomeScreen';
import MovieScreen from 'screens/MovieScreen';
import PersonScreen from 'screens/PersonScreen';
import SearchScreen from 'screens/SearchScreen';
import DrawerNavigation from './DrawerNavigation';
import FavouriteScreen from 'screens/FavouriteScreen';
import PrivacyPolicy from 'components/PrivacyPolicy';
const Navigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Drawer'>
        <Stack.Screen name='Favourite' component={FavouriteScreen}/>
        <Stack.Screen name="Drawer" component={DrawerNavigation}/>
        <Stack.Screen name="Movie" component={MovieScreen} />
        <Stack.Screen name="Person" component={PersonScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="SeeAll" component={AllMovieScreen} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
