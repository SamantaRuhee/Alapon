import React, { useState } from "react";
import { View, StyleSheet, AsyncStorage } from "react-native";
import { Text, Card, Button, Avatar, Header } from "react-native-elements";
import { AuthContext } from "../Provider/AuthProvider";
import LikeNotificationCard from "./../Components/LikeNotificationCard";
import HeaderHome from "../Components/HeaderHome";
import * as firebase from "firebase";
import "firebase/firestore";

const NotificationScreen = (props) => {
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <HeaderHome
            DrawerFunction={() => {
              props.navigation.toggleDrawer();
            }}
          />
          <LikeNotificationCard
                  author={auth.CurrentUser.displayName}
                />
        </View>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: "blue",
  },
  viewStyle: {
    flex: 1,
  },
});

export default NotificationScreen;