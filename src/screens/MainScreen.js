import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import { PrimaryButton, PrimaryLoader } from '../components/MainComponent';
import Connection from '../connectivity/Connection';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

let Server = new Connection();

const MainScreen = ({ navigation }) => {

    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState([]);
    const [showNewUser, setShowNewUser] = useState('0');
    const [showloading, setShowLoading] = useState(false);

    useEffect(() => {
        getData();
    })

    useEffect(() => {
        getNewUser();
    }, [])

    const getNewUser = async () => {
        //Get new user
        try {
            const value = await AsyncStorage.getItem("NEW_USER");
            if (value !== null) {
                setShowNewUser('1')
                setNewUser(JSON.parse(value))

            }
        } catch (error) {
            // Error retrieving data
            console.log("NEW_USER error", error);
        }
    }

    const getData = async () => {

        //Get users
        await Server.getUsers().then(responseJson => {
            //console.log("getUsers", responseJson)
            setUsers(responseJson)
            setShowLoading(false)
        })

        if (showNewUser !== '1') {
            const value = await AsyncStorage.getItem("NEW_USER");
            if (value !== null) {
                setShowNewUser('1')
                setNewUser(JSON.parse(value))
            }
        }

    }

    const addNewUser = async () => {
        navigation.push("AddUser")
    }

    const viewUser = async (id, newUser) => {
        setShowLoading(true)
        navigation.push("User", { id: id, newUser: newUser })
    }

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={{ height: 100, backgroundColor: '#ffe45e', marginLeft: 0, justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', fontWeight: '700', fontSize: 16 }}>React Native Test App</Text>
            </SafeAreaView>
            <View style={{ flex: 6 }}>
                {showloading ?
                    <PrimaryLoader />
                    :
                    <ScrollView>
                        <View style={{ margin: 10, marginTop: 10 }}>
                            <Text style={{ fontSize: 14, color: 'gray' }}>Users</Text>
                            {showNewUser == '1' &&
                                <View>
                                    <TouchableOpacity onPress={() => viewUser(newUser.id, 1)}>
                                        <View style={{ marginTop: 10 }} >
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <AntDesign name="user" size={24} color="black" />
                                                <Text> {newUser.username}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <MaterialCommunityIcons name="email-outline" size={24} color="black" />
                                                <Text style={{ color: "#4d4d4d" }}> {newUser.email}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={{ width: '100%', height: 1, backgroundColor: "#bdc3c7", marginTop: 10 }} />
                                </View>
                            }
                            {users.map((items, index) => (
                                <View key={index}>
                                    <TouchableOpacity onPress={() => viewUser(items.id, 0)}>
                                        <View style={{ marginTop: 10 }} >
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <AntDesign name="user" size={24} color="black" />
                                                <Text> {items.username}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <MaterialCommunityIcons name="email-outline" size={24} color="black" />
                                                <Text style={{ color: "#4d4d4d" }}> {items.email}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={{ width: '100%', height: 1, backgroundColor: "#bdc3c7", marginTop: 10 }} />
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                }
            </View>
            <View style={{ flex: 1, padding: 10, marginTop: 10 }}>
                <PrimaryButton title='Add New User' onPress={() => addNewUser()} />
            </View>
        </View>
    )
}

export default MainScreen