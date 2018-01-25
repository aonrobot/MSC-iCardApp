import React, { Component } from 'react';

import { StyleSheet, View, TextInput, TouchableOpacity, Text, ActivityIndicator, AsyncStorage, Alert, KeyboardAvoidingView} from 'react-native';

import {Actions} from 'react-native-router-flux'

export default class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoad : false,
            username : '',
            password : ''
        }
    }

    _onPressLogin (){

        let username = this.state.username
        let password = this.state.password

        username = username.toLowerCase()

        if(username === '' || password === ''){
            alert('กรุณากรอก Username หรือ Password ก่อนครับ')
        }else{
            this.setState({isLoad : true})
            fetch('https://fora.metrosystems.co.th/icard/api/ldap/checkAuth', {
                method: 'POST',
                timeout: 1,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username : username,
                    password : password
                })
            })
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json()
            })
            .then(async(responseJSON)=>{
                this.setState({isLoad : false})
                let result = responseJSON.result
                if(result == true || result == 'true'){
                    await AsyncStorage.setItem('@userLogin', username)
                    await AsyncStorage.setItem('@isLogin', 'true')
                    Actions.mycard()
                }else{
                    alert('Username หรือ Password ผิดครับ')
                }
            })
            .catch((error) => {
                this.setState({isLoad : false})
                alert(error)
                //alert(error)
            })
        }
    }
    render(){
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>

                {
                    this.state.isLoad ?
                    
                    <ActivityIndicator size="large" color="#FFF"/>

                    :

                    <View style={styles.loginForm}>
                        <TextInput
                            placeholder="Username"
                            placeholderTextColor="rgba(0,0,0,0.2)"
                            underlineColorAndroid="rgba(255,255,255,0)"
                            returnKeyType="next"
                            onSubmitEditing={() => this.passwordInput.focus()}
                            autoCapitalize="none"
                            style={styles.input}
                            onChangeText={(text) => this.setState(
                                prevState => ({
                                    username : text
                                }
                            ))}
                        />
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor="rgba(0,0,0,0.2)"
                            underlineColorAndroid="rgba(255,255,255,0)"
                            returnKeyType="go"
                            style={styles.input}
                            secureTextEntry={true}
                            ref={(input) => this.passwordInput = input}
                            onChangeText={(text) => this.setState(
                                prevState => ({
                                    password : text
                                }
                            ))}
                        />

                        <TouchableOpacity style={styles.loginContainer} onPress={()=>{this._onPressLogin()}}>
                            <Text style={styles.loginButton}>LOGIN</Text>
                        </TouchableOpacity>
                    </View>
                }
                
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    input: {
        height: 40,
        width: 250,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 20,
        color: '#FFF',
        paddingHorizontal: 10
    },
    loginForm: {
        marginBottom : 50
    },
    loginContainer: {
        backgroundColor: '#2980b9',
        paddingVertical: 15
    },
    loginButton: {
        textAlign: 'center',
        color: '#FFF'
    }
})