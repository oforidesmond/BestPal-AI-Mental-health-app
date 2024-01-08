import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import Colors from '../assets/Shared/Colors';
import axios from 'axios';

//Trying out if API calls works
const ChatGPT = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [data, setData] = useState([]);
  const apiKey = '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'; // Test Key
  const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
  const [textInput, setTextInput] = useState('');

  const handleSend = async () => {
    const prompt = textInput;
    const response = await axios.post(apiUrl, {
      prompt: prompt,
      max_tokens: 1024,
      temperature: 0.5,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    });
    const text = response.data.choices[0].text;
    setData([...data, { type: 'user', 'text': textInput }, { type: 'bot', 'text': text }]);
    setTextInput('');
  };

  return (
   
    <View style={styles.container}>
      <Text style={styles.title}>Hello {user.firstName},</Text>
      <Text style={styles.subtitle}>My name is Bud.</Text>
      <Text style={styles.subtitle}>Thank you for coming to me🥰</Text>
      <Text style={styles.subtitle}>Now, what's bothering you?</Text>

      {/* <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        style={styles.chatContainer}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={[styles.sender, { color: item.type === 'user' ? 'green' : 'red' }]}>
              {item.type === 'user' ? 'You' : 'Bot'}
            </Text>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />
   
      <TextInput
        style={styles.input}
        value={textInput}
        onChangeText={text => setTextInput(text)}
        placeholder="What's on your mind?"
      />
      
      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity> */}

    </View>
  );
};

export default ChatGPT;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  chatContainer: {
    width: '100%',
    marginTop: '85%',
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sender: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  messageText: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    width: '100%',
    height: 60,
    marginBottom: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    width: '100%',
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.SECONDARY,
  },
});
