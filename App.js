// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import CharacterDetailScreen from './src/screens/CharacterDetailScreen';
import TierListScreen from './src/screens/TierListScreen';
import TierDetailScreen from './src/screens/TierDetailScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import AddEditCharacterScreen from './src/screens/AddEditCharacterScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack Navigator untuk Home
function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3498db',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="HomeList"
        component={HomeScreen}
        options={{ title: 'Characters' }}
      />
      <Stack.Screen
        name="CharacterDetail"
        component={CharacterDetailScreen}
        options={{ title: 'Character Detail' }}
      />
      <Stack.Screen
        name="AddEditCharacter"
        component={AddEditCharacterScreen}
        options={{ title: 'Add Character' }}
      />
    </Stack.Navigator>
  );
}

// Stack Navigator untuk Tier List
function TierStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3498db',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="TierListMain"
        component={TierListScreen}
        options={{ title: 'Tier List' }}
      />
      <Stack.Screen
        name="TierDetailScreen"
        component={TierDetailScreen}
        options={{ title: 'Tier Detail' }}
      />
      <Stack.Screen
        name="TierCharacterDetail"
        component={CharacterDetailScreen}
        options={{ title: 'Character Detail' }}
      />
      <Stack.Screen
        name="TierAddEditCharacter"
        component={AddEditCharacterScreen}
        options={{ title: 'Add Character' }}
      />
    </Stack.Navigator>
  );
}

// Bottom Tab Navigator
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'TierList') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3498db',
        tabBarInactiveTintColor: '#95a5a6',
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ title: 'Characters' }}
      />
      <Tab.Screen
        name="TierList"
        component={TierStack}
        options={{ title: 'Tier List' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#3498db',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Tab.Navigator>
  );
}

// Main App Component
export default function App() {
  return (
    <NavigationContainer>
      <MainTabs />
    </NavigationContainer>
  );
}
