import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { PaperProvider, DefaultTheme, ActivityIndicator, MD2Colors } from 'react-native-paper';  // Import DefaultTheme
import CustomForm from '../../component/card/customForm';
import CustomButton from '../../component/card/customButton';
import colors from '../../assets/config/colors';
import { useNavigation } from '@react-navigation/native';

import { API_CONSTANTS } from '../../assets/config/constant';
import { Failed, Success } from '../../services/utilities';

const Register = ({ state, setState, errors }) => {


  const navigation = useNavigation()

  return (


    <View style={{ flex: 1, }}>
      <View style={{  }}>
        <View>
          <CustomForm
            value={state.userName}
            mode="outlined"
            placeholder="Enter name"
            onChangeText={(text) => setState({ ...state, userName: text })}
            error={errors?.userName}
          />
          <CustomForm
            value={state.userEmail}
            keyboardType="email-address"
            mode="outlined"
            placeholder="Enter email"
            onChangeText={(text) => setState({ ...state, userEmail: text })}
            error={errors?.userEmail}
          />
          <CustomForm
            value={state.userNumber}
            mode="outlined"
            keyboardType="number-pad"
            placeholder="Enter phone"
            onChangeText={(text) => setState({ ...state, userNumber: text })}
            error={errors?.userNumber}
            maxLength={10}
          />
          <CustomForm
            value={state.userPassword}
            secureTextEntry={true}
            mode="outlined"
            placeholder="Enter password"
            onChangeText={(text) => setState({ ...state, userPassword: text })}
            error={errors?.userPassword}
          />
        </View>


      </View>

    </View>

  );
};

export default Register;

const styles = StyleSheet.create({});
