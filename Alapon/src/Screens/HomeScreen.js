import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator, AsyncStorage } from "react-native";
import { Card, Button, Text, Avatar, Input } from "react-native-elements";
import PostCard from "./../Components/PostCard";
import HeaderHome from "../Components/HeaderHome";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { AuthContext } from "../Provider/AuthProvider";
import { useNetInfo } from "@react-native-community/netinfo";
import * as firebase from "firebase";
import "firebase/firestore";

const HomeScreen = (props) => {
  const netinfo = useNetInfo();
  if (netinfo.type != "unknown" && !netinfo.isInternetReachable) {
    alert("No Internet!");
  }
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);


  const loadPosts = async () => {
    setLoading(true);
    firebase
      .firestore()
      .collection("posts")
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


  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <HeaderHome
            DrawerFunction={() => {
              props.navigation.toggleDrawer();
            }}
          />
          <Card>
            <Input
              placeholder="What's On Your Mind?"
              leftIcon={<Entypo name="pencil" size={24} color="black" />}
              onChangeText={(currentText) => {
                setInput(currentText);
              }}
            />
            <Button
              title="Post"
              type="outline"
              onPress={function () {
                setLoading(true);
                firebase
                  .firestore().collection("posts").add({
                    userId: auth.CurrentUser.uid,
                    body: input,
                    author: auth.CurrentUser.displayName,
                    created_at: firebase.firestore.Timestamp.now(),
                    likes: [],
                    comments: [],
                  })
                  .then(() => {
                    setLoading(false);
                    alert("Post created Successfully!");
                  })
                  .catch((error) => {
                    setLoading(false);
                    alert(error);
                  });
              }}
            />
          </Card>
          <ActivityIndicator size="large" color="red" animating={loading} />

          <FlatList
            data={posts}
            renderItem={({ item }) => {
              return (
                <PostCard
                  author={item.data.author}
                  title={item.data.id}
                  body={item.data.body}
                  commentCount={item.commentCount}
                  likeCount={item.likeCount}
                  navigation={props.navigation}
                />
              );
            }}
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

export default HomeScreen;