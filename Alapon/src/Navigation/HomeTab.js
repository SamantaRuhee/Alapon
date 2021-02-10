import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Entypo, AntDesign, Ionicons } from "@expo/vector-icons";
import HomeScreen from "./../Screens/HomeScreen";
import ProfileScreen from "./../Screens/ProfileScreen";
import MessageScreen from "./../Screens/MessageScreen";

const HomeTab = createMaterialBottomTabNavigator();

const HomeTabScreen = () => {
  return (
    <HomeTab.Navigator initialRouteName="Home">
      <HomeTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" color="white" size={26} />
            ) : (
              <AntDesign name="home" color="white" size={22} />
            ),
        }}
      />
      <HomeTab.Screen
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" color="white" size={26} />
            ) : (
              <AntDesign name="home" color="white" size={22} />
            ),
        }}
      />
      <HomeTab.Screen
        name="Adda" 
        component={MessageScreen}
        options={{
          tabBarLabel: "Adda",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" color="white" size={26} />
            ) : (
              <AntDesign name="home" color="white" size={22} />
            ),
        }}
      />
    </HomeTab.Navigator>
  );
};

export default HomeTabScreen;