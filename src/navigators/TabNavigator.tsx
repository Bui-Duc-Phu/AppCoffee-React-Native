import { View, Text, Platform } from 'react-native'
import React, { ReactNode } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeScreen } from '../screens';
import HomeNavigator from './HomeNavigator';
import ProfileNavigator from './ProfileNavigator';
import CardNavigator from './CardNavigator';
import OdersNavigator from './OdersNavigator';
import { appInfo } from '../contasts/appInfo';
import { appColor } from '../contasts/appColor';
import { Home2, Home3, House2, Profile2User, Receipt21, ShoppingCart, TaskSquare } from 'iconsax-react-native';
import { TextComponent } from '../components';

const TabNavigator = () => {

  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          height: appInfo.sizes.HEIGHT * 0.08,
          paddingBottom: appInfo.sizes.HEIGHT * 0.0085
        }
      }}
    >
      <Tab.Screen
        name='Home'
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ focused, size, color }) => {
            color = focused ? appColor.primary : appColor.gray;
            size = 23;
            return <House2 size={size} color={color} />
          },
          tabBarLabel: ({ focused }) => (
            <TextComponent
              text="Home"
              flex={0}
              size={focused ? 12 : 0}
              color={focused ? appColor.primary : appColor.gray5}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Oders'
        component={OdersNavigator}
        options={{
          tabBarIcon: ({ focused, size, color }) => {
            color = focused ? appColor.primary : appColor.gray;
            size = 23;
            return <TaskSquare size={size} color={color} />
          },
          tabBarLabel: ({ focused }) => (
            <TextComponent
              text="Oders"
              flex={0}
              size={focused ? 12 : 0}
              color={focused ? appColor.primary : appColor.white}
            />
          ),
        }}
      />
      <Tab.Screen
        name='cart'
        component={CardNavigator}
        options={{
          tabBarIcon: ({ focused, size, color }) => {
            return <ShoppingCart size={23} color={focused ? appColor.primary : appColor.gray} />
          },
          tabBarLabel: ({ focused }) => (
            <TextComponent
              text="Cart"
              flex={0}
              size={focused ? 12 : 0}
              color={focused ? appColor.primary : appColor.white}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ focused, size, color }) => {
            return <Profile2User size="23" color={focused ? appColor.primary : appColor.gray} />
          },
          tabBarLabel: ({ focused }) => (
            <TextComponent
              text="Profile"
              flex={0}
              size={focused ? 12 : 0}
              color={focused ? appColor.primary : appColor.white}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default TabNavigator;
