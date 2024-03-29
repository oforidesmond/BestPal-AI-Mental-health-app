import { View, Text,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../../assets/Shared/Colors'
import HorizontalLine from '../Shared/HorizontalLine'
import {Ionicons, MaterialIcons} from '@expo/vector-icons';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function AppointmentCardItem({appointment}) {

  const clearLocalStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('Local storage cleared successfully.');
      // You can perform any additional actions after clearing the storage if needed
    } catch (error) {
      console.error('Error clearing local storage:', error);
      // Handle the error if AsyncStorage.clear() fails
    }
  };
  return (
    <View style={{
      padding:10,
      borderWidth:1,
      borderColor:Colors.LIGHT_GRAY,
      borderRadius:10,
      backgroundColor:Colors.white,
      marginTop:15
    }}>
      <Text style={{
        fontSize:16,
        marginTop:10,
        fontFamily:'appfont-semi'
      }}>{moment(appointment.attributes.Date).format('MMM Do,  YYYY')} - {appointment.attributes.Time}</Text>
      <HorizontalLine/>
      <View style={{display:'flex', flexDirection:'row', gap:10, alignItems:'center'}} >
      <TouchableOpacity onPress={clearLocalStorage}>
      <Image
        source={{
          uri:
            'https://res.cloudinary.com/doltiaxth/image/upload/v1701525405/portrait_handsome_bearded_male_13f4eac46a.jpg',
        }}
        style={{ height: 100, borderRadius: 10, width: 90 }}
      />
    </TouchableOpacity>
      <View>
        <Text style={{
          fontSize:16,
          fontFamily:'appfont-semi'
        }}>{appointment.attributes.hospitals.data[0].attributes.Name}</Text>
         <View style={{display:'flex', flexDirection:'row', gap:5, alignItems:'center',marginTop:5}}>
          <MaterialIcons name="work-outline" size={20} color={Colors.PRIMARY}/> 
          <Text style={{fontFamily:'appfont', color:Colors.GRAY}}>{appointment.attributes.hospitals.data[0].attributes.Address}</Text>
        </View>
        <View style={{display:'flex', flexDirection:'row', gap:5, alignItems:'center', marginTop:5}}>
          <Ionicons name="document-text" size={20} color={Colors.PRIMARY}/> 
          <Text style={{fontFamily:'appfont', color:Colors.GRAY}}>Booking Id : #{appointment.id}</Text>
        </View>
      </View>
      </View>
    </View>
  )
}