import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../assets/Shared/Colors';

export default function ActionButton() {
  const [modalVisible, setModalVisible] = useState(false);
  const [chatModalVisible, setChatModalVisible] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [selectedAction, setSelectedAction] = useState(null);

  const actionButtonList = [
    {
      id: 1,
      name: 'Website',
      icon: 'earth',
      modalContent: 'https//www.johndoe.com/',
    },
    {
      id: 2,
      name: 'Email',
      icon: 'chatbubble-ellipses',
      modalContent: 'johndoe@yahoo.com',
    },
    {
      id: 3,
      name: 'Phone',
      icon: 'md-call',
      modalContent: '0509902262',
    },
    {
      id: 4,
      name: 'Chat',
      icon: 'md-chatbubbles-outline',
      modalContent: (
        <View style={{ flex: 1 }}>
          <ScrollView>
            {chatMessages.map((msg, index) => (
              <Text key={index}>{msg}</Text>
            ))}
          </ScrollView>
          <TextInput
            placeholder="Type your message..."
            value={messageInput}
            onChangeText={(text) => setMessageInput(text)}
            onSubmitEditing={sendMessage}
          />
        </View>
      ),
    },
  ];

  const sendMessage = () => {
    if (messageInput.trim() !== '') {
      setChatMessages([...chatMessages, messageInput]);
      setMessageInput('');
    }
  };

  const openModal = (item) => {
    setSelectedAction(item);
    setModalVisible(true);
    if (item.name === 'Chat') {
      setChatModalVisible(true);
    } else {
      setChatModalVisible(false);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setChatModalVisible(false);
    setSelectedAction(null);
  };

  return (
    <View style={{ marginTop: 15 }}>
      <FlatList
        data={actionButtonList}
        columnWrapperStyle={{
          flex: 1,
          justifyContent: 'space-between',
        }}
        numColumns={5}
        renderItem={({ item }) => (
          <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => openModal(item)}>
            <View
              style={{
                backgroundColor: Colors.SECONDARY,
                padding: 13,
                borderRadius: 99,
                alignItems: 'center',
                width: 55,
              }}
            >
              <Ionicons name={item.icon} size={23} color={Colors.PRIMARY} />
            </View>
            <Text
              style={{
                fontFamily: 'appfont-semi',
                marginTop: 5,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />

<Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={closeModal}>
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <TouchableOpacity style={{ flex: 1 }} onPress={closeModal} />
          <View style={{ backgroundColor: 'white', padding: 20 }}>
            {selectedAction && (
              <View>
                {selectedAction.name === 'Chat' ? (
                  <View style={{ borderRadius:50}}>
                    <ScrollView>
                      {chatMessages.map((msg, index) => (
                        <Text key={index}>{msg}</Text>
                      ))}
                    </ScrollView>
                    <View style={{ flexDirection: 'row', marginTop: 10}}>
                      <TextInput
                      numberOfLines={2}
                        style={{ flex: 1, borderWidth: 1, borderRadius:7, borderColor: 'gray', marginRight: 10, padding: 5 }}
                        placeholder="Type your message..."
                        value={messageInput}
                        onChangeText={(text) => setMessageInput(text)}
                      />
                      <TouchableOpacity onPress={sendMessage} style={{ padding: 10, borderRadius:7, backgroundColor: 'blue' }}>
                        <Text style={{ color: 'white' }}>Send</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <Text>{selectedAction.modalContent}</Text>
                )}
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}
