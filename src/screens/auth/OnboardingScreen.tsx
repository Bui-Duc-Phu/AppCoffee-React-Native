import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import Swiper from 'react-native-swiper';
import { appInfo } from '../../contasts/appInfo';
import { appColor } from '../../contasts/appColor';
import { getImage } from '../../../assets/images';

const OnboardingScreen = ({ navigation }: any) => {
  const [index, setIndex] = useState(0);

  return (
    <View style={globalStyles.container}>
      <Swiper
        style={styles.swiper}
        loop={false}
        onIndexChanged={num => setIndex(num)}
        index={index}
        activeDotColor={appColor.yellowDot}>
        <Image
          source={getImage.onboarding1}
          style={styles.image}
        />
        <Image
          source={getImage.onboarding2}
          style={styles.image}
        />
        <Image
          source={getImage.onboarding3}
          style={styles.image}
        />
      </Swiper>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.footerText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() =>{
          index < 2 ?  setIndex(index + 1) : navigation.navigate('LoginScreen')
   
          
        }}>
          <Text style={styles.footerText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  swiper: {
    paddingVertical: 40,
  },
  image: {
    flex: 1,
    width: appInfo.sizes.WIDTH,
    height: appInfo.sizes.HEIGHT,
    resizeMode: 'center',
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    position: 'absolute',
    bottom: 20,
    right: 20,
    left: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    color: appColor.darkred,
    fontSize:16
  },
});

export default OnboardingScreen;
