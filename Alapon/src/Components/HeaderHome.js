import React from "react";
import { Header } from "react-native-elements";
import * as firebase from "firebase";
import { AuthContext } from "../Provider/AuthProvider";
const HeaderHome = (props) => {
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <Header
          centerComponent={{ text: "YOUR DAILY DOSE OF NEWS", style: { color: "#fff" } }}
          
        />
      )}
    </AuthContext.Consumer>
  );
};

export default HeaderHome;