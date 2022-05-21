import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Screens
import MainScreen from '../screens/MainScreen';
import UserScreen from '../screens/UserScreen';
import AddUserScreen from '../screens/AddUserScreen';

export default function AppNavigator() {

    //Main Stack
    const Stack = createStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator>

                <Stack.Screen name="Main" component={MainScreen} options={{ title:'Home', headerShown: false, gestureEnabled: false }} />
                <Stack.Screen name="User" component={UserScreen} options={{ title:'User Details', gestureEnabled: false }} />
                <Stack.Screen name="AddUser" component={AddUserScreen} options={{ title: 'Add New User', gestureEnabled: false }} />

            </Stack.Navigator>
        </NavigationContainer>
    );

}