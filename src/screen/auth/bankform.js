import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Icon } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import CustomForm from '../../component/card/customForm'
// import BlackCheckForm from './blackCheckform';

const Bankform = ({state, setState, errors}) => {
    const navigation = useNavigation()
    const [imageState, setImageState] = useState(null)

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <View style={{  }}>
                    
                    <View style={{ }}>
                        <Text style={{ color: "black", fontSize: 25, fontWeight: "400" }}>
                            Bank details
                        </Text>
                        <View style={{  }}>

                            <CustomForm
                                value={state.account}
                                placeholder="Your Account Number"
                                mode="outlined"
                                keyboardType="number-pad"
                                onChangeText={(text) => setState({ ...state, account: text })}
                                error={errors?.account}
                            />
                            <CustomForm
                                value={state.account}
                                placeholder="Re-enter Your Account Number"
                                mode="outlined"
                                keyboardType="number-pad"
                                onChangeText={(text) => setState({ ...state, account: text })}
                                error={errors?.account}
                            />
                             <CustomForm
                                value={state.name}
                                placeholder=" Account Holder Name"
                                mode="outlined"
                                onChangeText={(text) => setState({ ...state, name: text })}
                                error={errors?.name}
                            
                            />
                            <CustomForm
                                value={state.bankName}
                                placeholder="Bank Name"
                                mode="outlined"
                                onChangeText={(text) => setState({ ...state, bankName: text })}
                                error={errors?.bankName}
                            />
                            <CustomForm
                                value={state.ifsc}
                                placeholder="IFSC Code"
                                mode="outlined"
                                onChangeText={(text) => setState({ ...state, ifsc: text })}
                                error={errors?.ifsc}
                            />
                            <CustomForm
                                value={state.address}
                                placeholder="Bank Address"
                                mode="outlined"
                                onChangeText={(text) => setState({ ...state, address: text })}
                                error={errors?.address}
                            />
                            
                        </View>
                        

                    </View>
                </View>

            </View>
        </ScrollView>
    )
}

export default Bankform

const styles = StyleSheet.create({})