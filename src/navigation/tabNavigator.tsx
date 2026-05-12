import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Bookmark, Clock, User, DatabaseSearch } from 'lucide-react-native';

import HomeScreen from '../screens/dash/home';
import Saved from '../screens/dash/saved';
import History from '../screens/dash/history';
import Profile from '../screens/dash/profile';
import { BottomTabParamList } from './types';
import { scale } from 'react-native-size-matters';
import { COLORS } from '../constants/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          height: scale(55),
        },
        tabBarIcon: ({ focused, color, size }) => {
          let IconComponent;

          if (route.name === 'Home') {
            IconComponent = Home;
          } else if (route.name === 'Saved') {
            IconComponent = Bookmark;
          } else if (route.name === 'History') {
            IconComponent = Clock;
          } else if (route.name === 'Profile') {
            IconComponent = User;
          }

          if (!IconComponent) return null;

          return (
            <View style={[focused ? styles.activeIconContainer : styles.inactiveIconContainer, { marginTop: scale(20) }]}>
              <IconComponent
                size={focused ? scale(20) : scale(20)}
                color={focused ? COLORS.WHITE : COLORS.TAB_GRAY}
                strokeWidth={focused ? 2.5 : 2}
              />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Saved" component={Saved} />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.WHITE,
    position: 'absolute',
    bottom: scale(25),
    marginHorizontal: scale(20),
    elevation: 0,
    borderRadius: scale(50),
    height: scale(55),
    borderTopWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 0,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.BLACK,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: scale(10),
      },
      android: {
        elevation: 5,
      },
    }),
  },
  activeIconContainer: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: COLORS.BLACK,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inactiveIconContainer: {
    width: scale(40),
    height: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TabNavigator;