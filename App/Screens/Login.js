import { View, Text, Image,StyleSheet,TouchableOpacity,Dimensions, ScrollView } from 'react-native'
import React from 'react'
import app from './../../assets/images/app.jpg'
import logo from './../../assets/images/logo.png'
import Colors from '../../assets/Shared/Colors'
import SignInWithOAuth from '../Components/SignInWithOAuth'

export default function Login() {
  return (
    <ScrollView>
    <View style={{alignItems:'center',
    backgroundColor:Colors.LIGHT_GRAY}}>
      <Image source={app}
      style={styles.appImage}
      />
      <View style={{backgroundColor:Colors.white,
      padding:25,
      alignItems:'center',
      marginTop:-50,
      borderTopLeftRadius:20,
      borderTopRightRadius:20,
     }}>
      <Image source={logo}
      style={{width:200, height:100}}
      />
        <Text style={styles.heading}>Nurturing Minds, Empowering Lives:</Text>
        <Text style={styles.heading}>Your Trusted Companion in Mental Wellness</Text>
        <Text style={{textAlign:'center', marginTop:20,
      }}>Engage with Mentors and Powerful AI to Effortlessly manage your health journey</Text>
      
      <SignInWithOAuth/>

      </View>
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
appImage:{
  width:320,
  height:500,
  objectFit:'cover',
  marginTop:60,
  borderRadius:20,
  borderWidth:6,
  borderColor:'#000',
},
heading:{
  fontSize:28,
  fontWeight:'bold'
}
})