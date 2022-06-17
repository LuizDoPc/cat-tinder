import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {BottomTab} from './src/components/BottomTab';
import {ChatScreen} from './src/screens/ChatScreen';
import {HomeScreen} from './src/screens/HomeScreen';
import {ProfileScreen} from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={props => <BottomTab {...props} />}
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen name="Home" component={gestureHandlerRootHOC(HomeScreen)} />
        <Tab.Screen name="Chat" component={gestureHandlerRootHOC(ChatScreen)} />
        <Tab.Screen
          name="Profile"
          component={gestureHandlerRootHOC(ProfileScreen)}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
