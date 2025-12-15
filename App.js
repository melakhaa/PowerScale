// App.js
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// Import context and screens
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import HomeScreen from './src/screens/HomeScreen';
import CharacterDetailScreen from './src/screens/CharacterDetailScreen';
import TierListScreen from './src/screens/TierListScreen';
import TierDetailScreen from './src/screens/TierDetailScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import AddEditCharacterScreen from './src/screens/AddEditCharacterScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Theme Toggle Button Component
function ThemeToggleButton() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={{ marginRight: 15 }}
    >
      <Ionicons
        name={isDarkMode ? 'sunny' : 'moon'}
        size={24}
        color="#fff"
      />
    </TouchableOpacity>
  );
}

// Stack Navigator untuk Home
function HomeStack() {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: () => <ThemeToggleButton />,
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
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: () => <ThemeToggleButton />,
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
        name="AddEditCharacter"
        component={AddEditCharacterScreen}
        options={{ title: 'Add Character' }}
      />
    </Stack.Navigator>
  );
}

// Bottom Tab Navigator
function MainTabs() {
  const { theme } = useTheme();

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
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textTertiary,
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
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
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => <ThemeToggleButton />,
        }}
      />
    </Tab.Navigator>
  );
}

// Main App Component with Navigation
function AppContent() {
  const { isLoading } = useTheme();

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      <MainTabs />
    </NavigationContainer>
  );
}

// Main App Component
export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
