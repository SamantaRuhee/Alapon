import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { AuthContext } from "../Provider/AuthProvider";
import { useNetInfo } from "@react-native-community/netinfo";
import * as firebase from "firebase";
import "firebase/firestore";

const MessageScreen=()=> {
  const netinfo = useNetInfo();
  if (netinfo.type != "unknown" && !netinfo.isInternetReachable) {
    alert("No Internet!");
  }
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      _id: 0,
      text: 'New room created.',
      createdAt: new Date().getTime(),
      system: true
    },
    // example of chat message
    {
      _id: 1,
      text: 'Hello!',
      createdAt: new Date().getTime(),
      user: {
        _id: 2,
        name: 'Test User'
      }
    }
  ]);

  const loadPosts = async () => {
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
        setPosts(User);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert(error);
      });
  };

  useEffect(() => {
    loadPosts();
  }, []);

  // helper method that is sends a message
  function handleSend(newMessage = []) {
    setMessages(GiftedChat.append(messages, newMessage));
  }

  return (
    <AuthContext.Consumer>
      {(auth) => (
    <GiftedChat
      messages={messages}
      onSend={newMessage =>{
        handleSend(newMessage);
        setLoading(true);
        firebase
          .firestore().collection("messages").add({
            userId: auth.CurrentUser.uid,
            body: messages,
            author: auth.CurrentUser.displayName,
            created_at: firebase.firestore.Timestamp.now(),
          })
          .then(() => {
            setLoading(false);
            alert("Messages created Successfully!");
          })
          .catch((error) => {
            setLoading(false);
            alert(error);
          });
      }}
      user={{ _id: 1 }}
    />
    )}
    </AuthContext.Consumer>
  );
}
export default MessageScreen; 