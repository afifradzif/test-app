import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import Connection from '../connectivity/Connection';
import { PrimaryLoader } from '../components/MainComponent';

let Server = new Connection();

const UserScreen = ({ route }) => {

    //Get the param
    const { id } = route.params;
    const [users, setUsers] = useState();
    const [showloading, setShowLoading] = useState(true);

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {

        //Get users
        await Server.getUser(id).then(responseJson => {
            //console.log("getUser", responseJson)
            setUsers(responseJson)
            setShowLoading(false)
        })

    }

    return (
        <View style={{ flex: 1 }}>
            {showloading ?
                <PrimaryLoader />
                :
                <ScrollView style={{ marginTop: 0, width: "100%" }}>
                    <View style={{ position: 'absolute', alignSelf: 'center', marginTop: 10, zIndex: 10 }}>
                        <Image
                            style={{ backgroundColor: '#4d4d4d', height: 100, width: 100, marginBottom: 5, borderColor: '#fff', borderWidth: 5, borderRadius: 50, alignSelf: 'center' }}
                            source={{ uri: 'https://i.pravatar.cc/300' }}
                        />
                    </View>
                    <View style={{ height: 50, marginTop: 50, borderTopRightRadius: 0, borderTopLeftRadius: 0 }} />
                    <View style={{ alignSelf: 'center', width: '100%' }}>
                        <Text style={{ fontSize: 16, alignSelf: 'center', color: "#000", marginTop: 20 }}>{users.name.toUpperCase()}</Text>
                    </View>
                    <View style={{ margin: 20 }}>
                        {/* <View style={{ marginBottom: 20 }}>
                            <Text style={{ color: 'gray' }}>Profile</Text>
                        </View> */}
                        <View>
                        <Text style={{ color: 'gray' }}>Username</Text>
                        <Text style={{ fontSize: 14, color: "#000", marginBottom: 5 }}>{users.username}</Text>
                        <Text style={{ color: 'gray', marginTop:10 }}>Email</Text>
                        <Text style={{ fontSize: 14, color: "#000", marginBottom: 10 }}>{users.email}</Text>
                        <Text style={{ color: 'gray', marginTop:10 }}>Address</Text>
                        <Text style={{ fontSize: 14, color: "#000"}}>{users.address.street}</Text>
                        <Text style={{ fontSize: 14, color: "#000"}}>{users.address.suite}</Text>
                        <Text style={{ fontSize: 14, color: "#000"}}>{users.address.city}</Text>
                        <Text style={{ fontSize: 14, color: "#000"}}>{users.address.zipcode}</Text>
                        <Text style={{ color: 'gray', marginTop:10 }}>Phone</Text>
                        <Text style={{ fontSize: 14, color: "#000", marginBottom: 10 }}>{users.phone}</Text>
                        <Text style={{ color: 'gray', marginTop:10 }}>Website</Text>
                        <Text style={{ fontSize: 14, color: "#000", marginBottom: 10 }}>{users.website}</Text>
                        <Text style={{ color: 'gray', marginTop:10 }}>Company</Text>
                        <Text style={{ fontSize: 14, color: "#000"}}>{users.company.name}</Text>
                        <Text style={{ fontSize: 14, color: "#000"}}>{users.company.catchPhrase}</Text>
                        <Text style={{ fontSize: 14, color: "#000"}}>{users.company.bs}</Text>
                        </View>
                    </View>
                </ScrollView>
            }
        </View>
    )
}

export default UserScreen