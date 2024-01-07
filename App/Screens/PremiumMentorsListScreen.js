import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import PageHeader from '../Components/Shared/PageHeader';
import HospitalDoctorTab from '../Components/MentorsScreen/HospitalDoctorTab';
import HospitalListBig from '../Components/MentorsScreen/HospitalListBig';
import GlobalApi from '../Services/GlobalApi';
import Colors from '../../assets/Shared/Colors';

export default function PremiumMentorsListScreen() {

  const [mentorList, setMentorList]=useState([]);
  const param=useRoute().params;
  const [activeTab, setActiveTab]=useState('Hospital');

  useEffect(()=>{
    getMentorsByCategory();

  },[])

  const getMentorsByCategory=()=>{
    GlobalApi.getMentorsByCategory(param?.categoryName).then(resp=>{
      setMentorList(resp.data.data);
    })
  }

  return (
    <View style={{padding:20}}>
      <PageHeader title={param?.categoryName}/> 

      <HospitalDoctorTab activeTab={(value)=>setActiveTab(value)}/>

      {!mentorList?.length?<ActivityIndicator size={'large'} color={Colors.PRIMARY}
      style={{marginTop:'50%'}}
      />:
      activeTab=='Hospital'?
      <HospitalListBig hospitalList={mentorList}/>
    : <Text>Premium Mentors List</Text>
    }


      

    </View>
  )
}