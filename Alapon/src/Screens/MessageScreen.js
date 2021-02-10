import React, { useState, useEffect } from "react";
import { View, StyleSheet, AsyncStorage, Image, Platform } from "react-native";
import { Text, Card, Button, Avatar, Header } from "react-native-elements";
import HeaderHome from "../Components/HeaderHome";

const MessageScreen = (props) => {
  
    return (
          <View style={styles.viewStyle}>
            <HeaderHome
              DrawerFunction={() => {
              }}
            />
          </View>
    );
  };
  
  const styles = StyleSheet.create({
    textStyle: {
      fontSize: 20,
      alignContent: "center",
    },
    viewStyle: {
      flex: 1,
    },
  });
  
  export default MessageScreen;