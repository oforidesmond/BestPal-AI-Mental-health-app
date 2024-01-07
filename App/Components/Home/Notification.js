import { View, Text, TouchableOpacity, StyleSheet, Modal, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from "@clerk/clerk-expo";
import bell from '../../../assets/images/bell.png';



export default function Notification() {
  const [showModal, setShowModal] = useState(false);
  const [storedNotes, setStoredNotes] = useState('');
  const { isLoaded, isSignedIn, user } = useUser();

  const firstName = user.firstName;


  useEffect(() => {
    // Retrieve notes from local storage based on email address
    AsyncStorage.getItem(user.primaryEmailAddress.emailAddress) // Replace 'userEmail' with your desired key
      .then((value) => {
        console.log(value);
        setStoredNotes(value || ''); // Set stored notes or empty string if not found
      })
      .catch((error) => {
        console.error('Error retrieving data:', error);
      });
  }, []);

  const openModal = async () => {
    try {
      const value = await AsyncStorage.getItem(
        user.primaryEmailAddress.emailAddress
      );
      setStoredNotes(value || '');
      setShowModal(true);
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const emailMatch = user.primaryEmailAddress.emailAddress !== storedNotes;

  return (
    <View style={styles.container}>
       <TouchableOpacity onPress={openModal}>
        {storedNotes ? (
          <View style={styles.notificationContainer}>
            <Ionicons name="notifications-outline" size={28} color="black" />
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>1</Text>
            </View>
          </View>
        ) : (
          <Ionicons name="notifications-outline" size={28} color="black" />
        )}
      </TouchableOpacity>

      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {emailMatch ? (
              <>
               <Text style={styles.sentByText}>Sent by: {firstName}</Text>
              <Text style={styles.modalText}>{storedNotes}</Text>
             
            </>

            ) : (
              <Text style={styles.modalText}>No Notification for You</Text>
            )}
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  notificationBadge: {
    backgroundColor: 'red',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -5,
    right: -8,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  sentByText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666',
    marginTop: 10,
  },
  bellIcon: {
    width: 70,
    height: 60,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    fontSize: 16,
    color: 'blue',
    marginTop: 10,
  },
});
