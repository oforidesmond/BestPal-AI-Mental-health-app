import React, { useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Animated, Easing } from 'react-native';
import { WebView } from 'react-native-webview';

export default function CommunityChat() {
  const webViewRef = useRef(null);
  const [showReloadButton, setShowReloadButton] = useState(false);
  const slideAnimation = useRef(new Animated.Value(-50)).current;

  const showError = () => {
    setShowReloadButton(true);
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };

  const hideError = () => {
    Animated.timing(slideAnimation, {
      toValue: -50,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start(() => {
      setShowReloadButton(false);
    });
  };

  const reloadWebView = () => {
    if (webViewRef.current) {
      webViewRef.current.reload();
      hideError();
    }
  };

  return (
    <View style={styles.container}>
      {showReloadButton && (
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            transform: [{ translateY: slideAnimation }],
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: 10,
          }}
        >
          <TouchableOpacity onPress={reloadWebView}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Reload</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
      <WebView
        ref={webViewRef}
        source={{ uri: 'https://pi.ai/discover' }}
        style={styles.webview}
        onError={showError}
        onLoad={hideError}
        scalesPageToFit={true}
        cacheEnabled={true}
        allowsFullscreenVideo={true}
        allowsInlineMediaPlayback={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        mixedContentMode="compatibility"
        userAgent="Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Mobile Safari/537.36"
        scrollEnabled={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
