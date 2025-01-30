import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../../assets/config/colors'

import { Icon, MD3Colors } from 'react-native-paper';
import icons from '../../assets/config/icons';


const CustomButton = ({ btnName, onPress, backgroundColor, source ,borderColor,borderWidth,textColor,width,fontSize}) => {
    return (
        <View style={{width:width,elevation:9}}> 
            <TouchableOpacity
                onPress={onPress}
                style={{
                    backgroundColor: backgroundColor, justifyContent: "center", alignItems: "center",
                    flexDirection: "row",
                    borderColor:borderColor,
                    borderWidth:borderWidth,
                    paddingHorizontal:5,paddingVertical:8, borderRadius: 25
                }}>
                <Text style={{ color: textColor, marginHorizontal: 10, fontSize: fontSize, }}>{btnName}</Text>
                <Icon
                    // size={20}
                    source={source}
                    color={colors.White}
                    size={30}

                />
            </TouchableOpacity>
        </View>
    )
}

export default CustomButton

const styles = StyleSheet.create({})