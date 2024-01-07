import { View, Text, ActivityIndicator } from 'react-native'
import React, { useState,useEffect } from 'react'
import HospitalDoctorTab from '../Components/MentorsScreen/HospitalDoctorTab'
import HospitalListBig from '../Components/MentorsScreen/HospitalListBig';
import Colors from '../../assets/Shared/Colors';
import GlobalApi from '../Services/GlobalApi';

export default function Explore() {

  const [hospitalList, setHospitalList]=useState([]);
  const [activeTab, setActiveTab]=useState('Hospital');


  useEffect(()=>{
    getAllHospital();

  },[])

  const getAllHospital=()=>{
    GlobalApi.getAllHospital().then(resp=>{
      setHospitalList(resp.data.data);
    })
  }

  return (
    <View style={{padding:20}}>
      <Text style={{
        fontSize:26,
        fontFamily:'appfont-semi'
      }}>Explore</Text>

      <HospitalDoctorTab activeTab={(value)=>setActiveTab(value)}/>

      {!hospitalList?.length?<ActivityIndicator size={'large'} color={Colors.PRIMARY}
      style={{marginTop:'50%'}}
      />:
      activeTab=='Hospital'?
      <HospitalListBig hospitalList={hospitalList}/>
    : <Text>Doctors List</Text>
    }

    </View>
  )
}