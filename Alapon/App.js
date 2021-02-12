import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStackScreen from "./src/Navigation/AuthStack";
import HomeTabScreen from "./src/Navigation/HomeTab";
import { AuthContext, AuthProvider } from "./src/Provider/AuthProvider";
import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCKPd83d-J4uVuiZLXpGtbMIBl9UguzHZc",
    authDomain: "alapon-b60a4.firebaseapp.com",
    projectId: "alapon-b60a4",
    storageBucket: "alapon-b60a4.appspot.com",
    messagingSenderId: "928228571658",
    appId: "1:928228571658:web:be2366b7158714c3ab3df3"
  };

if(!firebase.apps.length){
firebase.initializeApp(firebaseConfig);}


function App() {
  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {(auth) => (
          <NavigationContainer>
            {auth.IsLoggedIn ? <HomeTabScreen /> : <AuthStackScreen />}
          </NavigationContainer>
        )}
      </AuthContext.Consumer>
    </AuthProvider>
  );
}

export default App;