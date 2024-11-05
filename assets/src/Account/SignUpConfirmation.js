import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, Platform, Dimensions, Image, TextInput, Pressable } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

//Import Images
import TwinUpLogo from '../../images/twinuplogo.png';

//Import needed API for Sign Up Confirmation
import { loginAPI } from '../Api/api';

//Obtain width of screen for CSS
const { width } = Dimensions.get('window');

//Main SignUpConfirmation Method
const SignUpConfirmation = () => {
    //Initialize variables and navigation
    const [confirmationcodeSU, setConfirmationCodeSU] = useState('');
    const navigation = useNavigation();

    //Method to handle Login button press
    const handleLogin = () => {
        if (confirmationcodeSU) {
            try {
                AsyncStorage.setItem('confirmatiocodeSU', confirmationcodeSU);
            } catch (error) {
                console.error('Error saving confirmation code in SignUpConfirmation to AsyncStorage:', error);
                //Alert.alert('SignUpConfirmation Failed', 'An error occurred while setting confirmation code in AsyncStorage.');
            }
            //SignUpConfirmation API Call
            loginAPI();
            //Navigate to Facility Screen
            navigation.navigate('Facility');
        }
    }

    //Screen Structure
    return (
        <View style={styles.container}>
            <View style={styles.topSection}>
                {/* Add the TwinUp image */}
                <Image source={TwinUpLogo} style={styles.twinUpLogo} />
            </View>
            <View style={styles.middleSection}>
                <Text>Please Enter Confirmation Code Below</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Confirmation Code"
                    value={confirmationcodeSU}
                    onChangeText={text => setConfirmationCodeSU(text)}
                />
                {/*Login Button*/}
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.bottomSection}></View>
        </View>
    )
} //End of ForgotPassword()

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    topSection: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10, // Padding on both sides
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
    },
    middleSection: {
        flex: 6,
        backgroundColor: '#f0f0f0',
        padding: 10, // Add padding around the content
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        alignItems: 'center',
    },
    bottomSection: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        paddingHorizontal: 10, // Padding on both sides
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
    },
    buttonWrapper: {
        backgroundColor: '#4682B4',
        width: 0.9 * width,
        paddingVertical: 20,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
    },
    twinUpLogo: {
        width: 200,
        height: 50,
        marginLeft: 20,
        top: 10,
    },
    input: {
        height: 40,
        width: '90%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: 'white',
    },
    loginButton: {
        backgroundColor: '#4682B4',
        width: '90%',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
    },
    loginText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },

});

export default SignUpConfirmation;