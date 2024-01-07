import { View, Text, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import SubHeading from "./SubHeading";
import GlobalApi from "../../Services/GlobalApi";
import MentorItem from "./MentorItem";

export default function PremiumMentors() {
  const [mentorList, setMentorList] = useState([]);
  useEffect(() => {
    getPremiumMentors();
  }, []);
  const getPremiumMentors = () => {
    GlobalApi.getPremiumMentors().then(resp => {
      setMentorList(resp.data.data);
    });
  };
  return (
    mentorList && (
      <View style={{ marginTop: 10 }}>
        <SubHeading subHeadingTitle={"Recommended Mentors For You"} />
        <FlatList
          data={mentorList}
          renderItem={({ item, index }) => (<MentorItem mentor={item}/>)}
        />
      </View>
    )
  );
}
