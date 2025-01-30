import { Dimensions, Image, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Header from '../component/header';
import Geolocation from 'react-native-geolocation-service';
import { io } from 'socket.io-client';
import { requestLocationPermission } from '../services/utilities/permission';
import { useSelector } from 'react-redux';

const PickView = ({ route }) => {
    const selectorToken = useSelector((state) => state?.auth?.authData);
    const selectedLocation = useSelector((state) => state.location)
    const socket = io("https://www.click2bite.com");

    const latitude = route?.params?.pickUp?.latitude;
    const longitude = route?.params?.pickUp?.longitude;
    const coords = route?.params?.selectorLocation



    const id = route?.params?.id

    const [deliverBoyLoc, setDeliverBoyLoc] = useState({
        deliverLatitude: coords && coords.latitude,
        deliverLongitude: coords && coords.longitude,
    });

    const [coordinates, setCoordinates] = useState([
        { latitude: latitude, longitude: longitude },
        // { latitude: deliverBoyLoc.deliverLatitude, longitude: deliverBoyLoc.deliverLongitude},
        // { latitude: 19.300, longitude: 72.875 }
    ]);

    useEffect(() => {
        const getLocationAndEmit = () => {
            Geolocation.getCurrentPosition(
                (position) => {
                    socket.emit("updateLocation", { orderId: id, position });
                },
                (error) => {
                    console.error("Error getting position: ", error);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        };

        requestLocationPermission();
        const watchId = Geolocation.watchPosition(
            (position) => {
                socket.emit("updateLocation", { orderId: id, position });
            },
            (error) => {
                console.error("Error watching position: ", error);
            },
            { enableHighAccuracy: true, distanceFilter: 10 }
        );

        socket.on("connect", () => {
            const token = selectorToken?.token;
            socket.emit("user-details", { token });
        });

        socket.on(`order-${id}-location-update`, (location, userID) => {

            let coords = location?.location?.coords;
            if (coords) {
                setDeliverBoyLoc({
                    deliverLatitude: coords.latitude,
                    deliverLongitude: coords.longitude,
                });

                // Update coordinates for polyline
                setCoordinates(prevCoords => [
                    ...prevCoords,
                    { latitude: coords.latitude, longitude: coords.longitude }
                ]);
            } else {
                console.warn("No coords found in deliverboyLocation event");
            }
        });

        const interval = setInterval(getLocationAndEmit, 12000); // 2 minutes

        return () => {
            Geolocation.clearWatch(watchId);
            clearInterval(interval);
            socket.disconnect();
        };
    }, []);

    const currentH = Dimensions.get('screen').height;
    const currentW = Dimensions.get('screen').width;

    return (
        <View style={{ flex: 1 }}>
            <Header />
            <MapView
                style={{ height: currentH, width: currentW }}
                region={{
                    latitude: latitude, // Center the map on either initial or deliver boy's location
                    longitude: longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    title={route?.params?.mName}
                    coordinate={{
                        latitude: latitude,
                        longitude: longitude
                    }}
                />
                <Marker
                    title='Deliver Location'
                    // image={require('../assets/images/delivery.png')}

                    // style={{height:20,width:20}}
                    coordinate={{
                        latitude: deliverBoyLoc.deliverLatitude,
                        longitude: deliverBoyLoc.deliverLongitude
                    }}
                >
                    <Image source={require('../assets/images/delivery.png')} resizeMode="contain" style={{ height: 40, width: 40, }} />
                </Marker>
                <Polyline
                    coordinates={coordinates}
                    strokeColor="#000" // Polyline color
                    strokeWidth={2} // Polyline width
                />
            </MapView>
        </View>
    );
}

export default PickView;

const styles = StyleSheet.create({});
