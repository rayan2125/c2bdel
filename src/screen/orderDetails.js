import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Icon } from 'react-native-paper'
import colors from '../assets/config/colors'
import { useNavigation } from '@react-navigation/native'
import { Linking } from 'react-native'
import Header from '../component/header'
import { useDispatch, useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import Geolocation from 'react-native-geolocation-service';
import { PERMISSIONS } from 'react-native-permissions'
import { requestLocationPermission } from '../services/utilities/permission'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Swipeable } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import { removeItems, resetScreen } from '../redux/Reducers/orderReducers'

const OrderDetails = ({ item }) => {
    let dispatch = useDispatch()
    const navigation = useNavigation();

    const selectorLocation = useSelector((state) => state?.locations?.locationData?.coords);
    const selectedOrder = useSelector((state) => state?.orderScreen?.data);
console.log(selectedOrder)
    const id = selectedOrder?.id;
    const pickUp = selectedOrder?.c2bMerchant;
    // const deliverboyLocation = selectorToken


    const renderLeftActions = (progress, dragX) => {
        return (
            <View style={styles.leftAction}>
                <Text style={styles.actionText}>Set Otp!!!</Text>
            </View>
        );
    };

    const updateLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                // socket.emit("updateLocation", { orderId: item.id, latitude, longitude });
            },
            (error) => {
                console.log(error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    useEffect(() => {
        const interval = setInterval(updateLocation, 120000); // 2 minutes
        return () => clearInterval(interval);
    }, []);

    const handleCall = () => {
        Linking.openURL(`tel:${8080205724}`);
    };

    const handlePickUp = () => {
        let data = {
            id,
            pickUp,
            selectorLocation
        }
        navigation.navigate("PickView", data);
    };


    // let ftechImage = fetch(

    // )
    const handleCamera = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 1000,
            maxWidth: 1000,
        };
        launchCamera(options, (response) => {
            if (!response.didCancel && !response.error) {
                let imageUri = response.uri || response.assets?.[0]?.uri;
                setImageUrl(imageUri);
            }
        });
    };
    const handleData = () => {
        dispatch(resetScreen(1))
        dispatch(removeItems())
        // console.log("my data us")
        navigation.navigate("Home")
    }

    return (
        <>
            {/* <Header /> */}
            <View style={{ margin: 10, flex: 1, justifyContent: 'space-between' }}>
                <View style={{ backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 20, borderRadius: 10, position: "relative", elevation: 5 }}>
                    <Text style={{ textAlign: 'center', fontSize: 20, marginBottom: 10 }}>Pick Up</Text>
                    <Text>{id}</Text>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <View style={{ marginLeft: 20, height: 50, width: 50, backgroundColor: 'white', borderRadius: 100, borderColor: 'black', borderWidth: 1 }}>
                            <Text>img</Text>
                        </View>
                        <View>
                            {pickUp && (
                                <>
                                    <Text style={{ fontSize: 20, color: colors.green, fontWeight: '600' }}>{pickUp.mName}</Text>
                                    <Text style={{ fontSize: 12, color: colors.textColor, fontWeight: '600' }}>{pickUp.landmark}, {pickUp.area}</Text>
                                </>
                            )}

                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 10 }}>
                        <TouchableOpacity
                            onPress={() => handlePickUp()}
                            style={{ elevation: 5, backgroundColor: colors.green, height: 50, width: 50, justifyContent: 'center', marginLeft: 10, marginRight: 10, alignItems: 'center', borderRadius: 100 }}>
                            <Icon source="car-traction-control" color={colors.White} size={30} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ elevation: 5, backgroundColor: colors.green, height: 50, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 100 }}>
                            <Icon source="phone" color={colors.White} size={30} />
                        </TouchableOpacity>
                    </View>
                    <Text>Connect With The Restaurant</Text>
                </View>
                <LinearGradient
                    colors={['#06f648', '#3cad5b', '#fdbb2d']}
                    start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                    style={styles.item}>

                    <Swipeable

                        renderLeftActions={renderLeftActions}
                        onSwipeableLeftOpen={() => handleData()}
                        overshootLeft={false} // Prevents overshooting on left swipe
                        overshootRight={true} // Prevents overshooting on right swipe
                    >
                        <View style={{ width: 320, flexDirection: 'row', alignItems: 'center' }}>

                            <View style={{ backgroundColor: "white", height: 50, width: 50, borderRadius: 100, }}>
                                <View></View>

                            </View>
                            <Text style={{ alignItems: 'center', marginHorizontal: '30%' }}>Send Otp!</Text>
                        </View>
                    </Swipeable>
                </LinearGradient>

            </View>
        </>
    );
}

export default OrderDetails;

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        margin: 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 100,
        alignItems: 'center',
        flexDirection: 'row',

    },
    leftAction: {

        // flex: 1,
        width: 320,
        height: 20
    },
    actionText: {
        color: 'white',
        fontSize: 16,
        padding: 20,
    },
});
