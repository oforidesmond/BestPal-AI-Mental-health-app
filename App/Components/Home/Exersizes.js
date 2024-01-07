import { View, Text, FlatList,TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import SubHeading from './SubHeading'
import GlobalApi from '../../Services/GlobalApi'
import { useNavigation } from '@react-navigation/native';
import ExersizeItem from './ExersizeItem';


export default function Exersizes() {

  //const [hospitalList, setHospitalList]=useState([]);
  const [exersizeList, setExersizeList]=useState([]);
  const navigation=useNavigation();


  useEffect(()=>{
    getExersizes()

  },[])

  const getExersizes=()=>{
    GlobalApi.getExersizes().then(resp=>{
      setExersizeList(resp.data.data)
    })
  }
  return exersizeList&&(
    <View style={{marginTop:30}}>
      <SubHeading subHeadingTitle={'Wellness Exercises For You'}/>
      <FlatList
      data={exersizeList}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({item,index})=>(
        <TouchableOpacity onPress={()=>navigation.navigate('exersize-details',{
          exersize:item
        })}>
        <ExersizeItem exersize={item}/>

        </TouchableOpacity>
      )}
      />
    </View>
  )
}