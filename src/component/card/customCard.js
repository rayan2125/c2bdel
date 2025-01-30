import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../../assets/config/colors'

const CustomCard = ({distance, pickUp, dropOff, onPress,handleAccept, handleReject,order }) => {
    
    

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                onPress={onPress}
                style={styles.card}>
                    <View style={{marginBottom:0,justifyContent:'flex-end',alignItems:'flex-end'}}>

                    <Text style={{color:colors.textColor,fontWeight:'800',letterSpacing:0.4,marginBottom:5}}>Order Id #{order}</Text>
                    </View>
                <View style={styles.pickupContainer}>
                    <Text style={styles.label}>PICK UP</Text>
                    <Text style={styles.value}>{pickUp}</Text>
                </View>
                <View style={styles.dropOffContainer}>
                    <Text style={styles.label}>DROP OFF</Text>
                    <Text style={styles.value}>{dropOff}</Text>
                </View>
                <View style={styles.distanceContainer}>
                    <Text style={styles.label}>DISTANCE</Text>
                    <Text style={[styles.value,{width:'80%'}]}>{distance}km</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        onPress={handleReject}
                        style={styles.rejectButton}>
                        <Text style={styles.buttonText}>Reject</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleAccept}
                        style={styles.acceptButton}>
                        <Text style={styles.buttonText}>Accept</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 15,
    },
    pickupContainer: {
        marginBottom: 10,
    },
    dropOffContainer: {
        width: '100%',
        marginBottom: 10,
    },
    distanceContainer: {
        position: 'absolute',
        right: 30,
        top: 45,
    },
    label: {
        color: 'grey',
        fontWeight: '700',
        marginBottom: 10,
    },
    value: {
        color: 'black',
        fontWeight: '700',
        width: '50%',
    },
    buttonContainer: {
        flexDirection: 'row',
        // alignItems:'center',
        position: 'absolute',
        right: 10,
        bottom: 10,
        width: 180,
        justifyContent: 'space-around',
    },
    rejectButton: {
        backgroundColor: 'red',
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 10,
        width: 80,
        alignItems: 'center',
    },
    acceptButton: {
        backgroundColor: 'orange',
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 10,
        width: 80,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
    }
});

export default CustomCard
