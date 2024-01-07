import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../Screens/Home'
import Chat from '../Screens/Chat'
import Profile from '../Screens/Profile'
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Homenavigation from './Homenavigation'
import Appointments from '../Screens/Appointments'
import Explore from '../Screens/Explore'
import CommunityChat from '../Screens/CommunityChat'


const Tab = createBottomTabNavigator();
export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name='Home' component={Homenavigation}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="home" size={size} color={color} />
          }
        }}
      />

<Tab.Screen name='Explore' component={Explore}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="search" size={size} color={color} />
          }
        }}
      />

      <Tab.Screen name='ChatPi' component={CommunityChat}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <MaterialCommunityIcons name="robot-happy-outline" style={{marginBottom:3}} size={size} color={color} />
          }
        }}
      />

      {/* <Tab.Screen name='Chat' component={Chat}
        options={{
          tabBarIcon:  ({ color, size }) => {
            return <MaterialIcons name="chat" size={size} color={color}/>
          }
        }}
      /> */}
        <Tab.Screen name='Appointments' component={Appointments}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="calendar-outline" size={size} color={color} />
          }
        }}
      />
      {/* <Tab.Screen name='Profile' component={Profile}
        options={{ 
          tabBarIcon: ({ color, size }) => {
            return <FontAwesome name="user-circle" size={size} color={color} />
          }
        }}
      /> */}
    </Tab.Navigator>
  )
}
