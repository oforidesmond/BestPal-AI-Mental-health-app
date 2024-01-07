import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import AppointmentHospitalInfo from '../Components/BookAppointment/AppointmentHospitalInfo';
import ActionButton from '../Components/MentorDetail/ActionButton';
import Colors from '../../assets/Shared/Colors';
import BookingSection from '../Components/BookAppointment/BookingSection';
import HorizontalLine from '../Components/Shared/HorizontalLine';

export default function BookAppointment() {
  const param=useRoute().params;
  return (
    <ScrollView style={{padding:20}}>
<AppointmentHospitalInfo hospital={param.mentor}/>  
<ActionButton/>
<HorizontalLine/>

        <BookingSection hospital={param.mentor}/>
 </ScrollView>
  )
}