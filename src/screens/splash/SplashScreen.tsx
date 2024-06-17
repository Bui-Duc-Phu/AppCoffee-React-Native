import React from 'react';
import { View, Text, ImageBackground, StyleSheet, ActivityIndicator } from 'react-native';
import { getImage } from '../../../assets/images';
import { SpaceComponent } from '../../components';
import { appColor } from '../../contasts/appColor';


const SplashScreen = () => {
  return (
    <ImageBackground style={styles.container} source={getImage.splash_Img2}>
      <View style={styles.innerContainer}>
  
        <ActivityIndicator color={appColor.danger} style={{marginTop:-40}} size={30}/>
        
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center'
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
  },
});

export default SplashScreen;
