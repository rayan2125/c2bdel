import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Platform, ToastAndroid } from 'react-native';
import Register from './register';
// import FrontAdharCardForm from './frontAdharCardform';
// import BackAdharCardFrom from './backAdharCardfrom';
// import PanCardForm from './panCardform';
import { ScrollView } from 'native-base';
// import Bankform from './bankform';
// import BlackCheckForm from './blackCheckform';
// import RestoDetail from './restoDetail';
// import MerchantImages from './merchantImageForm';
// import FssaiForm from './fssaiform';
// import MPanCardForm from './mPanCardform';
// import PersonalInfo from './personalInfo';
import colors from '../../assets/config/colors';
import * as Progress from 'react-native-progress';
import { Icon } from 'react-native-paper';
import { useDispatch, useSelector, } from 'react-redux';
import { callAxiosWithFormDataRegister, registerUser } from '../../services/api';
import { API_CONSTANTS } from '../../assets/config/constant';
import { useNavigation } from '@react-navigation/native';
import Bankform from './bankform';
// import CustomCard from '../../component/Custom/customCard';
// import { badharCard, fadharCard, panCard, removeMPan, removebadhar, removefadhar, removepan } from '../../redux/Reducers/perInfoReducers';

const StepperForm = () => {
    const dispatch = useDispatch();
    // const locSelector = useSelector((state) => state.auth.location);
    // const selector = useSelector((state) => state.prnInfo);
    const navigation = useNavigation();

    const [currentStep, setCurrentStep] = useState(0);
    const[progressBar,SetProgressBar] = useState(0)
    
    const steps = ['Register','PI', 'BD', 'VD'];
    const totalSteps = steps.length - 1;
   
    const [state, setState] = useState({
        userName: '',
        userEmail: '',
        userNumber: '',
        userPassword: '',
    });

    const [bstate, setBState] = useState({
        account: '',
        name: '',
        bankName: '',
        ifsc: '',
        address: ''
    });

    const [rstate, setRstate] = useState({
        name: '',
        email: '',
        number: '',
        gst: '',
        startTime: '',
        endTime: '',
    });

    // const [addstate, setAddstate] = useState({
    //     address: '',
    //     landmark: '',
    //     city: '',
    //     hState: '',
    //     zipcode: ''
    // });
    // const [resMesg, setResMesg] = useState('')
    // const [serverMsg, setServerMsg] = useState('')

    const [status, setStatus] = useState('');
    const [errors, setErrors] = useState({});

    // const [resStatus, setResStatus] = useState(false)
    // const [isConnected, setIsConnected] = useState(true);
    // const [isactive, setActive] = useState(false)


    // const back = selector.badharInfo;
    // const front = selector.fadharInfo;
   
    // const pan = selector.panInfo;
    // const cheq = selector.chequeInfo;
    // const hotel = selector.mImage;
    // const fssai = selector.fssaiInfo;
    // const mPan = selector.mPancardInfo;

    // const backAdharUri = back?.uri ? "file:///" + back.uri.split("file:/").join("") : "";
    // const frontAdharUri = front?.uri ? "file:///" + front.uri.split("file:/").join("") : "";
    // const panUri = pan?.uri ? "file:///" + pan.uri.split("file:/").join("") : "";
    // const cheque = cheq?.uri ? "file:///" + cheq.uri.split("file:/").join("") : "";
    // const merchantImg = hotel?.uri ? "file:///" + hotel.uri.split("file:/").join("") : "";
    // const fassImg = fssai?.uri ? "file:///" + fssai.uri.split("file:/").join("") : "";
    // const mPanImg = mPan?.uri ? "file:///" + mPan.uri.split("file:/").join("") : "";

    





    const styles = StyleSheet.create({
        centerElement: { justifyContent: 'center', alignItems: 'center' },
    });




    const validateStep = async () => {
        const { userName, userEmail, userNumber, userPassword } = state;
        const stepErrors = {};

        if (userName.trim() === '') {
            stepErrors.userName = 'Name is required';
        }
        if (userEmail.trim() === '') {
            stepErrors.userEmail = 'Email is required';
        }
        if (userNumber.trim() === '') {
            stepErrors.userNumber = 'Phone number is required';
        }
        if (userPassword.trim() === '') {
            stepErrors.userPassword = 'Password is required';
        }

        setErrors(stepErrors);
        const isValid = Object.keys(stepErrors).length === 0;
      
        if (isValid) {
            try {
                const datas = {
                    name: userName,
                    email: userEmail,
                    password: userPassword,
                    cNumber: userNumber
                };
                const response = await registerUser(datas)
               
                if (response.data.status === "success") {
                    // ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
                    return true;
                } else {
                    // ToastAndroid.show("This User already Exists. Please try another.", ToastAndroid.SHORT);
                    return false;
                }
            } catch (error) {
                console.error('Error registering user:', error);
                // ToastAndroid.show("Network problem. Please try again later.", ToastAndroid.SHORT);
                return false;
            }
        }
       

    };

    const validateImage = () => {
        const stepErrors = {};

        // if (!frontAdharUri) {
        //     stepErrors.frontAdharUri = 'Front Adhar Card photo is required';
        // }
        // if (!backAdharUri) {
        //     stepErrors.backAdharUri = 'Back Adhar Card photo is required';
        // }
        // if (!panUri) {
        //     stepErrors.panUri = 'PAN Card photo is required';
        // }

        setErrors(stepErrors);
        const isValid = Object.keys(stepErrors).length === 0;
        setStatus(isValid ? 'completed' : 'failed');
        return isValid;
    };
    const validateBankDetails = () => {
        const { account, name, bankName, ifsc, address } = bstate;
        const stepErrors = {};

        if (account.trim() === '') {
            stepErrors.account = 'Account number is required';
        }
        if (name.trim() === '') {
            stepErrors.name = 'Account name is required';
        }
        if (bankName.trim() === '') {
            stepErrors.bankName = 'Bank name is required';
        }
        if (ifsc.trim() === '') {
            stepErrors.ifsc = 'IFSC code is required';
        }
        if (address.trim() === '') {
            stepErrors.address = 'Bank address is required';
        }
        // if (!cheque) {
        //     stepErrors.cheque = 'Blank cheque is required';
        // }

        setErrors({ ...errors, ...stepErrors });
        const isValid = Object.keys(stepErrors).length === 0;
        setStatus(isValid ? 'completed' : 'failed');
        return isValid;
    };
    
    // const validateAddress = () => {
    //     const { address, landmark, city, hState, zipcode } = addstate;
    //     const stepErrors = {};

    //     if (!address.trim()) {
    //         stepErrors.address = 'Address is required';
    //     }
    //     if (!landmark.trim()) {
    //         stepErrors.landmark = 'Landmark is required';
    //     }
    //     if (!city.trim()) {
    //         stepErrors.city = 'City is required';
    //     }
    //     if (!hState.trim()) {
    //         stepErrors.hState = 'State is required';
    //     }
    //     if (!zipcode.trim()) {
    //         stepErrors.zipcode = 'Zipcode is required';
    //     }

    //     setErrors({ ...errors, ...stepErrors });
    //     const isValid = Object.keys(stepErrors).length === 0;
    //     setStatus(isValid ? 'completed' : 'failed');
    //     return isValid;
    // };

    // const handleSubmit = async () => {
    //     try {
    //         const formData = new FormData();

    //         setActive(true);

    //         formData.append('name', state.userName);
    //         formData.append('email', state.userEmail);
    //         formData.append('password', state.userPassword);
    //         formData.append('cNumber', state.userNumber);
    //         formData.append('mName', rstate.name);
    //         formData.append('mEmail', rstate.email);
    //         formData.append('mContact', rstate.number);
    //         formData.append('gst', rstate.gst);
    //         formData.append('area', addstate.address);
    //         formData.append('street', addstate.address);
    //         formData.append('landmark', addstate.landmark);
    //         formData.append('city', addstate.city);
    //         formData.append('state', addstate.hState);
    //         formData.append('zipCode', addstate.zipcode);
    //         formData.append('latitude', locSelector.latitude);
    //         formData.append('longitude', locSelector.longitude);
    //         formData.append('startTime', rstate.startTime);
    //         formData.append('endTime', rstate.endTime);
    //         formData.append('accountNumber', bstate.account);
    //         formData.append('accountName', bstate.name);
    //         formData.append('bankName', bstate.bankName);
    //         formData.append('ifscCode', bstate.ifsc);
    //         formData.append('bankAddress', bstate.address);

    //         const addFileToFormData = (key, fileUri) => {
    //             if (fileUri) {
    //                 formData.append(key, {
    //                     uri: fileUri,
    //                     type: mime.getType(fileUri),
    //                     name: fileUri.split("/").pop(),
    //                 });
    //             }
    //         };

    //         addFileToFormData('adharFront', frontAdharUri);
    //         addFileToFormData('adharBack', backAdharUri);
    //         addFileToFormData('panCard', panUri);
    //         addFileToFormData('mImage', merchantImg);
    //         addFileToFormData('mPanCard', mPanImg);
    //         addFileToFormData('mFssai', fassImg);
    //         addFileToFormData('blankCheck', cheque);

    //         console.log("Form data being sent:", formData);

    //         const response = await callAxiosWithFormDataRegister(API_CONSTANTS.merchant, formData);
    //         const data = response.data;

    //         if (data.status === "success") {
    //             setActive(false);
    //             setResStatus(true);
    //             setResMesg("Success");
    //             ToastAndroid.show("Registration Successful!", ToastAndroid.SHORT);
    //             navigation.navigate("AfterRegistration");

    //             dispatch(removefadhar(null));
    //             dispatch(removebadhar(null));
    //             dispatch(removepan(null));
    //             dispatch(removeMPan(null));
    //             dispatch(removecheque(null));
    //             dispatch(removeFssai(null));
    //             dispatch(removemImg(null));
    //         } else {
    //             setActive(false);
    //             setResStatus(true);
    //             setResMesg("Fail");
    //             ToastAndroid.show("Registration Failed: " + data.message, ToastAndroid.SHORT);
    //         }
    //     } catch (error) {
    //         setActive(false);
    //         console.error('Error during registration:', error);
    //         ToastAndroid.show("Network problem. Please try again later.", ToastAndroid.SHORT);
    //     }
    // };
    // const handleStepChange = async (direction) => {
    //     let isValid = false;
    //     switch (currentStep) {
    //         case 0:
    //             isValid = await validateStep();
    //             currentStep + 1
    //             break;
    //         case 1:
    //             isValid = validateImage();
    //             break;
    //         case 2:
    //             isValid = validateBankDetails();
    //             break;
    //         case 3:
    //             isValid = validateHotel();
    //             break;
    //         case 4:
    //             isValid = validateAddress();
    //             break;
    //         default:
    //             isValid = false;
    //             break;
    //     }

    //     if (isValid) {
    //         if (direction === 'next') {
    //             setCurrentStep(currentStep + 1);
    //         } else if (direction === 'back') {
    //             setCurrentStep(currentStep - 1);
    //         }
    //     }
    // };

    

    // const handlenavigation = (mes) => {
    //     mes === "Success" ?
    //         navigation.navigate("AfterRegistration") : setResStatus(false)


    // }
    const handleNext = async () => {

        switch (currentStep) {
            case 0:
                isValid = await validateStep();
                if(isValid){
                    setCurrentStep(currentStep + 1);
                }
                setCurrentStep(currentStep + 1);
                SetProgressBar(progressBar+0.35)
                break;
            case 1:
                isValid = validateImage();
                if(isValid){
                    setCurrentStep(currentStep + 1);
                }
                setCurrentStep(currentStep + 1);
                SetProgressBar(progressBar+0.35)
                break;
            case 2:
                isValid = validateBankDetails();
                if(isValid){
                    setCurrentStep(currentStep + 1);
                }
                setCurrentStep(currentStep + 1);
                SetProgressBar(progressBar+0.35)
                
                break;
            case 3:
                isValid = validateHotel();
                
                    setCurrentStep(currentStep + 1);
                
                
                break;
            case 4:
                isValid = validateAddress();
                
                    setCurrentStep(currentStep + 1);
                
                
                break;
            default:
                isValid = false;
                break;
        }
    }
    

    return (
        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#f6f6f6' }}>
            <View style={{ alignItems: 'center', padding: Platform.OS === "ios" ? 50 : 20, }}>
                <View style={{ width: 280, height: 70, top: 20 }}>
                    <View style={{ left:20,top:12 }}>
                    <Progress.Bar progress={progressBar} color={colors.Primary} width={220} />
                        {/* <View style={{ height: 2,left:20, backgroundColor:conditionWiseColor, width: progressBarWidth, position: 'absolute', top: 13, zIndex: 10 }} /> */}
                    </View>
                    {/* <Progress.Bar progress={0.3} width={200} /> */}
                    <View style={{ flexDirection: 'row', width: '100%', position: 'absolute', zIndex: 20 }}>
                        {steps.map((label, i) => (
                            <View key={i} style={{ alignItems: 'center', width: 70 }}>
                                {i > currentStep && (
                                    <View
                                        style={{
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: 30,
                                            height: 30,
                                            backgroundColor: '#fff',
                                            borderWidth: 2,
                                            borderColor: colors.Primary,
                                            borderRadius: 15,
                                            marginBottom: 10,
                                        }}
                                    >
                                        <Text style={{ fontSize: 15, color: colors.Primary }}>{i + 1}</Text>
                                    </View>
                                )}
                                {i < currentStep && (
                                    <View
                                        style={{
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: 30,
                                            height: 30,
                                            backgroundColor: 'green',
                                            borderWidth: 2,
                                            borderColor: 'green',
                                            borderRadius: 15,
                                            marginBottom: 10,
                                        }}
                                    >
                                        <Icon source="check" size={20} color='#fff' />
                                    </View>
                                )}
                                {i === currentStep && (
                                    <View
                                        style={{
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: 30,
                                            height: 30,
                                            backgroundColor: colors.Primary,
                                            borderWidth: 2,
                                            borderColor: colors.Primary,
                                            borderRadius: 15,
                                            marginBottom: 10,
                                        }}
                                    >
                                        <Text style={{ fontSize: 13, color: '#ffffff' }}>{i + 1}</Text>
                                    </View>
                                )}
                                <Text style={{ fontSize: 12 }}>{label}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>

            <View style={{ padding: 10, height: Dimensions.get("screen").height - 250 }}>
                {currentStep === 0 && (
                    <View style={{ height: Dimensions.get("screen").height - 250 }}>
                        <Text style={{ fontSize: 20, color: colors.textColor, fontWeight: "400" }}>Register</Text>
                        <Register state={state} setState={setState} errors={errors} validateStep={validateStep} />
                    </View>
                )}
                {currentStep === 1 && (
                    <View style={{ height: Dimensions.get("screen").height - 250 }}>
                        <Text style={{ fontSize: 20, color: colors.textColor, fontWeight: "400" }}>Personal Information</Text>
                        {/* <ScrollView>
                           <CustomCard title="Front Adhar Card"  id={1} selector={front} dispatch={(imageUri) => dispatch(fadharCard(imageUri))} remove={(node)=>dispatch(removefadhar(node))}/>
                            {errors.frontAdharUri && <Text style={{ color: colors.red }}>{errors.frontAdharUri}</Text>}
                            <CustomCard title="Back Adhar Card" selector={back} dispatch={(imageUri) => dispatch(badharCard(imageUri))} remove={(node)=>dispatch(removebadhar(node))} />
                            {errors.backAdharUri && <Text style={{ color: colors.red }}>{errors.backAdharUri}</Text>}
                            <CustomCard title="Pan Card " selector={pan} dispatch={(imageUri) => dispatch(panCard(imageUri))}  remove={(node)=>dispatch(removepan(node))} />
                            {errors.panUri && <Text style={{ color: colors.red }}>{errors.panUri}</Text>}
                        </ScrollView> */}
                    </View>
                )}
                {currentStep === 2 && (
                    <View style={{ height: Dimensions.get("screen").height - 250 }}>
                        <ScrollView>
                            <Bankform state={bstate} setState={setBState} />
                            {/* <BlackCheckForm /> */}
                        </ScrollView>
                    </View>
                )}
                {currentStep === 3 && (
                    <View style={{ height: Dimensions.get("screen").height - 250 }}>
                        <ScrollView>
                            {/* <RestoDetail state={rstate} setState={setRstate} />
                            <MerchantImages />
                            <FssaiForm />
                            <MPanCardForm /> */}
                        </ScrollView>
                    </View>
                )}
                {currentStep === 4 && (
                    <View style={{ height: Dimensions.get("screen").height - 250 }}>
                        {/* <PersonalInfo state={addstate} setState={setAddstate} /> */}
                    </View>
                )}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                    {currentStep > 0 ? (
                        <TouchableOpacity
                            style={[
                                styles.centerElement,
                                { bottom: 10, left: 10, width: 80, height: 35, backgroundColor: 'green', elevation: 10, borderRadius: 20 },
                            ]}
                            onPress={() => {
                                if (currentStep > 0) {
                                    setCurrentStep(currentStep - 1);
                                    SetProgressBar(progressBar-0.35)
                                }
                            }}
                        >
                            <Text style={{ color: '#fff' }}>Back</Text>
                        </TouchableOpacity>
                    ) : (
                        <Text> </Text>
                    )}
                    {currentStep + 1 < steps.length && (
                        <TouchableOpacity
                            style={[
                                styles.centerElement,
                                { bottom: 10, right: 10, width: 80, height: 35, backgroundColor: 'green', elevation: 10, borderRadius: 20 },
                            ]}
                            onPress={() => { handleNext() }}
                        >
                            <Text style={{ color: '#fff' }}>Next</Text>
                        </TouchableOpacity>
                    )}
                    {currentStep + 1 === steps.length && (
                        <TouchableOpacity
                            style={[
                                styles.centerElement,
                                { bottom: 10, right: 10, width: 80, height: 35, backgroundColor: '#ee5e30', elevation: 10, borderRadius: 20 },
                            ]}
                            onPress={() => {

                            }}
                        >
                            <Text style={{ color: '#fff' }}>Finish</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );
};

export default StepperForm;
