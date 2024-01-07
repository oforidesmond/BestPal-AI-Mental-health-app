import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import PageHeader from "../Components/Shared/PageHeader";
import Colors from "../../assets/Shared/Colors";
import ExersizeVideo from "../Components/Home/ExersizeVideo";
import GlobalApi from "../Services/GlobalApi";

export default function ExersizeDetailsScreen() {
  const [exersize, setExersize] = useState();
  const [exersizeVideo, setExersizeVideo] = useState([]);
  const [exersizeDescription, setExersizeDescription] = useState([]);


  const param = useRoute().params;
  // const navigation = useNavigation();

  useEffect(() => {
    if (param && param.exersize) {
      setExersize(param.exersize);
    }
  }, [param]);
  
  useEffect(() => {
    getExersizeList();
  }, []);

  useEffect(() => {
    getExersizeDescription();
  }, []);


  const getExersizeList=()=>{
    GlobalApi.getExersizeList(param?.exersize.attributes.Name).then(resp=>{
      setExersizeVideo(resp.data.data);
    })
  }
  const getExersizeDescription=()=>{
    GlobalApi.getExersizeDescription(param?.exersize.attributes.Name).then(resp=>{
      setExersizeDescription(resp.data.data);
    })
  }
  const imageUrl = exersize?.attributes?.image?.data?.attributes?.url;
  const description = exersize?.attributes?.exersize_list_screens?.data[0]?.attributes?.Description;
  const howTo = exersizeDescription?.[0]?.attributes?.howTo;
  
  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <ScrollView>
        <View style={{ position: 'absolute', zIndex: 10, margin: 15 }}>
          <PageHeader title={exersize?.attributes?.Name} />
        </View>
        <View>
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              style={{
                width: "100%",
                height: 300,
              }}
            />
          ) : (
            <Text style={{ fontSize: 16, color: Colors.black, textAlign: 'center', marginTop: 20 }}>
              Image not available
            </Text>
          )}
          <View
            style={{
              marginTop: -20,
              backgroundColor: Colors.white,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 20,
            }}
          >
           <View 
           style={{display:'flex', flexDirection:'row', gap:5, alignItems:'center', marginBottom:'1%'}}>
          <Text 
          style={{fontSize:18, fontFamily:'appfont-semi'}}>What is {exersize?.attributes?.Name}?</Text></View>

            {description ? (
              <Text style={{ fontSize: 16, color: Colors.black }}>
                {description}
              </Text>
            ) : (
              <Text style={{ fontSize: 16, color: Colors.black, textAlign: 'center' }}>
                Description not available
              </Text>
            )}
            
          </View>
        </View>
        <View>
          {!exersizeVideo?.length?<ActivityIndicator size={'small'} color={Colors.PRIMARY}/>
          :
        <ExersizeVideo exersizeVideo={exersizeVideo}/> 
         }

        </View>

        <View
            style={{
              marginTop: 10,
              backgroundColor: Colors.white,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 20,
            }}
          >
           <View 
           style={{display:'flex', flexDirection:'row', gap:5, alignItems:'center', marginBottom:'1%'}}>
          <Text 
          style={{fontSize:18, fontFamily:'appfont-semi'}}>Explore Further into {exersize?.attributes?.Name}:</Text></View>

            {howTo ? (
              <Text style={{ fontSize: 16, color: Colors.black }}>
                {howTo}
              </Text>
            ) : (
              <Text style={{ fontSize: 16, color: Colors.black, textAlign: 'center' }}>
                Further details not available
              </Text>
            )}
            
          </View>
      </ScrollView>
    </View>
  );
}
