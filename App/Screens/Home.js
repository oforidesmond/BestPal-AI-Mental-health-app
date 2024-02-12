import React, { useEffect, useState } from "react";

import { Button, ScrollView, Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import Header from "../Components/Home/Header";
import SearchBar from "../Components/Home/SearchBar";
import Slider from "../Components/Home/Slider";
import Categories from "../Components/Home/Categories";
// import PremiumMentors from "../Components/Home/PremiumMentors";
import Exersizes from "../Components/Home/Exersizes";
import Mentors from "../Components/Home/Mentors";

import Modal from 'react-native-modal';
import Mood from "../../assets/images/mood.png"
import Colors from "@/assets/Shared/Colors";

export default function Home({ navigation }) {
  const { isLoaded, signOut } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    // Show modal after a few seconds
    const modalTimeout = setTimeout(() => {
      setIsModalVisible(true);
    }, 5000);

    // Clean up timeout to avoid memory leaks
    return () => clearTimeout(modalTimeout);
  }, []);

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <ScrollView style={{ padding: 20, marginTop: 20 }}>
      <Header />
      <SearchBar setSearchText={(value) => console.log(value)} />
      <Slider />
      <Categories />
      <Mentors/>
      <Exersizes/>

 {/* Modal */}
 <Modal isVisible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer} >
        <View style={styles.modalContent}>

        <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>

          {/* Mood image */}
          <Image source={Mood} style={styles.moodImage} />

          {/* Text */}
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              The simplest way to record a day
            </Text>
          </View>

          {/* Start Now button */}
          <TouchableOpacity style={styles.startNowButton} onPress={() => { navigation.navigate('mood-tracking'); closeModal(); }}>
            <Text style={styles.startNowButtonText}>Start Now!</Text>
          </TouchableOpacity>
          
          {/* Close button */}
          {/* <Button title="Close" onPress={closeModal} color={Colors.GRAY} /> */}
        </View>
        </View>
      </Modal>


      {/* <PremiumMentors /> */}
      {/* <Button title='SignOut'
        onPress={()=>signOut()}
        ></Button> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  closeButtonText: {
    fontSize: 20,
    color: Colors.PRIMARY,
    fontFamily: 'appfont-bold',
  },
  moodImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  textContainer: {
    //backgroundColor: Colors.light_blue, // Change to your desired color
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    width: '100%',
  },
  text: {
    fontSize: 20,
    fontFamily: 'appfont-bold',
    fontStyle: 'italic',
    textAlign: 'center',
    // color: "white"
  },
  startNowButton: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  startNowButtonText: {
    fontSize: 18,
    fontFamily: 'appfont-bold',
    color: 'white',
  },
});

