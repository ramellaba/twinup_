import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, Platform, Dimensions, Image, TextInput, Pressable } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

//Import Images
import TwinUpLogo from '../../images/twinuplogo.png';

//Import needed API for Forgot Password
import { forgotpasswordAPI } from '../Api/api';

//Obtain width of screen for CSS
const { width } = Dimensions.get('window');

//Main ForgotPassword Method
const ForgotPassword = () => {
    //Initialize variables and navigation
    const [emailaddressFP, setEmailAddressFP] = useState('');
    const navigation = useNavigation();

    //Method to handle ForgotPassword button press
    const handleForgotPassword = () => {
        if (emailaddressFP) {
            try {
                AsyncStorage.setItem('emailaddressFP', emailaddressFP);
            } catch (error) {
                console.error('Error saving email address in Forgot Password to AsyncStorage:', error);
                //Alert.alert('Forgot Password Failed', 'An error occurred while resetting password.');
            }
            //Forgot Password API Call
            forgotpasswordAPI();
        }
        //Navigate back to Sign In screen
        navigation.navigate('SignIn');
    }

    //Method to handle SignIn button press
    const handleSignIn = () => {
        navigation.navigate('SignIn');
    }

    //Screen Structure
    return (
        <View style={styles.container}>
            <View style={styles.topSection}>
                {/* Add the TwinUp image */}
                <Image source={TwinUpLogo} style={styles.twinUpLogo} />
            </View>
            <View style={styles.middleSection}>
                <TextInput
                    style={styles.input}
                    placeholder="Email Adress"
                    value={emailaddressFP}
                    onChangeText={text => setEmailAddressFP(text)}
                />
                {/*ForgotPassword Button*/}
                <TouchableOpacity style={styles.forgotPasswordButton} onPress={handleForgotPassword}>
                    <Text style={styles.forgotPasswordText}>Forgot Password</Text>
                </TouchableOpacity>
                {/*SignIn Button*/}
                <Pressable onPress={handleSignIn}>
                    <Text style={styles.signInButton}>Back to Sign In</Text>
                </Pressable>
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
    buttonList: {
        paddingTop: 20,
        alignItems: 'center',
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
        width: 80,
        height: 40,
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
    signInButton: {
        color: 'gray',
        padding: 10,
    },
    forgotPasswordButton: {
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
    forgotPasswordText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },

});

export default ForgotPassword;