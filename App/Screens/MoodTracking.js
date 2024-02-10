import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import SubHeading from "../Components/Home/SubHeading";
import moment from "moment";
import Toast from 'react-native-root-toast';
import Colors from "@/assets/Shared/Colors";

export default function MoodTrackingPage() {
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [selectedMood, setSelectedMood] = useState("Happy"); // Default mood is set to "Happy"
  const [notes, setNotes] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const buttonRef = useRef(null);

  useEffect(() => {
    // You can add any additional initialization logic here
  }, []);

  const getDays = () => {
    // Implement your logic for getting days here if needed
  };

  const getTime = () => {
    // Implement your logic for getting time here if needed
  };

  const trackMood = (mood) => {
    setSelectedMood(mood);
  };

  const trackEntry = () => {
    if (!selectedDate || !selectedTime || !selectedMood) {
      Toast.show("Please select Date, Time, and Mood", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
      return;
    }

    setIsLoading(true);

    // Replace the following data structure with your actual data structure for mood tracking
    const data = {
      date: selectedDate,
      time: selectedTime,
      mood: selectedMood,
      notes: notes,
    };

    // Simulate an API call or store the mood tracking data as needed
    // Your actual logic for saving mood tracking data goes here

    // Reset form and loading state
    setIsLoading(false);
    setSelectedDate(null);
    setSelectedTime(null);
    setSelectedMood("Happy");
    setNotes("");
    buttonRef.current.setNativeProps({ text: "Track Mood" });

    // Show success message
    Toast.show('Mood Tracked Successfully!', {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  };

  return (
    <View>
      <Text style={{ fontSize: 18, color: Colors.GRAY }}>
        Mood Tracking
      </Text>

      {/* Your mood selection UI */}
      <View style={styles.moodSelectionContainer}>
        {/* Add buttons for different moods */}
        <TouchableOpacity
          style={[
            styles.moodButton,
            selectedMood === "Happy" ? { backgroundColor: Colors.PRIMARY } : null,
          ]}
          onPress={() => trackMood("Happy")}
        >
          <Text style={{ color: selectedMood === "Happy" ? Colors.white : Colors.black }}>Happy</Text>
        </TouchableOpacity>
        {/* Add more buttons for other moods as needed */}
      </View>

      <SubHeading subHeadingTitle={"Day"} seeAll={false} />

      {/* Your date selection UI */}
      {/* ... (same as before) */}

      <SubHeading subHeadingTitle={"Time"} seeAll={false} />

      {/* Your time selection UI */}
      {/* ... (same as before) */}

      <SubHeading subHeadingTitle={"Note"} seeAll={false} />

      <TextInput
        numberOfLines={4}
        onChangeText={(value) => setNotes(value)}
        style={styles.notesInput}
        placeholder="Write about your mood or any notes"
      />

      {/* Your track button UI */}
      <TouchableOpacity
        onPress={isLoading ? null : trackEntry}
        style={styles.trackButton}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.white} />
        ) : (
          <Text style={styles.trackButtonText} ref={buttonRef}>
            Track Mood
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
});
