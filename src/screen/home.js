import { Dimensions, StyleSheet, View, Text, FlatList, Image, Platform } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import MapView, { Marker, Callout, Polyline } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { requestLocationPermission } from '../services/utilities/permission';
import { loc } from '../redux/Reducers/authReducers';
import { io } from 'socket.io-client';
import Geolocation from 'react-native-geolocation-service';
import CustomCard from '../component/card/customCard';
import { callAxiosGet, callAxiosPatch } from '../services/api';
import { API_CONSTANTS } from '../assets/config/constant';
import colors from '../assets/config/colors';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import PickView from './pickView';
import OrderDetails from './orderDetails';
import { addItems, setOrderScreen } from '../redux/Reducers/orderReducers';

const Home = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state?.locations?.locationData?.coords);
    const selectorToken = useSelector((state) => state?.auth?.authData);
    const orderScreen = useSelector((state) => state.orderScreen.screen)
    let navigation = useNavigation();
    const dataLocation = {
        latitude: 19.3111,
        longitude: 72.85999,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };



    const [initialRegion, setInitialRegion] = useState(selector === null ? dataLocation : {
        latitude: selector?.latitude,
        longitude: selector?.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [orders, setOrders] = useState([]);
    const [pickUp, setPickUp] = useState(null);
    const [dropOff, setDropOff] = useState(null);
    const [pickUpName, setPickUpName] = useState("");
    const [dropOffName, setDropOffName] = useState("");
    const [polylineCoords, setPolylineCoords] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    useEffect(() => {
        order();

        const connectSocket = async () => {
            const socket = io("https://www.click2bite.com");

            socket.on("connect", () => {


                const token = selectorToken?.token;

                socket.emit("user-details", { token });
            });

            socket.on("newOrder", (newOrder) => {
                setOrders((prevOrders) => [...prevOrders, newOrder]);
            });

            // Clean up the socket connection when the component unmounts
            return () => {
                socket.disconnect();
            };
        };

        connectSocket();
    }, []);
    useFocusEffect(
        useCallback(() => {
          // This will run when the screen is focused
          order(); // Fetch the orders or perform any other actions
    
          // Return a cleanup function if needed
          return () => {
            // Clean up, unsubscribe, etc.
          };
        }, [])
      );
    const order = async () => {
        try {
            const res = await callAxiosGet(API_CONSTANTS.order);
            setOrders(res?.data?.existingOrders);


        } catch (err) {
            console.log(err);
        }
    };


    const currentH = Dimensions.get('screen').height;
    const currentW = Dimensions.get('screen').width;

    const handleMarker = (item) => {
        const pickerLocation = {
            latitude: item?.c2bMerchant?.latitude,
            longitude: item?.c2bMerchant?.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        };
        const dropLocation = {
            latitude: item?.c2bAddress?.latitude,
            longitude: item?.c2bAddress?.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        };
        setPickUp(pickerLocation);
        setDropOff(dropLocation);
        setPickUpName(item?.c2bMerchant?.mName);
        // setDropOffName(`${item?.c2bAddress?.area}, ${item?.c2bAddress?.landmark}, ${item?.c2bAddress?.street}`);
        setPolylineCoords([pickerLocation, dropLocation]);
    };

    const handleAccept = async (item) => {
        await callAxiosPatch(`${API_CONSTANTS.orderAccept}?id=${item.id}&status=inProccess`).then((res) => {

            dispatch(setOrderScreen(2))
            dispatch(addItems(item))
            setSelectedOrder(item)
            navigation.navigate('OrderDetails')
        })
    };

    const handleReject = () => {
        // Add your reject logic here
    };

    return (
        <>
            {
                orderScreen === 1 ?


                    <View style={styles.container}>
                        <MapView
                            initialRegion={dataLocation}
                            style={{ height: "50%", width: currentW }}>
                            {pickUp && (
                                <Marker
                                    pinColor='blue'
                                    coordinate={{
                                        latitude: pickUp?.latitude,
                                        longitude: pickUp?.longitude,
                                    }}>
                                    <Callout>
                                        <Text>{pickUpName}</Text>
                                    </Callout>
                                </Marker>
                            )}
                            {dropOff && (
                                <Marker
                                    coordinate={{
                                        latitude: dropOff?.latitude,
                                        longitude: dropOff?.longitude,
                                    }}>
                                    <Callout>
                                        <Text>{dropOffName}</Text>
                                    </Callout>
                                </Marker>
                            )}
                            {polylineCoords.length > 0 && (
                                <Polyline
                                    coordinates={polylineCoords}
                                    strokeColor={colors.Primary} // fallback for when `strokeColors` is not supported by the map-provider
                                    strokeColors={[
                                        '#7F0000',
                                        '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                                        '#B24112',
                                        '#E5845C',
                                        '#238C23',
                                        '#7F0000'
                                    ]}
                                    strokeWidth={6}
                                />
                            )}
                        </MapView>
                        <FlatList
                            data={orders}
                            keyExtractor={(item, index) => item.id.toString()}
                            renderItem={({ item, index }) => {
                                
                                const name = item?.c2bMerchant?.mName;
                                // const { landmark, street } = item?.c2bAddress;
                                const data = item?.c2bAddress

                                return (
                                    <CustomCard
                                        key={index}
                                        distance={item.distanceToUser}
                                        pickUp={`${name}`}
                                        dropOff={`${data?.landmark}, ${data?.street}`}
                                        onPress={() => handleMarker(item)}
                                        handleAccept={() => handleAccept(item)}
                                        handleReject={handleReject}
                                        order={item.id}
                                    />
                                );
                            }}
                        />
                    </View>
                    :
                    orderScreen === 2 ?
                        <OrderDetails /> :
                        (<Text>hii</Text>)
            }
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Home;
