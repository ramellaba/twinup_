import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, Platform, Dimensions, Image, TextInput, Pressable } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

//Import Images
import TwinUpLogo from '../../images/twinuplogo.png';

//Import needed API for SignIn
import { requestloginAPI } from '../Api/api';

//Obtain width of screen for CSS
const { width } = Dimensions.get('window');

//Main SignIn Method
const SignIn = () => {
    //Initialize variables and navigation
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    //Method to handle SignIn button press
    const handleSignIn = () => {
        if (username && password) {
            try {
                AsyncStorage.setItem('username', username);
                AsyncStorage.setItem('password', password);
            } catch (error) {
                console.error('Error saving username or password to AsyncStorage:', error);
                //Alert.alert('Sign In Failed', 'An error occurred while signing in.');
            }
        }
        (async () => {
            if (await requestloginAPI()) {
                //Navigate to Facility Screen
                navigation.navigate('Facility');
            } else {
                console.log("Failed to sign in user");
            }
        })();
    }
    //Method to handle SignUp button press
    const handleSignUp = () => {
        navigation.navigate('SignUp');
    }
    //Method to handle ForgotPassword button press
    const handleForgotPassword = () => {
        navigation.navigate('ForgotPassword');
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
                    placeholder="Username"
                    value={username}
                    onChangeText={text => setUsername(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
                {/*ForgotPassword Button*/}
                <Pressable onPress={handleForgotPassword}>
                    <Text style={styles.forgotPasswordButton}>Forgot Password?</Text>
                </Pressable>

                {/*SignIn Button*/}
                <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
                    <Text style={styles.signInText}>Sign In</Text>
                </TouchableOpacity>
                {/*SignUp Button*/}
                <Pressable onPress={handleSignUp}>
                    <Text style={styles.signUpButton}>Don't have an account? Sign Up Here!</Text>
                </Pressable>
            </View>
            <View style={styles.bottomSection}></View>
        </View>
    )
} //End of SignIn()

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
    signUpButton: {
        color: 'gray',
        padding: 10,
    },
    signInButton: {
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
    signInText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },

});

export default SignIn;