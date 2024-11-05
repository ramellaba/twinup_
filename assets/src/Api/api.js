import AsyncStorage from '@react-native-async-storage/async-storage';

//Variables for API Request URLs
const requestloginURL = 'https://api.twinup.ai/api/requestlogin';
const forgotpasswordURL = 'https://api.twinup.ai/api/forgetpassword';
const registerURL = 'https://api.twinup.ai/api/register';
const facilityURL = 'https://api.twinup.ai/api/user/Facility';
const entityURL = 'https://api.twinup.ai/api/user/FacilityEntityGroup?facilityId=';

//Request Login API
const requestloginAPI = async () => {
    try {
        const requestloginRESPONSE = await fetch(requestloginURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: await AsyncStorage.getItem('username'),
                password: await AsyncStorage.getItem('password'),
            }),
        });
        if (requestloginRESPONSE.ok) {
            const requestloginDATA = await requestloginRESPONSE.json();
            if (requestloginDATA.header.responseCode == '0') {
                //Store access token in AsyncStorage
                AsyncStorage.setItem('token', requestloginDATA.data.token);
                console.log(await AsyncStorage.getItem('token'));
                return true;
            }
            else {
                return false;
            }
            //following two lines are to test retrieving the token in asyncstorage
            //once user is logged in they need to access the facilities page
            //send them to the facilities page            
        }
    } catch (error) {
        console.error('Error in fetching API -> requestlogin:', error);
        throw new Error('Error in fetching API -> requestlogin');
    }

};

//Forgot Password API
const forgotpasswordAPI = async () => {
    try {
        const forgotpasswordRESPONSE = await fetch(forgotpasswordURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: await AsyncStorage.getItem('emailaddressFP'),
            }),
        });
    }
    catch (error) {
        console.error('Error in fetching API -> Forgot Password:', error);
        throw new Error('Network response was not ok');
    }
};

//Register API
const registerAPI = async () => {
    try {
        const registerRESPONSE = await fetch(registerURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: AsyncStorage.getItem('firstnameSU'),
                lastName: AsyncStorage.getItem('lastnameSU'),
                email: AsyncStorage.getItem('emailaddressSU'),
                password: AsyncStorage.getItem('passwordSU'),
            }),
        });
        const registerDATA = await registerRESPONSE.json();
        if (registerDATA.data == true) {
            //Call Login
            //generateToken(email, password);
            //Instead of creating another method, I am going to do it all in one
            try {
                const generatetokenRESPONSE = await fetch(requestloginURL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: AsyncStorage.getItem('emailaddressSU'),
                        password: AsyncStorage.getItem('passwordSU'),
                    }),
                });
                if (generatetokenRESPONSE.ok) {
                    const generatetokenDATA = await generatetokenRESPONSE.json();
                    //Store generated short token in Async Storage
                    AsyncStorage.setItem('shorttoken', generatetokenDATA.data.token);
                }
            } catch (error) {
                console.log('Error in generatetokenRESPONSE', error);
                throw new Error('generatetokenRESPONSE in registerAPI has error');
            }
        }
    } catch (error) {
        console.error('Error making register request:', error);
    }
};

//Login API
const loginAPI = async () => {
    try {
        const loginRESPONSE = await fetch(loginURL, {
            method: 'POST',
            headers: {
                'Content-Typle': 'application/json',
            },
            body: JSON.stringify({
                token: await AsyncStorage.getItem('shorttoken'),
                code: await AsyncStorage.getItem('confirmatiocodeSU'),
            }),
        });
        if (loginRESPONSE.ok) {
            const loginDATA = await loginRESPONSE.json();
            //Store full token in AsyncStorage
            AsyncStorage.setItem('token', loginDATA.data.token);
        }
    } catch (error) {
        console.error('Error logging new user in:', error);
        throw new Error('Network response was not ok.'); 
    }
};

//GET Facility Data API
const getfacilityAPI = async () => {
    //Initialize variable to store token for API
    const facilitytoken = await AsyncStorage.getItem('token');
    try {
        const getfacilityRESPONSE = await fetch(facilityURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + facilitytoken,
            }
        });
        if (getfacilityRESPONSE.ok) {
            const getfacilityDATA = await getfacilityRESPONSE.json();
            //Create an array to hold the facility names and ids
            const facilitydatalist = [];
            //For loop to store names and ids in initialized data list
            for (let i = 0; i < getfacilityDATA.data.length; i++) {
                facilitydatalist.push([getfacilityDATA.data[i].name, getfacilityDATA.data[i].id]);
            }
            //Store facilitydatalist in AsyncStorage
            await AsyncStorage.setItem('facilitydatalist', JSON.stringify(facilitydatalist));
        } else {
            //If the response status is not ok, throw an error
            throw new Error('Error: ${getfacilityRESPONSE.status} - ${getfacilityRESPONSE.statusText}');
        }
    } catch (error) {
        console.log('Error making GET Facility request:', error);
        //Alert.alert('Error', 'There was an error making the request.');
    }
};

//POST Facility API
const addfacilityAPI = async () => {
    //Initialize variable to store token for API
    const facilitytoken = await AsyncStorage.getItem('token');
    try {
        const addfacilityRESPONSE = await fetch(facilityURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + facilitytoken,
            },
            body: JSON.stringify({
                facilityTypeId: '1',
                name: await AsyncStorage.getItem('addfacilityname'),
            }),
        });
        //Store data from response
        const addfacilityDATA = await addfacilityRESPONSE.json();
        console.log(addfacilityDATA);
    } catch (error) {
        console.log('Error making POST facility request:', error);
    }
};

//GET Entity API
const getentityAPI = async () => {
    const entitytoken = await AsyncStorage.getItem('token');
    const facilityidnumber = await AsyncStorage.getItem('facilityidnumber');
    const url = `${entityURL}${facilityidnumber}`; // Using string interpolation
    try {
        const getentityRESPONSE = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + entitytoken,
            }
        });
        if (getentityRESPONSE.ok) {
            const getentityDATA = await getentityRESPONSE.json();
            console.log(getentityDATA.data.name);
            const entitydatalist = [];
            //For loop to store entity names and ids in initialized data list
            for (let i = 0; i < getentityDATA.data.length; i++) {
                entitydatalist.push([getentityDATA.data[i].name, getentityDATA.data[i].id]);
            }
            //Store the entitydatalist in AsyncStorage
            await AsyncStorage.setItem('entitydatalist', JSON.stringify(entitydatalist));
        } else {
            //If the response status is not ok, throw an error
            throw new Error('Error: ${getentityRESPONSE.status} - ${getentityRESPONSE.statusText}');
        }
    } catch (error) {
        console.log('Error making GET Entity request:', error);
        //Alert.alert('Error', 'There was an error making the request.');
    }
};

export { requestloginAPI, forgotpasswordAPI, registerAPI, loginAPI, getfacilityAPI, addfacilityAPI, getentityAPI };