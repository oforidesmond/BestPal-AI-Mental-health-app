import { Button, ScrollView, Text, View } from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import Header from "../Components/Home/Header";
import SearchBar from "../Components/Home/SearchBar";
import Slider from "../Components/Home/Slider";
import Categories from "../Components/Home/Categories";
// import PremiumMentors from "../Components/Home/PremiumMentors";
import Exersizes from "../Components/Home/Exersizes";
import Mentors from "../Components/Home/Mentors";

export default function Home() {
  const { isLoaded, signOut } = useAuth();
  return (
    <ScrollView style={{ padding: 20, marginTop: 20 }}>
      <Header />

      <SearchBar setSearchText={(value) => console.log(value)} />

      <Slider />

      <Categories />

      <Mentors/>

      <Exersizes/>



      {/* <PremiumMentors /> */}
      {/* <Button title='SignOut'
        onPress={()=>signOut()}
        ></Button> */}
    </ScrollView>
  );
}
