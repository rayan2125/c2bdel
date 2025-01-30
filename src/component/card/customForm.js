import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Provider as PaperProvider, TextInput, DefaultTheme } from 'react-native-paper';
import colors from '../../assets/config/colors';

const CustomForm = ({
  maxLength,
  title,placeholder,right,mode,editable,error,keyboardType,value,multiline,onChangeText,theme,secureTextEntry}) => {
  return (
  
    <View>
    <Text style={{ fontSize: 16, color: "#2B2E35" }}>{title}</Text>
         <TextInput
         secureTextEntry={secureTextEntry}
         maxLength={maxLength}
           mode={mode}
           theme={theme}
           multiline={multiline}
           keyboardType={keyboardType}
           placeholder={placeholder}
           style={{ marginTop: 5 }} 
           outlineColor={colors.Primary}
          //  activeOutlineColor={theme.colors.outline}
           right={right}
           editable={editable}
           value={value}
           onChangeText={onChangeText}
         />
         <Text style={{ color: "red", }}>{error}</Text>
   </View>
  
   
  )
}

export default CustomForm

const styles = StyleSheet.create({})