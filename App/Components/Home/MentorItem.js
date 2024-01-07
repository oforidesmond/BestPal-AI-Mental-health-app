import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import Colors from '../../../assets/Shared/Colors';

class MentorItemErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state to indicate the error
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error('Item Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI when an error occurs
      return (
        <View style={{ width: 200, borderWidth: 1, borderColor: Colors.LIGHT_GRAY, borderRadius: 10, marginRight: 10 }}>
          <Text style={{ padding: 7, color: 'red' }}>Error: Unable to display information</Text>
        </View>
      );
    }

    // Render the child components if there's no error
    return this.props.children;
  }
}

function MentorItem({ mentor }) {
  return (
    <MentorItemErrorBoundary>
      <View style={{ width: 200, borderWidth: 1, borderColor: Colors.LIGHT_GRAY, borderRadius: 10, marginRight: 10 }}>
        <Image
          source={{ uri: mentor.attributes.image.data.attributes.url }}
          style={{ width: '100%', height: 110, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
        />

        <View style={{ padding: 7 }}>
          <Text style={{ fontFamily: 'appfont-semi', fontSize: 16 }}>{mentor.attributes.Name}</Text>
          <Text style={{ color: Colors.GRAY }}>{mentor.attributes.Address}</Text>
          
        </View>
      </View>
    </MentorItemErrorBoundary>
  );
}

export default MentorItem;
