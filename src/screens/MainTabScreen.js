import React from 'react';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {DrawerActions} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './HomeScreen';
import StatScreen from './StatScreen';
import CommunityScreen from './CommunityScreen';
import DiaryScreen from './DiaryScreen';
import StoreScreen from './StoreScreen';

const HomeStack = createStackNavigator();
const StatStack = createStackNavigator();
const CommunityStack = createStackNavigator();
const DiaryStack = createStackNavigator();
const StoreStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
  <Tab.Navigator initialRouteName="Home" activeColor="#fff">
    <Tab.Screen
      name="Diary"
      component={DiaryStackScreen}
      options={{
        tabBarLabel: 'Diary',
        tabBarColor: '#694fad',
        tabBarIcon: ({color}) => (
          <Icon name="ios-book" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Stat"
      component={StatStackScreen}
      options={{
        tabBarLabel: 'Statistics',
        tabBarColor: '#1f65ff',
        tabBarIcon: ({color}) => (
          <Icon name="ios-stats-chart" color={color} size={26} />
        ),
      }}
    />

    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarColor: '#009387',
        tabBarIcon: ({color}) => (
          <Icon name="ios-home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Community"
      component={CommunityStackScreen}
      options={{
        tabBarLabel: 'Community',
        tabBarColor: '#d02860',
        tabBarIcon: ({color}) => (
          <Icon name="ios-globe" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Store"
      component={StoreStackScreen}
      options={{
        tabBarLabel: 'Store',
        tabBarColor: 'green',
        tabBarIcon: ({color}) => (
          <Icon name="ios-cart" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#009387',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: '무디버디',
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#009387"
            onPress={() => DrawerActions.openDrawer()}
          />
        ),
      }}
    />
  </HomeStack.Navigator>
);

const StatStackScreen = ({navigation}) => (
  <StatStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#1f65ff',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <StatStack.Screen
      name="Stat"
      component={StatScreen}
      options={{
        title: 'Statistics',
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#1f65ff"
            onPress={() => DrawerActions.openDrawer()}
          />
        ),
      }}
    />
  </StatStack.Navigator>
);

const DiaryStackScreen = ({navigation}) => (
  <DiaryStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#694fad',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <DiaryStack.Screen
      name="Diary"
      component={DiaryScreen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#694fad"
            onPress={() => DrawerActions.openDrawer()}
          />
        ),
      }}
    />
  </DiaryStack.Navigator>
);

const CommunityStackScreen = ({navigation}) => (
  <CommunityStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#d02860',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <CommunityStack.Screen
      name="Community"
      component={CommunityScreen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#d02860"
            onPress={() => DrawerActions.openDrawer()}
          />
        ),
      }}
    />
  </CommunityStack.Navigator>
);

const StoreStackScreen = ({navigation}) => (
  <StoreStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: 'green',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <StoreStack.Screen
      name="Store"
      component={StoreScreen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="green"
            onPress={() => DrawerActions.openDrawer()}
          />
        ),
      }}
    />
  </StoreStack.Navigator>
);
