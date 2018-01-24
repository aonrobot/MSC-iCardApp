import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  AsyncStorage
} from 'react-native';

import { Container, Header, Content, Button, Text, Icon, Form, Item, Label, Input } from 'native-base';

import {Actions} from 'react-native-router-flux'

import LoginForm from './component/forms/Login';

export default class Splash extends Component {

    constructor(props){
        super(props)
    }

    async _checkLogin(){
        let isLogin = await AsyncStorage.getItem('@isLogin')
        if(isLogin == 'true' || isLogin === true){
            Actions.mycard()
        }
    }

    componentWillMount(){
        this._checkLogin()
    }

    render() {
      return (
        
        <Container style={styles.container}>
            <StatusBar
                backgroundColor="#1abc9c"
                barStyle="light-content"
            />
            <View style={styles.titleContainer}>
                <Text style={styles.title}>iCard</Text>
                <Text style={styles.subtitle}>Powered By MSC</Text>                        
                {/*<Button rounded info onPress={() => Actions.mycard()}>
                    <Text><Icon ios='ios-home' android="md-home" style={styles.icon}/> เริ่มใช้งาน</Text>
                </Button>*/}
            </View>

            <View style={styles.formContainer}>
                <LoginForm />
            </View>
            
        </Container>
      )
    }
}

const styles = StyleSheet.create({
    container : {
        backgroundColor : '#1abc9c',
        flex : 1,
        alignItems : 'center'
    },
    titleContainer :{
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    },
    formContainer :{
    },
    title : {
        color : '#ecf0f1',
        fontSize : 64,
    },
    buttonContainer : {
        paddingTop : 20
    },
    subtitle : {
        color : '#ecf0f1',
        fontWeight : '100',
        fontSize : 16,
        paddingBottom : 20
    },
    icon :{
        fontSize: 20,
        color: 'white'
    }
})
