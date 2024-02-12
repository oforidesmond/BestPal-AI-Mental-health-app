import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Image,
} from "react-native";
import moment from "moment";
import { FlatList } from "react-native-gesture-handler";
// import PageHeader from "../Shared/PageHeader";
import { useUser } from "@clerk/clerk-expo";
import Toast from 'react-native-root-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SubHeading from "../Components/Home/SubHeading";
import Colors from "@/assets/Shared/Colors";
import GlobalApi from "../Services/GlobalApi";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import HorizontalLine from "../Components/Shared/HorizontalLine";
import { MaterialIcons } from '@expo/vector-icons';
import PageHeader from "../Components/Shared/PageHeader";


export default function MoodTracking() {
  const { isLoaded, isSignedIn, user } = useUser();

  const [next7Days, setNext7Days] = useState([]);
  const [timeList, setTimeList] = useState([]);

  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [notes, setNotes] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [selectedMood, setSelectedMood] = useState("happy");

  const buttonRef = useRef(null);

  useEffect(() => {
    getDays();
    getTime();
  }, []);

  const getDays = () => {
    const today = moment();
    const nextSevenDays = [];
    for (let i = 0; i < 7; i++) {
      const date = moment().add(i, "days");
      nextSevenDays.push({
        date: date,
        day: date.format("ddd"),
        formatedDate: date.format("Do MMM"),
      });
    }
    setNext7Days(nextSevenDays);
  };

  const getTime = () => {
    const timeList = [];
    for (let i = 8; i <= 12; i++) {
      timeList.push({
        time: i + ":00 AM",
      });
      timeList.push({
        time: i + ":30 AM",
      });
    }
    for (let i = 1; i <= 6; i++) {
      timeList.push({
        time: i + ":00 PM",
      });
      timeList.push({
        time: i + ":30 PM",
      });
    }
    setTimeList(timeList);
  };

  const trackMood = (mood) => {
    setSelectedMood(mood);
  };

  const trackEntry = () => {
    if (!selectedDate || !selectedTime || !selectedMood ) {
      Toast.show("Please select Date, Time, and Mood", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
      // Alert.alert("Error", "Please select Date and Time");
      return;
    }

    setIsLoading(true);

    const data = {
      data: {
        UserName: user.fullName,
        Date: selectedDate,
        Time: selectedTime,
        Email: user.primaryEmailAddress.emailAddress,
        mood: selectedMood,
        Note: notes,
      },
    };
    //console.log(data);
    AsyncStorage.setItem(user.primaryEmailAddress.emailAddress, notes)
    .then(() => {

    GlobalApi.trackMood(data)
      .then((resp) => {
        setIsLoading(false);
        setSelectedDate(null);
        setSelectedTime(null);
        setSelectedMood("happy");
        setNotes("");
        buttonRef.current.setNativeProps({ text: "Save Mood" });
        Toast.show('Saved Successfully!', {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });        
        // console.log(resp);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
        Toast.show("Failed to save mood...please try again", {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
      });
      
      });
  };

  return (
    
    <View style={{padding: 20}}>
 <PageHeader title={'Mood Tracking'} />
  <View style={{ marginTop: 10, display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 15 }}>
    {/* Modified part to display user's image */}
   <View style={{padding: 10}}><Image source={{ uri: user.imageUrl }} style={{ width: 100, height: 100, borderRadius: 99  }} /></View> 
    <View>
      <Text style={{ fontSize: 20, fontFamily: 'appfont-semi', marginBottom: 8 }}>Heya {user.firstName} 👋</Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 5,
          alignItems: 'center',
        }}
      >
        
      </View>
    </View>
  </View>
  <HorizontalLine />

      <Text
        style={{
          fontSize: 18,
          color: Colors.GRAY,
        }}
      >
        How was your day today?
      </Text>

        {/* mood selection UI */}
        <View style={styles.moodSelectionContainer}>
        <TouchableOpacity
          style={[
            styles.moodButton,
            selectedMood === "happy" ? { backgroundColor: Colors.PRIMARY } : null,
          ]}
          onPress={() => trackMood("happy")}
        >
          <Entypo name="emoji-happy" size={24} color={selectedMood === "happy" ? Colors.white : Colors.black} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.moodButton,
            selectedMood === "sad" ? { backgroundColor: Colors.PRIMARY } : null,
          ]}
          onPress={() => trackMood("sad")}
        >
          <Entypo name="emoji-sad" size={24} color={selectedMood === "sad" ? Colors.white : Colors.black} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.moodButton,
            selectedMood === "angry" ? { backgroundColor: Colors.PRIMARY } : null,
          ]}
          onPress={() => trackMood("angry")}
        >
          <FontAwesome5 name="angry" size={24} color={selectedMood === "angry" ? Colors.white : Colors.black} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.moodButton,
            selectedMood === "neutral" ? { backgroundColor: Colors.PRIMARY } : null,
          ]}
          onPress={() => trackMood("neutral")}
        >
          <Entypo name="emoji-neutral" size={24} color={selectedMood === "neutral" ? Colors.white : Colors.black} />
        </TouchableOpacity>
      </View>


      <SubHeading subHeadingTitle={"Day"} seeAll={false} />

      <FlatList
        data={next7Days}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.dayButton,
              selectedDate == item.date
                ? { backgroundColor: Colors.PRIMARY }
                : null,
            ]}
            onPress={() => setSelectedDate(item.date)}
          >
            <Text
              style={[
                {
                  fontFamily: "appfont",
                },
                selectedDate == item.date ? { color: Colors.white } : null,
              ]}
            >
              {item.day}
            </Text>
            <Text
              style={[
                {
                  fontFamily: "appfont-semi",
                  fontSize: 16,
                },
                selectedDate == item.date ? { color: Colors.white } : null,
              ]}
            >
              {item.formatedDate}
            </Text>
          </TouchableOpacity>
        )}
      />
      <SubHeading subHeadingTitle={"Time"} seeAll={false} />

      <FlatList
        data={timeList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.dayButton,{
paddingVertical:16,
              },
              selectedTime == item.time
                ? { backgroundColor: Colors.PRIMARY }
                : null,
            ]}
            onPress={() => setSelectedTime(item.time)}
          >
            
            <Text
              style={[
                {
                  fontFamily: "appfont-semi",
                  fontSize: 16,
                },
                selectedTime == item.time ? { color: Colors.white } : null,
              ]}
            >
              {item.time}
            </Text>
          </TouchableOpacity>
        )}
      />

      <SubHeading subHeadingTitle={"Note"} seeAll={false} />

      <TextInput
        numberOfLines={4}
        onChangeText={(value)=>setNotes(value)}
        style={{
          backgroundColor: Colors.LIGHT_GRAY,
          padding: 10,
          borderRadius: 10,
          borderColor: Colors.SECONDARY,
          borderWidth: 1,
          textAlignVertical: "top",
        }}
        placeholder="Write about your mood or any notes "
      />
      <TouchableOpacity
        onPress={isLoading ? null : trackEntry}
        style={{
          padding: 13,
          backgroundColor: Colors.PRIMARY,
          margin: 10,
          borderRadius: 99,
          left: 0,
          right: 0,
          marginBottom: 10,
          zIndex: 20,
          position: "relative",
        }}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.white} />
        ) : (
          <Text
            style={{
              color: Colors.white,
              textAlign: "center",
              fontFamily: "appfont-semi",
              fontSize: 17,
            }}
            ref={buttonRef}
          >
            Save Mood
          </Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: 13,
          backgroundColor: Colors.Green,
          margin: 10,
          borderRadius: 99,
          left: 0,
          right: 0,
          marginBottom: 10,
          zIndex: 20,
          position: "relative",
        }}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.white} />
        ) : (
          <Text
            style={{
              color: Colors.white,
              textAlign: "center",
              fontFamily: "appfont-semi",
              fontSize: 17,
            }}
            ref={buttonRef}
          >
            Share mood history
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  dayButton: {
    borderWidth: 1,
    borderRadius: 99,
    padding: 5,
    paddingHorizontal: 20,
    alignItems: "center",
    marginRight: 10,
    marginBottom: 40,
    borderColor: Colors.GRAY,
  },
  moodSelectionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  moodButton: {
    borderWidth: 1,
    borderRadius: 99,
    padding: 10,
    alignItems: "center",
  },
  notesInput: {
    backgroundColor: Colors.LIGHT_GRAY,
    padding: 10,
    borderRadius: 10,
    borderColor: Colors.SECONDARY,
    borderWidth: 1,
    textAlignVertical: "top",
    marginVertical: 10,
  },
  trackButton: {
    padding: 13,
    backgroundColor: Colors.PRIMARY,
    margin: 10,
    borderRadius: 99,
  },
  trackButtonText: {
    color: Colors.white,
    textAlign: "center",
    fontFamily: "appfont-semi",
    fontSize: 17,
  },});
