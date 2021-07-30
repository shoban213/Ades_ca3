/* 
Name : Shoban Raj
Admin Num : p1909407
Class : DIT/FT/1B/04
*/

import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

import SelectGameScreen from './pages/selectGame';
import GameInfoScreen from './pages/gameInfo';



const Stack = createStackNavigator()

class StackNavigator extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="selectGame" screenOptions={{ headerShown: false}}>
                    <Stack.Screen name="selectGame" component={SelectGameScreen} />
                    <Stack.Screen name="gameInfo" component={GameInfoScreen} />

               
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}
export default StackNavigator