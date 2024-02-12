import React, { useState } from 'react';
import { Modal, ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import Colors from '../../assets/Shared/Colors';
import Toast from 'react-native-root-toast';

const ShareMood = ({ hospitalList, visible, onClose, onSelectHospital }) => {
  const showToastMessage = message => {
    Toast.show(message, {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  };

  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ScrollView style={{ backgroundColor: 'white', borderRadius: 10, padding: 20, width: '80%' }}>
          {hospitalList.map(hospital => (
            <TouchableOpacity key={hospital.id} onPress={() => onSelectHospital(hospital)}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                <Image
                  source={{ uri: hospital.attributes.image.data.attributes.url }}
                  style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
                />
                <View>
                  <Text style={{ fontSize: 18, fontFamily: 'appfont-semi' }}>{hospital.attributes.Name}</Text>
                  <Text style={{ fontSize: 14, color: Colors.GRAY }}>{hospital.attributes.Expertise}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
          {/* Close button for the modal */}
          <TouchableOpacity onPress={onClose} style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 18, color: Colors.PRIMARY }}>Close</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default ShareMood;
