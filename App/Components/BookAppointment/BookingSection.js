import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import SubHeading from "../Home/SubHeading";
import Colors from "../../../assets/Shared/Colors";
import moment from "moment";
import { FlatList } from "react-native-gesture-handler";
// import PageHeader from "../Shared/PageHeader";
import { useUser } from "@clerk/clerk-expo";
import GlobalApi from "../../Services/GlobalApi";
import Toast from 'react-native-root-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BookingSection({ hospital }) {
  const { isLoaded, isSignedIn, user } = useUser();

  const [next7Days, setNext7Days] = useState([]);
  const [timeList, setTimeList] = useState([]);

  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [notes, setNotes] = useState();
  const [isLoading, setIsLoading] = useState(false);

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

  const bookAppointment = () => {
    if (!selectedDate || !selectedTime) {
      Toast.show("Please select Date and Time", {
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
        hospitals: hospital.id,
        Note: notes,
      },
    };
    //console.log(data);
    AsyncStorage.setItem(user.primaryEmailAddress.emailAddress, notes)
    .then(() => {

    GlobalApi.createAppointment(data)
      .then((resp) => {
        setIsLoading(false);
        setSelectedDate(null);
        setSelectedTime(null);
        setNotes("");
        buttonRef.current.setNativeProps({ text: "Make Appointment" });
        Toast.show('Appointment Booked Successfully!', {
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
        Toast.show("Failed to book appointment...please try again", {
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
    <View>
 <Text
        style={{
          fontSize: 18,
          color: Colors.GRAY,
        }}
      >
        Book Appointment
      </Text>

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
        placeholder="Write a summary of what is bothering you "
      />
      <TouchableOpacity
        onPress={isLoading ? null : bookAppointment}
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
            Make Appointment
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
  },});
