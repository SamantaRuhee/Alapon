import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeTabScreen from "./../Navigation/HomeTab";
import ProfileScreen from "./../Screens/ProfileScreen";
import PostStackScreen from "../Navigation/PostStack";

const AppDrawer = createDrawerNavigator();

const AppDrawerScreen = () => {
  return (
    <AppDrawer.Navigator>
      <AppDrawer.Screen name="Home" component={HomeTabScreen} />
      <AppDrawer.Screen name="Profile" component={ProfileScreen} />
      <AppDrawer.Screen name="Post" component={PostStackScreen}/>
    </AppDrawer.Navigator>
  );
};

export default AppDrawerScreen;