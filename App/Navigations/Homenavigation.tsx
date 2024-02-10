import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../Screens/Home';
import BookAppointment from '../Screens/BookAppointment';
import ExersizeDetailsScreen from '../Screens/ExersizeDetailsScreen';
import MentorDetails from '../Screens/MentorDetails';
import PremiumMentorsListScreen from '../Screens/PremiumMentorsListScreen';
import MoodTracking from '../Screens/MoodTracking';



const Stack=createStackNavigator();

export default function Homenavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name='Home' component={Home}/>
      <Stack.Screen name='premium-mentor-list-screen' component={PremiumMentorsListScreen}/>

      <Stack.Screen name='mentor-detail' component={MentorDetails}/>

      <Stack.Screen name='book-appointment' component={BookAppointment}/>

      <Stack.Screen name='exersize-details' component={ExersizeDetailsScreen}/>

      <Stack.Screen name='mood-tracking' component={MoodTracking}/>

    </Stack.Navigator>

  )
}