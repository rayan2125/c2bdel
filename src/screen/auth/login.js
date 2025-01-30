import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View, ToastAndroid, PermissionsAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { PERMISSIONS, request, check, RESULTS } from 'react-native-permissions';
import { PaperProvider, DefaultTheme, MD2Colors, ActivityIndicator } from 'react-native-paper';

import colors from '../../assets/config/colors';
import { useNavigation } from '@react-navigation/native';
import Api, { callAxios } from '../../services/api';
import { API_CONSTANTS } from '../../assets/config/constant';
import Geolocation from 'react-native-geolocation-service';
import { useDispatch, useSelector } from 'react-redux';
import { authToken, loc, logout, setAuthdata } from '../../redux/Reducers/authReducers';
import { useNetInfo } from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomForm from '../../component/card/customForm';
import CustomButton from '../../component/card/customButton';
import { Failed, Pending, Success } from '../../services/utilities/utilities';
import { requestLocationPermission } from '../../services/utilities/permission';
import { addLocation } from '../../redux/Reducers/locationReducers';

const Login = () => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state.auth.authData);
  const netInfo = useNetInfo();
  const navigation = useNavigation();
  const [status, setStatus] = useState('');
  
  const [state, setState] = useState({
    userEmail: '',
    passWord: '',
    flag: 'deliver'
  });
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccesMessage] = useState('');
  const [pendingMessage, setPendingMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [visibleDialog, setVisibleDialog] = useState(true);

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    await requestCameraPermission();
    await requestLocationPermission();
  };

  const requestCameraPermission = async () => {
    try {
      let result;
      if (Platform.OS === 'ios') {
        result = await request(PERMISSIONS.IOS.CAMERA);
        
      } else {
        result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      }

      if (result === RESULTS.GRANTED || result === PermissionsAndroid.RESULTS.GRANTED) {
        
      } else {
        
      }
    } catch (error) {
    
    }
  };

  // const requestLocationPermission = async () => {
   
  //   try {
  //     let result;
  //     if (Platform.OS === 'ios') {
  //       result = await Geolocation.requestAuthorization("whenInUse").then(request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)).catch((error)=>console.log(error,"checking error is "))
  //     } else {
  //       result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
  //     }

  //     if (result === RESULTS.GRANTED || result === PermissionsAndroid.RESULTS.GRANTED) {
      
  //       Geolocation.getCurrentPosition(
  //         (position) => {
            
  //           const { latitude, longitude } = position.coords;
  //           dispatch(loc(position.coords));
  //         },
  //         (error) => {
            
  //           ToastAndroid.show('Error getting location: ' + error.message, ToastAndroid.LONG);
  //         },
  //         { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  //       );
  //     } else {
      
  //       ToastAndroid.show('Location permission denied', ToastAndroid.LONG);
  //     }
  //   } catch (error) {
      
  //     ToastAndroid.show('Error requesting location permission: ' + error.message, ToastAndroid.LONG);
  //   }
  // };

  const handleSubmit = async () => {
    try {
      const isConnect = netInfo.isConnected;
      if (!isConnect) {
        setErrorMessage({ message: 'Device is offline.' });
        setStatus(2);
        return;
      }
      let isValid = true;
      setLoader(true);
      if (state.userEmail === "") {
        setEmailError("Please enter your email");
        isValid = false;
      } else {
        setEmailError('');
      }

      if (state.passWord === '') {
        setPasswordError("Please enter your password");
        isValid = false;
      } else if (state.passWord.length < 6) {
        setPasswordError("Password must be at least 6 characters");
        isValid = false;
      } else {
        setPasswordError('');
      }

      if (isValid) {
        callAxios(API_CONSTANTS.login, state)
          .then((res) => {
            
            if (res.data.status === "Success") {
              let authData = res.data;
              let token = res.data.token;
              setStatus(1);
              setSuccesMessage(authData);
              dispatch(setAuthdata(authData));
              Geolocation.getCurrentPosition((position)=>
              dispatch(addLocation(position)))

              setTimeout(() => {
                navigation.navigate("Home");
                setStatus('');
              }, 1000);
              try {
                AsyncStorage.setItem("token", token);
              } catch (error) {
                setErrorMessage(error);
                setStatus(2);
                setLoader(false);
              }
            } else if (res.data.status === "Pending") {
              setStatus(3);
              setLoader(false);
              setPendingMessage(res.data);
              setTimeout(() => {
                setStatus('');
              }, 2000);
            } else if (res.data.error) {
              setStatus(3);
              setLoader(false);
              setPendingMessage(res.data.error.data);
              setState({ ...state, userEmail: '', passWord: '' });
              setTimeout(() => {
                setStatus('');
              }, 2000);
            } else if (res.data.error === "undefined") {
              setLoader(false);
              ToastAndroid.show("Network Problem Please Try after Sometime...!", ToastAndroid.SHORT);
              setState({ ...state, userEmail: '', passWord: '' });
              setTimeout(() => {
                setStatus('');
              }, 2000);
            } else {
              const errorMsg = res.data.error.data;
              setErrorMessage(errorMsg);
              setStatus(2);
              setLoader(false);
              setState({ ...state, userEmail: '', passWord: '' });
              setTimeout(() => {
                setStatus('');
              }, 2000);
            }
          })
          .catch((error) => {
            if (error.response) {
              let errorMessages = error.response.data;
              setErrorMessage(errorMessages);
              setStatus(2);
              setLoader(false);
              setState({ ...state, userEmail: '', passWord: '' });
            }
          });
      }
    } catch (error) {
      
    } finally {
      setLoader(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <PaperProvider
      theme={{
        ...DefaultTheme,
        roundness: 15,
        colors: {
          ...DefaultTheme.colors,
          primary: colors.Primary,
        },
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1 }}>
          {loader && (
            <View style={{ position: "absolute", top: '50%', right: "47%", zIndex: 9, backgroundColor: colors.White, borderRadius: 100, paddingHorizontal: 10, paddingVertical: 10 }}>
              <ActivityIndicator animating={true} color={colors.Primary} />
            </View>
          )}
          {
          
          status &&  (
          
            <View style={{margin:20, top:Platform.OS==="ios"?60:10 }}>
              {status === 1 ? <Success message={successMessage.message} /> :
                status === 2 ? <Failed message={errorMessage.message} /> :
                  status === 3 ? <Pending message={pendingMessage.message} /> : null}
            </View>
          )}
          <View style={{ flex: 1, margin: 20 }}>
            <View style={{ height: 200 }}></View>
            <CustomForm
              mode="outlined"
              keyboardType="email-address"
              placeholder="Enter email address"
              onChangeText={(text) => setState({ ...state, userEmail: text })}
              error={emailError}
              value={state.userEmail}
            />
            <CustomForm
              secureTextEntry={true}
              mode="outlined"
              placeholder="Enter password"
              onChangeText={(text) => setState({ ...state, passWord: text })}
              error={passwordError}
              value={state.passWord}
            />
            <View style={{ gap: 20, marginTop: 20 }}>
              <CustomButton
                btnName="Login"
                textColor={colors.White}
                backgroundColor={colors.Primary}
                onPress={handleSubmit}
              />
              <CustomButton
                backgroundColor={colors.green}
                textColor={colors.White}
                btnName="Register"
                onPress={() => navigation.navigate("StepperForm")}
              />
            </View>
            <TouchableOpacity
              style={{ padding: 20, textAlign: 'right' }}
              onPress={() => navigation.navigate("forgot")}
            >
              <Text style={{ fontSize: 18, textAlign: "right", color: colors.Primary }}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </PaperProvider>
  );
};

export default Login;
