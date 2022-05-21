import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import { PrimaryButton } from '../components/MainComponent';
import Connection from '../connectivity/Connection';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

let Server = new Connection();

const MainScreen = ({ navigation }) => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {

        //Get users
        await Server.getUsers().then(responseJson => {
            //console.log("getUsers", responseJson)
            setUsers(responseJson)
        })

    }

    const addNewUser = async () => {
        navigation.push("AddUser")
    }

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={{ height: 100, backgroundColor: '#ffe45e', marginLeft: 0, justifyContent:'center' }}>
                <Text style={{ textAlign: 'center', fontWeight: '700', fontSize: 16 }}>React Native Test App</Text>
            </SafeAreaView>
            <View style={{ flex: 6 }}>
                <ScrollView>
                    <View style={{ margin: 10, marginTop: 10 }}>
                        <Text style={{ fontSize: 14, color: 'gray' }}>Users</Text>
                        {users.map((items, index) => (
                            <>
                                <TouchableOpacity onPress={() => {navigation.push("User",{id:items.id}) }}>
                                    <View style={{ marginTop: 10 }} key={index} >
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
                            </>
                        ))}
                    </View>
                </ScrollView>
            </View>
            <View style={{ flex: 1, padding: 10, marginTop: 10 }}>
                <PrimaryButton title='Add New User' onPress={() => addNewUser()} />
            </View>
        </View>
    )
}

export default MainScreen