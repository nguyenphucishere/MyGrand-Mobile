import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Mainhome from '../Mainhome';


const Stack = createStackNavigator();
const BottomNavBar = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>

                <Stack.Screen name="Home" component={App} />
            </Stack.Navigator>

        </NavigationContainer>
    );
}


const styles = StyleSheet.create({
    navbar: {
        height: 50,
        backgroundColor: 'blue',
        position: 'absolute',
        bottom: 0,
    }
})

export default BottomNavBar;