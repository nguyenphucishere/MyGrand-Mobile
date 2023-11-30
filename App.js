import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Mainhome from './screens/Mainhome';
import Profile from './screens/Profile';


const Tab = createBottomTabNavigator();

class HomeScreen extends React.Component {

  render() {
    //const { navigate } = this.props.navigation;
    return (
      // <View style={styles.container}>
      //   <Text>Open up App.js to start working on your app!</Text>
      //   <Button
      //     title="Go to Main Home"
      //     onPress={() => navigate('Mainhome')}
      //   />
      // </View>
      <NavigationContainer>
        <Tab.Navigator


          screenOptions={({ route }) => ({
            tabBarActiveTintColor: "#235C25",
            tabBarInactiveTintColor: "gray",
            tabBarStyle: [
              {
                "display": "flex"
              },
              null
            ],
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {

              let iconName;
              if (route.name === 'Home') {

                iconName = focused ? 'home' : 'home-outline';

              } else if (route.name === 'Profile') {

                iconName = focused ? 'person' : 'person-outline';

              }
              return <Ionicons name={iconName} size={size} color={color} />;

            },

          })}
        >

          <Tab.Screen name="Home" component={Mainhome} />
          <Tab.Screen name="Profile" component={Profile} /> 
        </Tab.Navigator>

      </NavigationContainer>
    );
  }
}

// const AppNavigator = createStackNavigator(
//   {
//     Home: {
//       screen: HomeScreen,
//       navigationOptions: {
//         headerShown: false, // Ẩn thanh tiêu đề cho màn hình Home
//       },
//     },
//     Mainhome: {
//       screen: Mainhome,
//       navigationOptions: {
//         headerShown: false, // Ẩn thanh tiêu đề cho màn hình Mainhome
//       },
//     },
//   },
//   {
//     initialRouteName: 'Home',
//   }
// );

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
