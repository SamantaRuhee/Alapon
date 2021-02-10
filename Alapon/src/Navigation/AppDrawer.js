import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeTabScreen from "./../Navigation/HomeTab";

const AppDrawer = createDrawerNavigator();

const AppDrawerScreen = () => {
  return (
    <AppDrawer.Navigator>
      <AppDrawer.Screen name="Home" component={HomeTabScreen} />
    </AppDrawer.Navigator>
  );
};

export default AppDrawerScreen;