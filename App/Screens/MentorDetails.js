import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import PageHeader from "../Components/Shared/PageHeader";
import Colors from "../../assets/Shared/Colors";
import MentorInfo from "../Components/MentorDetail/MentorInfo";

export default function MentorDetails() {
  const [mentor, setMentor] = useState();
  const param = useRoute().params;
  const navigation=useNavigation();

  useEffect(() => {
    setMentor(param.mentor);
  }, []);
  return mentor&&(
    <View style={{flex:1, backgroundColor:Colors.white}}>
      <ScrollView>
      <View style={{position:'absolute',zIndex:10, margin:15}}>
      <PageHeader title={"Details"} />
      </View>
      <View>
        <Image
          source={{ uri:mentor.attributes.image.data.attributes.url }}
          style={{
            width: "100%",
            height: 300,
          }}
        />
        <View style={{marginTop:-20, backgroundColor:Colors.white,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        padding:20}}>
          <MentorInfo mentor={mentor}/>
        </View>
      </View>
      </ScrollView>
      <TouchableOpacity onPress={()=>navigation.navigate('book-appointment',{
        mentor:mentor
      })} style={{
        padding:13,
        backgroundColor:Colors.PRIMARY,
        margin:10,
        borderRadius:99,
        left:0,
        right:0,
        marginBottom:10,
        zIndex:20
      }}>
        <Text style={{color:Colors.white,
        textAlign:'center',
        fontFamily:'appfont-semi',
        fontSize:17
        }}>Book Mentor</Text>

      </TouchableOpacity>
    </View>
  );
}
