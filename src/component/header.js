import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import colors from '../assets/config/colors'
import { Icon } from 'react-native-paper'

const Header = () => {
    let navigation = useNavigation()
    return (
        <View style={{margin:10}}>
            <TouchableOpacity
                onPress={() => navigation.pop()}
                style={{ backgroundColor: colors.Primary, height: 45, width: 45, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                <Icon source="chevron-left" size={25} color={colors.White} />
            </TouchableOpacity>
        </View>
    )
}

export default Header