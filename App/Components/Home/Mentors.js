import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import SubHeading from './SubHeading'
import GlobalApi from '../../Services/GlobalApi'
import MentorItem from './MentorItem';
import { useNavigation } from '@react-navigation/native';

export default function Mentors() {

  const [mentorList, setMentorList]=useState([]);

  const navigation=useNavigation();

  useEffect(()=>{
    getMentors()

  },[])

  const getMentors=()=>{
    GlobalApi.getMentors().then(resp=>{
      setMentorList(resp.data.data)
    })
  }
  return mentorList&&(
    <View style={{marginTop:10}}>
      <SubHeading subHeadingTitle={'Recommended Mentors For You'}/>
      <FlatList
      data={mentorList}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({item,index})=>(
        <TouchableOpacity onPress={()=>navigation.navigate('mentor-detail',{
          mentor:item
        })}>
        <MentorItem mentor={item}/>
        </TouchableOpacity>
      )}
      />
    </View>
  )
}