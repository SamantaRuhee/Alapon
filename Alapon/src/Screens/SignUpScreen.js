import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, Switch } from 'react-native';
import { Input, Button, Card } from 'react-native-elements';
import { Entypo, } from '@expo/vector-icons';
import Loading from "./../Components/Loading";
import * as firebase from 'firebase';
import 'firebase/firestore';

const SignUpScreen = (props) => {
    const [Name, setName] = useState("");
    const [SID, setSID] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    if (isLoading) {
        return <Loading />;
    } else {
        return (<View style={Styles.viewstyle}>
            <Card>
                <Card.Title>CARD WITH DIVIDER</Card.Title>
                <Card.Divider />
                <Input
                    leftIcon={<Entypo name="mail-with-circle" size={24} color="black" />}
                    placeholder='Name'
                    onChangeText={function (currentInput) {
                        setName(currentInput);
                    }}
                />
                <Input
                    leftIcon={<Entypo name="mobile" size={24} color="black" />}
                    placeholder='Student ID'
                    onChangeText={function (currentInput) {
                        setSID(currentInput);
                    }}
                />
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
                    title='Create Account'
                    type='clear'
                    onPress={() => {
                        if (Name && SID && Email && Password) {
                            setIsLoading(true);
                            firebase.auth()
                                .createUserWithEmailAndPassword(Email, Password)
                                .then((userCreds) => {
                                    userCreds.user.updateProfile({ displayName: Name });
                                    firebase.firestore().collection("users")
                                        .doc(userCreds.user.uid)
                                        .set({
                                            name: Name,
                                            sid: SID,
                                            email: Email,
                                        })
                                        .then(() => {
                                            setIsLoading(false);
                                            alert("Account created successfully!");
                                            console.log(userCreds.user);
                                            props.navigation.navigate("SignIn");
                                        })
                                        .catch((error) => {
                                            setIsLoading(false);
                                            alert(error);
                                        });
                                })
                                .catch((error) => {
                                    setIsLoading(false);
                                    alert(error);
                                });
                        } else {
                            alert("Fields can not be empty!");
                        }
                        props.navigation.navigate("SignIn");
                    }}
                />
                <Button
                    icon={<Entypo name="mobile" size={24} color="black" />}
                    title="Already have an account?"
                    type='clear'
                    onPress={
                        function () {
                            props.navigation.navigate("SignIn");
                        }}
                />
            </Card>
        </View>
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
            backgroundColor: '#FFDF00',
            flex: 1,
            justifyContent: 'center',
        }
    }
);

export default SignUpScreen;