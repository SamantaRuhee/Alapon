import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { AsyncStorage } from '@react-native-community/async-storage';
import { Card, Button, Text, Avatar, Input } from "react-native-elements";
import Messages from "../Components/Messages";
import HeaderHome from "../Components/HeaderHome";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { AuthContext } from "../Provider/AuthProvider";
import { useNetInfo } from "@react-native-community/netinfo";
import * as firebase from "firebase";
import "firebase/firestore";

const MessageScreen=()=> {
  const netinfo = useNetInfo();
  if (netinfo.type != "unknown" && !netinfo.isInternetReachable) {
    alert("No Internet!");
  }
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);


  const loadMessages = async () => {
    setLoading(true);
    firebase
      .firestore()
      .collection("messages")
      .orderBy("created_at", "desc")
      .onSnapshot((querySnapshot) => {
        let User = [];
        querySnapshot.forEach((doc) => {
          User.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setMessages(User);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert(error);
      });
  };

  useEffect(() => {
    loadMessages();
  }, []);


  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <HeaderHome
          />
          <FlatList
            data={messages}
            renderItem={({ item }) => {
              return (
                <Messages
                  author={item.data.author}
                  body={item.data.body}
                />
              );
            }}
          />
          <Card>
            <Input
              onChangeText={(currentText) => {
                setInput(currentText);
              }}
            />
            <Button
              title="send"
              onPress={function () {
                setLoading(true);
                firebase
                  .firestore().collection("messages").add({
                    userId: auth.CurrentUser.uid,
                    body: input,
                    author: auth.CurrentUser.displayName,
                    created_at: firebase.firestore.Timestamp.now(),
                  })
                  .then(() => {
                    setLoading(false);
                  })
                  .catch((error) => {
                    setLoading(false);
                    alert(error);
                  });
                  
              }}
            />
          </Card>
          <ActivityIndicator size="large" color="red" animating={loading} />

          
        </View>
      )}
    </AuthContext.Consumer>
  );
}
const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: "blue",
  },
  viewStyle: {
    flex: 1,
  },
});
export default MessageScreen; 