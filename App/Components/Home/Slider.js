import { View, Text, Dimensions, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../../Services/GlobalApi'

export default function Slider() {
  const [sliderList, setSliderList]=useState();
  // const sliderList=[
  //   {
  //     id:1,
  //     name:'Slider 1',
  //     imageUrl: "https://www.freepik.com/free-photo/mental-health-care-sketch-diagram_16461841.htm#query=mental&position=8&from_view=search&track=sph?log-in=google"
  //   },
  //   {
  //     id:2,
  //     name:'Slider 2',
  //     imageUrl: "https://www.freepik.com/free-vector/mental-health-awareness-concept_7967271.htm#query=mental&position=3&from_view=search&track=sph"
  //   },
  // ]

useEffect(()=>{
  getSlider();
},[])

const getSlider=()=>{
  GlobalApi.getSlider().then(resp=>{
    setSliderList(resp.data.data)
  })
}

  return (
    <View style={{marginTop:10}}>
      <FlatList
      data={sliderList}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({item})=>(
        <Image source={{uri:item.attributes.Image.data.attributes.url}}
        style={{width:Dimensions.get('screen').width*0.9, 
        height:Dimensions.get('window').height*0.27,
      borderRadius:10,
    margin:2}}
        />
      )
    }
      />
    </View>
  )
}