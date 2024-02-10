import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { Ionicons,FontAwesome,MaterialCommunityIcons,SimpleLineIcons } from '@expo/vector-icons';
import headerLogo from '../../../assets/images/headerLogo.png'
// import Colors from '../../../assets/Shared/Colors';
import { useNavigation } from '@react-navigation/native';
import Notification from "./Notification";


export default function Header() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [modalVisible, setModalVisible] = useState(false);
  const {signOut} = useAuth();

  const navigation=useNavigation();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    
    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#f0f0f0' }}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 7, alignItems: 'center' }}>
          <Image source={{ uri: user.imageUrl }} style={{ width: 45, height: 45, borderRadius: 99 }} />
        </View>
      </TouchableOpacity>

      <Image style={styles.headerImage} source={headerLogo}
      /> 
      <TouchableOpacity>   
<Notification/>
</TouchableOpacity>  
      {/* User Profile Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
          <Image source={{ uri: user.imageUrl }} style={{ width: 60, height: 60, borderRadius: 99 }} />
          <View style={{ display: 'flex', flexDirection: 'row', gap: 7, alignItems: 'center', marginBottom: 20 }}>
              <Text style={{ }}>Hello,👋</Text>
              <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>{user.firstName}</Text>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
                <Ionicons name="home-outline" size={24} color="black" />
                <Text style={styles.buttonText}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>navigation.navigate('')} style={styles.modalButton}>
                <FontAwesome name="user-circle" size={24} color="black" />
                <Text style={styles.buttonText}>Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>navigation.navigate('ChatPi')} style={styles.modalButton}>
              <MaterialCommunityIcons name="robot-happy-outline" size={24} />
                {/* <Ionicons name="heart-outline" size={24} color="black" /> */}
                <Text style={styles.buttonText}>ChatPi</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity onPress={()=>navigation.navigate('Chat')} style={styles.modalButton}>
                <Ionicons name="heart-outline" size={24} color="black" />
                <Text style={styles.buttonText}>Care Topics</Text>
              </TouchableOpacity> */}
              <TouchableOpacity onPress={()=>navigation.navigate('Appointments')}
         style={styles.modalButton}>
                <Ionicons name="calendar-outline" size={24} color="black" />
                <Text style={styles.buttonText}>Appointments</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>navigation.navigate('Explore')} style={styles.modalButton}>
                <MaterialCommunityIcons name="handshake-outline" size={24} color="black" />
                <Text style={styles.buttonText}>Mentors</Text>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={()=>navigation.navigate('mood-tracking')} style={styles.modalButton}>
                <Ionicons name="notifications-outline" size={24} color="black" />
                <Text style={styles.buttonText}>Notification</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>navigation.navigate('')} style={styles.modalButton}>
                <Ionicons name="settings-outline" size={24} color="black" />
                <Text style={styles.buttonText}>Settings</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>navigation.navigate('')} style={styles.modalButton}>
                <SimpleLineIcons name="exclamation" size={24} color="black" />
                <Text style={styles.buttonText}>About us</Text>
              </TouchableOpacity>
              {/* Add more buttons with icons */}
            </View>

            <TouchableOpacity onPress={() => signOut()} style={styles.modalButtonLast}>
              <Ionicons name="log-out-outline" size={24} color="white" />
              <Text style={[styles.buttonText, { color: 'white' }]}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '50%', // Adjust the width to occupy the left half of the screen
    alignItems: 'center',
    // height: '100%', // Adjust the height to cover the entire height of the screen
  },
  modalButtons: {
    marginTop: 20,
    // marginBottom:'70%',
    width: '100%',
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  modalButtonLast: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 18,
  },
  headerImage: {
    backgroundColor: "transparent",
    width: 150, // Set the desired width
    height: 50, // Set the desired height
    resizeMode: 'contain', // Adjust the image's size to fit the container
    borderRadius: 8, }
});
