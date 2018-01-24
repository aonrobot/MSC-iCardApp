import React, { Component } from 'react';

import { StyleSheet, View, TextInput, TouchableOpacity, Text, ActivityIndicator, AsyncStorage, Alert} from 'react-native';

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

        if(username === '' ){ //|| password === ''
            alert('กรุณากรอก Username หรือ Password ก่อนครับ')
        }else{
            this.setState({isLoad : true})
            fetch('http://10.200.109.90:8000/api/ldap/checkAuth', {
                method: 'POST',
                timeout: 1,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username : username,
                    password : 'admin123' //password
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
                alert('กรุณาตรวจสอบการเชื่อมต่อ Internet')
                //alert(error)
            })
        }
    }
    render(){
        return (
            <View style={styles.container}>

                {
                    this.state.isLoad ?
                    
                    <ActivityIndicator size="large" color="#FFF"/>

                    :
                    <View>
                        <TextInput
                            placeholder="Username"
                            placeholderTextColor="rgba(0,0,0,0.2)"
                            underlineColorAndroid="rgba(255,255,255,0)"
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
                            style={styles.input}
                            secureTextEntry={true}
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
                
            </View>
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
    loginContainer: {
        backgroundColor: '#2980b9',
        paddingVertical: 15
    },
    loginButton: {
        textAlign: 'center',
        color: '#FFF'
    }
})