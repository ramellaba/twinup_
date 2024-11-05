import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, Platform, Dimensions, Image, TextInput, Pressable } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

//Import Images
import TwinUpLogo from '../../images/twinuplogo.png';

//Import needed API for SignUp
import { registerAPI } from '../Api/api';

//Obtain width of screen for CSS
const { width } = Dimensions.get('window');

//Main SignUp Method
const SignUp = () => {
    //Initialize variables and navigation
    const [firstnameSU, setFirstNameSU] = useState('');
    const [lastnameSU, setLastNameSU] = useState('');
    const [emailaddressSU, setEmailAddressSU] = useState('');
    const [passwordSU, setPasswordSU] = useState('');
    const [repasswordSU, setRePasswordSU] = useState('');
    const navigation = useNavigation();

    //Method to handle SignUp button press
    const handleSignUp = () => {
        if (firstnameSU && lastnameSU && emailaddressSU && passwordSU && repasswordSU) {
            if (passwordSU === repasswordSU) {
                try {
                    AsyncStorage.setItem('firstnameSU', firstnameSU);
                    AsyncStorage.setItem('lastnameSU', lastnameSU);
                    AsyncStorage.setItem('emailaddressSU', emailaddressSU);
                    AsyncStorage.setItem('passwordSU', lastnameSU);
                } catch (error) {
                    console.error('Error saving SignUp value(s) to AsyncStorage:', error);
                    //Alert.alert('Sign Up Failed', 'An error occurred while signing up.');
                }

                //Call Register API
                registerAPI();
                //Navigate to the Sign Up Confirmation Screen
                navigation.navigate('SignUpConfirmation');
            }
        }
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
                    placeholder="First Name"
                    value={firstnameSU}
                    onChangeText={text => setFirstNameSU(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    value={lastnameSU}
                    onChangeText={text => setLastNameSU(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email Address"
                    value={emailaddressSU}
                    onChangeText={text => setEmailAddressSU(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={passwordSU}
                    onChangeText={text => setPasswordSU(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Re-enter Password"
                    value={repasswordSU}
                    onChangeText={text => setRePasswordSU(text)}
                />

                {/*SignUp Button*/}
                <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
                    <Text style={styles.signUpText}>Sign Up</Text>
                </TouchableOpacity>
                {/*SignIn Button*/}
                <Pressable onPress={handleSignIn}>
                    <Text style={styles.signInButton}>Already have an account? Sign In Here!</Text>
                </Pressable>
            </View>
            <View style={styles.bottomSection}></View>
        </View>
    )
} //End of SignUp()

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
    forgotPasswordButton: {
        color: 'gray',
        padding: 10,
    },
    signInButton: {
        color: 'gray',
        padding: 10,
    },
    signUpButton: {
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
    signUpText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },

});

export default SignUp;