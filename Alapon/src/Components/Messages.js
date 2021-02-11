import React from "react";
import { View } from "react-native";
import { Card, Button, Text, Avatar, Input } from "react-native-elements";

const Messages = (props) => {
  return (
      <View>
    <Text >
    {props.author}
    </Text>
    <Card>   
      <Text style={{paddingVertical: 10,}}>
        {props.body}
      </Text>
    </Card>
    </View>
  );
};

export default Messages;