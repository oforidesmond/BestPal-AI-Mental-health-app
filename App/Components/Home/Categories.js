import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import GlobalApi from "../../Services/GlobalApi";
import Colors from "../../../assets/Shared/Colors";
import SubHeading from "./SubHeading";

export default function Categories() {
  const navigation = useNavigation();
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    // Fetch categories on component mount
    getCategories();
  }, []);

  const getCategories = () => {
    GlobalApi.getCategories().then((resp) => {
      // Set fetched categories to state
      setCategoryList(resp.data.data);
    });
  };

  // Display nothing if categoryList is empty
  if (!categoryList || categoryList.length === 0) {
    return null;
  }

  return (
    <View style={{ marginTop: 10 }}>
      {/* Subheading for category section */}
      <SubHeading subHeadingTitle={"Specialty Sessions For You"} />

      {/* FlatList to render categories */}
      <FlatList
        data={categoryList.slice(0, 4)} // Display only the first 4 categories
        numColumns={4}
        columnWrapperStyle={{
          flex: 1,
          justifyContent: "space-between",
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("premium-mentor-list-screen", {
                categoryName: item.attributes.Name,
              })
            }
            style={{ alignItems: "center", marginBottom: 10 }}
          >
            {/* Category item container */}
            <View
              style={{
                backgroundColor: Colors.SECONDARY,
                padding: 15,
                borderRadius: 10, // Changed border radius
                alignItems: "center",
              }}
            >
              {/* Category icon */}
              <Image
                source={{ uri: item.attributes.Icon.data.attributes.url }}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </View>
            {/* Category name */}
            <Text style={{ marginTop: 5 }}>{item.attributes.Name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()} // Unique key for each item
      />
    </View>
  );
}
