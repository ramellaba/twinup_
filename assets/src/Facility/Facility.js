import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, TextInput, Platform, Dimensions, Image, Modal, Button } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

//Import images
import TwinUpLogo from '../../images/twinuplogo.png';

//Import necessary APIs
import { getfacilityAPI, addfacilityAPI } from '../Api/api';

//Obtain window width
const { width } = Dimensions.get('window');

//Main Facility Function
const Facility = () => {
  //Initialize variables
  const [facilitydatalist, setFacilityDataList] = useState([]);
  const [isAddFacilityModalVisible, setAddFacilityModalVisible] = useState(false);
  const [addfacilityname, setAddFacilityName] = useState('');
  const navigation = useNavigation();
  //const [selectedType, setSelectedType] = useState('Commercial');

  //Store facilitydatalist from AsyncStorage in array for HTML use
  const fetchFacilityData = async () => {
    try {
      const storedFacilityData = await AsyncStorage.getItem('facilitydatalist');
      if (storedFacilityData !== null) {
        // If data exists in AsyncStorage, parse it and set the state
        setFacilityDataList(JSON.parse(storedFacilityData));
      } else {
        // If no data found, fetch it from the server
        // Fetch data from server and store it in AsyncStorage
      }
    } catch (error) {
      console.log('Error retrieving facility data from AsyncStorage:', error);
    }
  };

  //On Start up effect
  useEffect(() => {
    //Call Get Facility API
    getfacilityAPI();
    //Call fetchFacilityData method
    fetchFacilityData();
  }, []);

  //Function to handle when a facility button is pressed
  const handleFacilityPress = (facilityID) => {
    //console.log('id:', facilityID);
    //Add further logic
    //Store current facility id in async to use for entities screen
    try {
      AsyncStorage.setItem('facilityidnumber', facilityID.toString());
    } catch (error) {
      console.error('Error saving facilityidnumber to AsyncStorage:', error);
    }
    //Navigate to the Entity Screen
    navigation.navigate('Entity');
  };

  //Function for when the Add Facility button is pressed
  const handleAddFacilityPress = () => {
    setAddFacilityModalVisible(true);
  };

  //Function for when the user adds a facility
  const handleAddPress = async () => {
    //If statement for input in the textbox
    if (addfacilityname) {
      //Put addfacilityname in asyncstorage
      try {
        AsyncStorage.setItem('addfacilityname', addfacilityname);
        //Call Add Facility method
        await addfacilityAPI();
        //Refresh facility data
        await getfacilityAPI();
        //Call the fetchFacilityData
        await fetchFacilityData();
        //Close Popup
        setAddFacilityModalVisible(false);
      } catch (error) {
        console.error('Error saving addfacilityname to AsyncStorage:', error);
        //Alert.alert('Add facility Failed', 'An error occurred for addfacilityname to asyncstorage.');
      }
    }
  };

  //Function to handle when the user wants the add facility popup to close
  const closeAddFacilityPopup = () => {
    setAddFacilityModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        {/* Add the TwinUp image */}
        <View style={styles.logoContainer}>
          <Image source={TwinUpLogo} style={styles.TwinUpLogo} />
        </View>
        {/* Add the settings image */}
        {/*<Image source={SettingsImage} style={[styles.settingsIcon, { tintColor: 'rgb(255, 55, 40)' }]} />*/}
      </View>
      <View style={styles.middleSection}>
        <ScrollView contentContainerStyle={styles.buttonList} showsVerticalScrollIndicator={false}>
          {/* Map through the buttons array to render buttons dynamically */}
          {facilitydatalist.map((facility, index) => (
            <TouchableOpacity key={index} style={styles.facilitiesButton} onPress={() => handleFacilityPress(facility[1])}>
              <Text style={styles.buttonText}>{facility[0]}</Text>
              {/*<Text style={styles.buttonText}>{facility[1]}</Text>*/}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.bottomSection}>
        {/* Add Facility Button */}
        <TouchableOpacity style={styles.addFacilityButton} onPress={handleAddFacilityPress}>
          <Text style={styles.buttonText}>Add Facility</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isAddFacilityModalVisible}
        onRequestClose={closeAddFacilityPopup}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Add new facility</Text>
            <TextInput
              style={styles.input}
              placeholder="Facility Name"
              value={addfacilityname}
              onChangeText={text => setAddFacilityName(text)}
            />
            {/*Implement dropdown menu to allow user to pick what type of facility they want*/}
            {/*<View style={styles.dropdownContainer}>
              <Picker
                selectedValue={selectedType}
                style={styles.dropdown}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedType(itemValue)
                }>
                <Picker.Item label="Commercial" value="Commercial" />
                <Picker.Item label="Condominium" value="Condominium" />
                <Picker.Item label="Single-Family Residential" value="Single-Family Residential" />
                <Picker.Item label="Multi-Family Residential" value="Multi-Family Residential" />
                <Picker.Item label="Retail" value="Retail" />
                <Picker.Item label="School" value="School" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
              </View>*/}
            {/*Add Button*/}
            <TouchableOpacity style={styles.addButton} onPress={handleAddPress}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
            {/*Cancel Button*/}
            <TouchableOpacity style={styles.cancelButton} onPress={closeAddFacilityPopup}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
} //End of Facility()

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  addButton: {
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
  cancelButton: {
    backgroundColor: '#A9A9A9',
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
  },
  bottomSection: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 10, // Padding on both sides
    paddingTop: 20, //just added
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    alignItems: 'center',
    justifyContent: 'flex-start', //was originally center
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
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
  settingsIcon: {
    position: 'absolute',
    top: 40, // Adjust positioning if needed
    right: 15, // Adjust positioning if needed
    width: 35,
    height: 35,
  },
  TwinUpLogo: {
    width: 200,
    height: 50,
    marginLeft: 20,
    top: 10,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  facilitiesButton: {
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
  addFacilityButton: {
    backgroundColor: '#FF5733',
    width: '90%',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  modalText: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
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
  dropdownContainer: {
    width: '90%',
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  dropdown: {
    height: 40,
    width: '100%',
    backgroundColor: 'white',
  },
  refreshButton: {
    backgroundColor: '#4682B4',
    paddingVertical: 5,
    //paddingHorizontal: 10,
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    top: 10,
  },
});

export default Facility;