import React, { useState, useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StatusBar,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Modal,
    TextInput,
    ScrollView,
    ActivityIndicator,
    SafeAreaView
} from "react-native";

const PrimaryButton = (props) => {
    return (
        <View>
            <TouchableOpacity style={[{ marginTop: 10, width:'100%', height: 50, backgroundColor: '#00aae0', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }, props.style]} onPress={props.onPress}>
                <Text style={{ fontSize: 14, color: "#fff" }}>{props.title}</Text>
            </TouchableOpacity>
        </View>
    )
}


const PrimaryLoader = (props) => {
    return (
        <View style={{ height: '80%', justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator />
            <Text>Loading..</Text>
        </View>
    )
}

export { 
    PrimaryButton, PrimaryLoader
};