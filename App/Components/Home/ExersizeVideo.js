import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Button, FlatList, Modal, TouchableOpacity } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Ionicons } from '@expo/vector-icons'; 
import Colors from '../../../assets/Shared/Colors';

export default function ExersizeVideo({ exersizeVideo }) {
  const videoRefs = useRef([]);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [videoPlaybackStarted, setVideoPlaybackStarted] = useState(false);


  useEffect(() => {
    if (videoPlaybackStarted && selectedVideoIndex !== null) {
      videoRefs.current[selectedVideoIndex]?.playAsync();
      setVideoPlaybackStarted(false);
    }
  }, [videoPlaybackStarted, selectedVideoIndex]);

  const playPauseVideo = async (index) => {
    try {
      if (videoRefs.current[index]) {
        const playbackStatus = await videoRefs.current[index].getStatusAsync();

        if (playbackStatus.isPlaying) {
          await videoRefs.current[index].pauseAsync();
        } else {
          await videoRefs.current[index].playAsync();
        }
      }
    } catch (error) {
      console.error('Error while playing/pausing video:', error);
    }
  };

  const openVideoModal = (index) => {
    setSelectedVideoIndex(index);
    setVideoPlaybackStarted(true);
    setModalVisible(true);
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => openVideoModal(index)}>
      <Video
        key={index}
        ref={(ref) => (videoRefs.current[index] = ref)}
        source={{ uri: item?.attributes?.Video?.data[0]?.attributes?.url }}
        useNativeControls={false}
        resizeMode={ResizeMode.COVER}
        isLooping
        style={styles.video}
      />
      <Ionicons name="play-outline" size={50} color={Colors.LIGHT_GRAY} style={styles.playIcon} />
    </TouchableOpacity>
  );

  const closeModal = () => {
    setModalVisible(false);
    setSelectedVideoIndex(null);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={exersizeVideo}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.videoContainer}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer} >
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Ionicons name="close" size={30} color={Colors.LIGHT_GRAY} />
          </TouchableOpacity>
          <Video
            source={{ uri: exersizeVideo[selectedVideoIndex]?.attributes?.Video?.data[0]?.attributes?.url }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            style={styles.modalVideo}
            ref={(ref) => {
              videoRefs.current[selectedVideoIndex] = ref;
              if (videoPlaybackStarted && selectedVideoIndex !== null) {
                ref?.playAsync();
                setVideoPlaybackStarted(false);
              }
            }}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  videoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  video: {
    width: 300,
    height: 200,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  playIcon: {
    position: 'absolute',
    top: '40%',
    left: '40%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  modalVideo: {
    width: '90%',
    height: '80%',
    borderRadius: 10,
  },
});
