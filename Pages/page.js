import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import Search from './Search';
import Library from '../components/library';
import Premium from './Premuim';
import Music from '../detail/music';
import Gospel from '../detail/godspel';
import { Entypo, EvilIcons, MaterialIcons ,Fontisto} from '@expo/vector-icons';
import MixCard from '../components/MixCard';
import ShowCard from '../components/ShowCard';
import Tending from '../components/Tending';
import Artist from '../components/Artist/Artist';
import Play from './play';
import Favorite from '../components/Favorite';
import FavoriteSong from '../components/FavoriteSong';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Home" component={Home} options={{
        headerShown: false,
      }} />
      <Stack.Screen name="Music" component={Music}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTitleStyle: {
            fontSize: 35,
            fontWeight: 'bold',
          },
          headerTintColor: "#ffffff",
          headerTitle: 'Music',
          headerLargeTitle: true,
        }} />
      <Stack.Screen name="Gospel" component={Gospel} options={{
        headerShown: true,
        headerTitle: 'Gospel',
      }} />
      <Stack.Screen component={MixCard} name='mixcard' />
      <Stack.Screen component={Favorite} name='Favorite' />
      <Stack.Screen component={ShowCard} name='showcard' />
      <Stack.Screen component={Tending} name='tending' />
      <Stack.Screen component={FavoriteSong} name='FavoriteSong' />
      <Stack.Screen component={Artist} name='artist' options={{
        headerShown: false, headerStyle: {
          backgroundColor: 'green',
        },
      }} />
      <Stack.Screen name='PLayMusic'
        options={{ headerShown: true, headerTintColor: "black" }}
        component={Play} />
    </Stack.Navigator>
  );
}

function SearchStack() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Search" component={Search} options={{
        headerShown: false,
      }} />
      <Stack.Screen name="Music" component={Music}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTitleStyle: {
            fontSize: 35,
            fontWeight: 'bold',
          },
          headerTintColor: "#ffffff",
          headerTitle: 'Music',
          headerLargeTitle: true,
        }} />
      <Stack.Screen name="Gospel" component={Gospel} options={{
        headerShown: true,
        headerTitle: 'Gospel',
      }} />
      <Stack.Screen component={Favorite} name='Favorite' />
      <Stack.Screen component={FavoriteSong} name='FavoriteSong' />

      <Stack.Screen name='PLayMusic'
        options={{ headerShown: true, headerTintColor: "black" }}
        component={Play} />

    </Stack.Navigator>
  );
}

function LibraryStack() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Library" component={Library}
        options={{
          headerShown: false,
        }} />
      <Stack.Screen name="Music" component={Music} options={{
        headerShown: true,
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTitleStyle: {
          fontSize: 35,
          fontWeight: 'bold',
        },
        headerTintColor: "#ffffff",
        headerTitle: 'Music',
        headerLargeTitle: true,
      }} />
      <Stack.Screen name="Gospel" component={Gospel} options={{
        headerShown: true,
        headerTitle: 'Gospel',
      }} />
      <Stack.Screen component={Favorite} name='Favorite' />
      <Stack.Screen component={FavoriteSong} name='FavoriteSong' />

      <Stack.Screen name='PLayMusic'
        options={{ headerShown: true, headerTintColor: "black" }}
        component={Play} />
    </Stack.Navigator>
  );
}

function UserStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="User" component={Premium} />
      <Stack.Screen name="Music" component={Music} options={{
        headerShown: true,
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTitleStyle: {
          fontSize: 35,
          fontWeight: 'bold',
        },
        headerTintColor: "#ffffff",
        headerTitle: 'Music',
        headerLargeTitle: true,
      }} />
      <Stack.Screen name="Gospel" component={Gospel} />
      <Stack.Screen component={Favorite} name='Favorite' />
      <Stack.Screen component={FavoriteSong} name='FavoriteSong' />

      <Stack.Screen name='PLayMusic'
        options={{ headerShown: true, headerTintColor: "black" }}
        component={Play} />
    </Stack.Navigator>
  );
}

const Page = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarStyle: {
          height: 65,
          paddingTop: 10,
          backgroundColor: "rgb(0,0,0)",
          borderTopWidth: 0,
        },
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarLabelStyle: {
          marginBottom: 5,
          paddingBottom: 5,
          fontSize: 11,
          fontWeight: 'bold'
        }
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={30} color={color} />
          ),
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchStack}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <EvilIcons name="search" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="LibraryTab"
        component={LibraryStack}
        options={{
          tabBarLabel: 'Library',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="library-music" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="UserTab"
        component={UserStack}
        options={{
          tabBarLabel: 'Wallet',
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="wallet" size={30} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({})

export default Page;
