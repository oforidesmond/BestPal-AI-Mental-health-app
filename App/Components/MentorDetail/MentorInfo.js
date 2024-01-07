import { View, Text, FlatList } from "react-native";
import React from "react";
import Colors from "../../../assets/Shared/Colors";
import { Ionicons,MaterialIcons } from "@expo/vector-icons";
import ActionButton from "./ActionButton";
import SubHeading from "../Home/SubHeading";

export default function MentorInfo({ mentor }) {
  return mentor && (
    
      <View>
        <Text style={{ fontSize: 23, fontFamily: "appfont-semi" }}>
          {mentor.attributes.Name}
        </Text>

        <FlatList
          data={mentor.attributes.categories.data}
          horizontal={true}
          renderItem={({ item }) => (
            <Text
              style={{
                marginRight: 10,
                color: Colors.GRAY,
              }}
            >
              {item.attributes.Name},
            </Text>
          )}
        />

        <View
          style={{
            borderBottomWidth: 1,
            borderColor: Colors.LIGHT_GRAY,
            margin: 5,
            marginBottom: 10,
          }}
        ></View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
          }}
        >
          <MaterialIcons name="work-outline" size={20} color={Colors.PRIMARY} />
          <Text
            style={{
              fontSize: 18,
              fontFamily: "appfont",
              color: Colors.GRAY,
            }}
          >
            {mentor.attributes.Address}
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
            marginTop:6
          }}
        >
          <Ionicons name="time" size={20} color={Colors.PRIMARY} />
          <Text
            style={{
              fontSize: 18,
              fontFamily: "appfont",
              color: Colors.GRAY,
            }}
          >
            Mon Sun | 11AM - 8PM
          </Text>
        </View>
        <ActionButton/>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: Colors.LIGHT_GRAY,
            margin: 5,
            marginBottom: 15,
            marginTop: 10,
          }}
        ></View>
        <SubHeading subHeadingTitle={'About'}/>
        <Text>{mentor.attributes.Description}</Text>
      </View>
  
  );
}
