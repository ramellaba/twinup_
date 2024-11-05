import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, TextInput, Platform, Dimensions, Image, Modal, Button } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

//Import images
import TwinUpLogo from '../../images/twinuplogo.png';

//Import necessary APIs
import { getentityAPI } from '../Api/api';

//Obtain window width
const { width } = Dimensions.get('window');

//Main Entity Function
const Entity = () => {
  //Initialize variables
  const [entitydatalist, setEntityDataList] = useState([]);
  const navigation = useNavigation();
  //const [isAddFacilityModalVisible, setAddFacilityModalVisible] = useState(false);
  //const [addfacilityname, setAddFacilityName] = useState('');
  //const [selectedType, setSelectedType] = useState('Commercial');

  //Store facilitydatalist from AsyncStorage in array for HTML use
  const fetchEntityData = async () => {
    try {
      const storedEntityData = await AsyncStorage.getItem('entitydatalist');
      if (storedEntityData !== null) {
        // If data exists in AsyncStorage, parse it and set the state
        setEntityDataList(JSON.parse(storedEntityData));
      } else {
        // If no data found, fetch it from the server
        // Fetch data from server and store it in AsyncStorage
      }
    } catch (error) {
      console.log('Error retrieving Entity data from AsyncStorage:', error);
    }
  };

  //On Start up effect
  useEffect(() => {
    //Call Get Entity API
    getentityAPI()
    //Call fetchEntityData method
    fetchEntityData();
  }, []);







  //Function to handle when a facility button is pressed
  const handleEntityPress = (entityID) => {
    console.log('id:', entityID);
    //Add further logic
    //Store current entity id in async
  };

  //Function for when the Add Facility button is pressed
  const handleBackPress = () => {
    navigation.navigate('Facility');
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
          {entitydatalist.map((entity, index) => (
            <TouchableOpacity key={index} style={styles.entitiesButton} onPress={() => handleEntityPress(entity[1])}>
              <Text style={styles.buttonText}>{entity[0]}</Text>
              {/*<Text style={styles.buttonText}>{entity[1]}</Text>*/}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.bottomSection}>
        {/* Back to Facilities Button */}
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Text style={styles.buttonText}>Back to Facilities</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
} //End of Entity()

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
  entitiesButton: {
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
  backButton: {
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

export default Entity;