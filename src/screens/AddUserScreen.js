import { View, Text, ScrollView, TextInput, SafeAreaView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PrimaryButton, PrimaryLoader } from '../components/MainComponent';
import * as Location from 'expo-location';
import { symbolicateLogNow } from 'react-native/Libraries/LogBox/Data/LogBoxData';

const AddUserScreen = ({ navigation }) => {

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [suite, setSuite] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [company, setCompany] = useState('');
  const [showloading, setShowLoading] = useState(false);

  useEffect(() => {
    locationPermission()
    getData();
  }, [])

  const locationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Info',
        'Permission to access location was denied. Please allow this App to use your location services for better experience. You may enable this at your phone settings.',
        [
          { text: 'OK' }
          // { text: 'OK', onPress: () => requestLocationPermission() },
        ],
      );
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLat(location.coords.latitude.toString());
    setLong(location.coords.longitude.toString());
  }

  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Info', 'Permission to access location was denied. Please allow this App to use your location services for better experience.');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLat(location.coords.latitude.toString());
    setLong(location.coords.longitude.toString());
  }

  const getData = async () => {
    let random = Math.floor(Math.random() * 200) + 100;
    setId(random.toString())
  }

  const validation = async () => {

    setShowLoading(true)

    if (name == '') {
      Alert.alert("Info", ("Full name cannot be empty!"))
      setShowLoading(false)
      return
    }

    if (username == '') {
      Alert.alert("Info", ("Username cannot be empty!"))
      setShowLoading(false)
      return
    }

    if (email == '') {
      Alert.alert("Info", ("Email cannot be empty!"))
      setShowLoading(false)
      return
    }

    if (street == '') {
      Alert.alert("Info", ("Street cannot be empty!"))
      setShowLoading(false)
      return
    }

    if (city == '') {
      Alert.alert("Info", ("City cannot be empty!"))
      setShowLoading(false)
      return
    }

    if (zipcode == '') {
      Alert.alert("Info", ("Zipcode cannot be empty!"))
      setShowLoading(false)
      return
    }

    if (phone == '') {
      Alert.alert("Info", ("Phone cannot be empty!"))
      setShowLoading(false)
      return
    }

    //Delete previous storage
    AsyncStorage.removeItem("NEW_USER")

    //Transform to JSON String
    let userObj = {
      id: id,
      name: name,
      username: username,
      email: email,
      address: {
        street: street,
        suite: suite,
        city: city,
        zipcode: zipcode,
        geo: {
          lat: lat,
          lng: long
        }
      },
      phone: phone,
      website: website,
      company: {
        name: company,
      }
    }

    //Save in AsyncStorage
    AsyncStorage.setItem("NEW_USER", JSON.stringify(userObj))

    setTimeout(() => {
      navigation.navigate('Main')
      Alert.alert("Info", ("Submission is successful!"))
    }, 2000)

  }

  return (
    <View style={{ flex: 1 }}>
      {showloading ?
        <PrimaryLoader />
        :
        <ScrollView style={{ marginTop: 0, width: "100%" }}>
          <View>
            <View>
              <Text style={{ marginLeft: 20, marginTop: 10, color: "#000" }}>ID</Text>
              <TextInput
                style={[{ fontSize: 14, height: 40, width: '90%', alignSelf: "center", marginTop: 5, backgroundColor: "#FAFAFA", paddingHorizontal: 20, borderRadius: 5, borderColor: "#E2E0E0", borderWidth: 1 }]}
                onChangeText={id => setId(id)}
                defaultValue={id}
                editable={false}
              />
            </View>

            <View>
              <Text style={{ marginLeft: 20, marginTop: 10, color: "#000" }}>Full name</Text>
              <TextInput
                style={[{ fontSize: 14, height: 40, width: '90%', alignSelf: "center", marginTop: 5, backgroundColor: "#FAFAFA", paddingHorizontal: 20, borderRadius: 5, borderColor: "#E2E0E0", borderWidth: 1 }]}
                onChangeText={name => setName(name)}
                defaultValue={name}
                editable={true}
              />
            </View>

            <View>
              <Text style={{ marginLeft: 20, marginTop: 10, color: "#000" }}>Username</Text>
              <TextInput
                style={[{ fontSize: 14, height: 40, width: '90%', alignSelf: "center", marginTop: 5, backgroundColor: "#FAFAFA", paddingHorizontal: 20, borderRadius: 5, borderColor: "#E2E0E0", borderWidth: 1 }]}
                onChangeText={username => setUsername(username)}
                defaultValue={username}
                editable={true}
              />
            </View>

            <View>
              <Text style={{ marginLeft: 20, marginTop: 10, color: "#000" }}>Email</Text>
              <TextInput
                style={[{ fontSize: 14, height: 40, width: '90%', alignSelf: "center", marginTop: 5, backgroundColor: "#FAFAFA", paddingHorizontal: 20, borderRadius: 5, borderColor: "#E2E0E0", borderWidth: 1 }]}
                onChangeText={email => setEmail(email)}
                defaultValue={email}
                editable={true}
              />
            </View>

            <View>
              <Text style={{ marginLeft: 20, marginTop: 10, color: "#000" }}>Address</Text>
              <TextInput
                style={[{ fontSize: 14, height: 40, width: '90%', alignSelf: "center", marginTop: 5, backgroundColor: "#FAFAFA", paddingHorizontal: 20, borderRadius: 5, borderColor: "#E2E0E0", borderWidth: 1 }]}
                onChangeText={street => setStreet(street)}
                defaultValue={street}
                placeholder="Street"
                editable={true}
              />
              <TextInput
                style={[{ fontSize: 14, height: 40, width: '90%', alignSelf: "center", marginTop: 5, backgroundColor: "#FAFAFA", paddingHorizontal: 20, borderRadius: 5, borderColor: "#E2E0E0", borderWidth: 1 }]}
                onChangeText={city => setCity(city)}
                defaultValue={city}
                placeholder="City"
                editable={true}
              />
              <TextInput
                style={[{ fontSize: 14, height: 40, width: '90%', alignSelf: "center", marginTop: 5, backgroundColor: "#FAFAFA", paddingHorizontal: 20, borderRadius: 5, borderColor: "#E2E0E0", borderWidth: 1 }]}
                onChangeText={suite => setSuite(suite)}
                defaultValue={suite}
                placeholder="Suite"
                editable={true}
              />
              <TextInput
                style={[{ fontSize: 14, height: 40, width: '90%', alignSelf: "center", marginTop: 5, backgroundColor: "#FAFAFA", paddingHorizontal: 20, borderRadius: 5, borderColor: "#E2E0E0", borderWidth: 1 }]}
                onChangeText={zipcode => setZipcode(zipcode)}
                defaultValue={zipcode}
                placeholder="Zipcode"
                editable={true}
              />
            </View>


            <View>
              <Text style={{ marginLeft: 20, marginTop: 10, color: "#000" }}>Geo</Text>
              <TextInput
                style={[{ fontSize: 14, height: 40, width: '90%', alignSelf: "center", marginTop: 5, backgroundColor: "#FAFAFA", paddingHorizontal: 20, borderRadius: 5, borderColor: "#E2E0E0", borderWidth: 1 }]}
                onChangeText={lat => setLat(lat)}
                defaultValue={lat}
                placeholder="Latitude"
                editable={false}
              />
              <TextInput
                style={[{ fontSize: 14, height: 40, width: '90%', alignSelf: "center", marginTop: 5, backgroundColor: "#FAFAFA", paddingHorizontal: 20, borderRadius: 5, borderColor: "#E2E0E0", borderWidth: 1 }]}
                onChangeText={long => setLong(long)}
                defaultValue={long}
                placeholder="Longitude"
                editable={false}
              />
            </View>

            <View>
              <Text style={{ marginLeft: 20, marginTop: 10, color: "#000" }}>Phone</Text>
              <TextInput
                style={[{ fontSize: 14, height: 40, width: '90%', alignSelf: "center", marginTop: 5, backgroundColor: "#FAFAFA", paddingHorizontal: 20, borderRadius: 5, borderColor: "#E2E0E0", borderWidth: 1 }]}
                onChangeText={phone => setPhone(phone)}
                defaultValue={phone}
                editable={true}
              />
            </View>

            <View>
              <Text style={{ marginLeft: 20, marginTop: 10, color: "#000" }}>Website</Text>
              <TextInput
                style={[{ fontSize: 14, height: 40, width: '90%', alignSelf: "center", marginTop: 5, backgroundColor: "#FAFAFA", paddingHorizontal: 20, borderRadius: 5, borderColor: "#E2E0E0", borderWidth: 1 }]}
                onChangeText={website => setWebsite(website)}
                defaultValue={website}
                editable={true}
              />
            </View>

            <View>
              <Text style={{ marginLeft: 20, marginTop: 10, color: "#000" }}>Company Name</Text>
              <TextInput
                style={[{ fontSize: 14, height: 40, width: '90%', alignSelf: "center", marginTop: 5, backgroundColor: "#FAFAFA", paddingHorizontal: 20, borderRadius: 5, borderColor: "#E2E0E0", borderWidth: 1 }]}
                onChangeText={company => setCompany(company)}
                defaultValue={company}
                editable={true}
              />
            </View>
          </View>
        </ScrollView>
      }
      {!showloading &&
        <SafeAreaView>
          <View style={{ padding: 10, marginTop: 10 }}>
            <PrimaryButton title='Register' onPress={() => validation()} />
          </View>
        </SafeAreaView>
      }
    </View>
  )
}

export default AddUserScreen