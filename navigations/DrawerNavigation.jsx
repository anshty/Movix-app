import React from 'react';
import { View, Text, Image } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import HomeScreen from 'screens/HomeScreen';
import FavouriteScreen from 'screens/FavouriteScreen';
// import ProfileScreen from 'screens/ProfileScreen';
import Constants from 'expo-constants';

import PrivacyPolicy_btn from 'components/PrivacyPolicy_btn';

const Drawer = createDrawerNavigator();

const CustomDrawer = (props) => {
  return (
    <View className="flex-1 bg-neutral-900">
      {/* 🧑 Profile Header */}
      {/* <View className="p-5 pb-3 border-b border-neutral-700">
        <Image
          source={{
            uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
          }}
          className="w-20 h-20 rounded-full self-center mb-3"
        />
        <Text className="text-white text-center text-lg font-semibold">Guest User</Text>
        <Text className="text-neutral-400 text-center text-xs">Welcome back!</Text>
      </View> */}

      {/* 📋 Drawer Items */}
      <DrawerContentScrollView {...props}>
        <View className="mt-2">
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      {/* 🚪 Footer */}
     <View className="border-t border-neutral-800 p-4">
      <PrivacyPolicy_btn/>
      <Text className="text-center text-xs text-neutral-500">
        Made by Ankit
      </Text>
      <Text className="text-center text-xs text-neutral-500 mt-1">
        Version {Constants.expoConfig?.version || '1.0.0'}
      </Text>
    </View>
    </View>
  );
};

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        swipeEnabled: false,
        drawerActiveBackgroundColor: '#E50914', // Netflix-like red
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#aaa',
        drawerLabelStyle: {
          fontSize: 15,
          marginLeft: -10,
        },
        drawerStyle: {
          backgroundColor: '#1A1A1A',
          width: 250,
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerLabel: 'Home',
          // drawerIcon: ({ color }) => (
          //   <Text style={{ color, fontSize: 18 }}>🏠</Text>
          // ),
        }}
      />
      <Drawer.Screen
        name="Favourite"
        component={FavouriteScreen}
        options={{
          drawerLabel: 'Favourites',
          // drawerIcon: ({ color }) => (
          //   <Text style={{ color, fontSize: 18 }}>❤️</Text>
          // ),
        }}
      />
      {/* <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerLabel: 'Profile',
          drawerIcon: ({ color }) => (
            <Text style={{ color, fontSize: 18 }}>👤</Text>
          ),
        }}
      /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
