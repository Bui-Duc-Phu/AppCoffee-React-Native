import { StyleSheet } from 'react-native';
import { appColor } from '../contasts/appColor';
import { RadioButton } from 'react-native-paper';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColor.white,
    
  },
  layout:{
    flex: 1,
    backgroundColor: appColor.white,
    marginTop:30
  },
  text: {
    fontSize: 16,
    color: appColor.black,
  },
  buton :{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',  
    paddingHorizontal :16,
    paddingVertical : 10,
    minHeight: 40,
    borderRadius: 12,
    
   
  }
});
