import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, Switch } from 'react-native';
import { Input, Button, Card } from 'react-native-elements';
import { Entypo, } from '@expo/vector-icons';
import Loading from "./../Components/Loading";
import { AuthContext } from '../Provider/AuthProvider';
import * as firebase from 'firebase';
import 'firebase/firestore';


const SignInScreen = (props) => {

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    if (isLoading) {
        return <Loading />;
    } else {
        return (
            <AuthContext.Consumer>
                {(auth) => (<View style={Styles.viewstyle}>
                    <Card>
                        <Card.Title>Sign In</Card.Title>
                        <Card.Divider />
                        <Input
                            leftIcon={<Entypo name="mail-with-circle" size={24} color="black" />}
                            placeholder='E-mail Address'
                            onChangeText={function (currentInput) {
                                setEmail(currentInput);
                            }}
                        />
                        <Input
                            leftIcon={<Entypo name="lock" size={24} color="black" />}
                            placeholder='Password'
                            onChangeText={function (currentInput) {
                                setPassword(currentInput);
                            }}
                            secureTextEntry={true}
                        />
                        <Button
                            icon={<Entypo name="mobile" size={24} color="black" />}
                            title='SignIn'
                            type='clear'
                            onPress={() => {
                                setIsLoading(true);
                                firebase
                                    .auth()
                                    .signInWithEmailAndPassword(Email, Password)
                                    .then((userCreds) => {
                                        setIsLoading(false);
                                        auth.setIsLoggedIn(true);
                                        auth.setCurrentUser(userCreds.user);
                                    })
                                    .catch((error) => {
                                        setIsLoading(false);
                                        alert(error);
                                    });
                            }}
                        />
                        <Button
                            icon={<Entypo name="mobile" size={24} color="black" />}
                            title="Don't have an account?"
                            type='clear'
                            onPress={
                                function () {
                                    props.navigation.navigate("SignUp");
                                }}
                        />
                    </Card>
                </View>)}
            </AuthContext.Consumer>
        );
    }
};

const Styles = StyleSheet.create(
    {
        textStyle: {
            fontSize: 30,
            color: 'blue',
            alignContent: "center",
            alignSelf: "center",
        },
        viewstyle: {
            backgroundColor: '#33bbff',
            flex: 1,
            justifyContent: 'center',
        }
    }
);

export default SignInScreen;