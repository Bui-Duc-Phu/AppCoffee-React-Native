import { InputAccessoryView, StyleSheet } from 'react-native';
import { appColor } from '../contasts/appColor';
import { RadioButton } from 'react-native-paper';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColor.white2,
    paddingHorizontal:20
  
    
  },
  centerMap:{
    justifyContent:'center',
    alignItems:'center',
  
  },
  body:{
    flex: 1,
    backgroundColor: appColor.white2,
    paddingVertical:10
  },
  layout:{
    flex: 1,
    backgroundColor: appColor.white2,
    paddingTop:30,
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
  },

  input:{
    flexDirection:'row',
    borderWidth:1,
    borderRadius:12,
    borderColor:appColor.gray,
  },
  section: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  shadow: {
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },


});
