import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, ActivityIndicator, AsyncStorage, Alert } from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body, Button, Icon, Title, H1, H3 } from 'native-base';

import LayoutHeader from '../layout/LayoutHeader'
import LayoutFooter from '../layout/LayoutFooter'

import {Actions} from 'react-native-router-flux'

export default class Profile extends Component {

  constructor(props){
    super(props)
    this.state = {
        headerTiile : 'Profile',
        userName : ''

    }
  }

    async _onPressLogout(){

      Alert.alert(
        'คุณแน่ใจนะว่าต้องการจะออกจากระบบ',
        'กดปุ่ม Ok เพื่อออกจากระบบ',
        [
          {text: 'Cancel', onPress: () => false, style: 'cancel'},
          {text: 'OK', onPress: () => {
            AsyncStorage.setItem('@userLogin', '')
            AsyncStorage.setItem('@isLogin', 'false')
            AsyncStorage.setItem('@userInfo', '')
            Actions.state.index = 0
            Actions.splash()
          }},
        ],
        { cancelable: false }
      )
    }

    async _checkLogin(){
      let isLogin = await AsyncStorage.getItem('@isLogin')
      let userLogin = await AsyncStorage.getItem('@userLogin')
      if(isLogin == 'false' || isLogin === false){
        alert("Don't login please login first!!")
        Actions.state.index = 0
        Actions.splash()
      }
    }

    async _onLoad(){
      let userInfo = await AsyncStorage.getItem('@userInfo')
      userInfo = await JSON.parse(userInfo)
      this.setState({
        userName : userInfo[0].FullNameEng
      })
    }

    componentWillMount(){
      this._onLoad()
    }
    componentDidMount(){
      this._checkLogin()
    }

    render() {
      return (
        <Container style={styles.container}>
            <LayoutHeader title={this.state.headerTiile}/>
            <View style={styles.avatarWrapper}>
              <Thumbnail square large source={{uri: 'https://fora.metrosystems.co.th/icard/images/unknowAvatar.png'}} />
            </View>
            <Content style={styles.infoContent}>
              <H1 style={styles.infoTitle}>Name</H1>
              <H3 style={styles.infoData}>{this.state.userName}</H3>                
            </Content>
            <View style={styles.viewBtnWrapper}>
              <TouchableOpacity style={styles.logoutContainer} onPress={()=>{this._onPressLogout()}}>
                  <Text style={styles.logoutButton}>LOGOUT</Text>
              </TouchableOpacity>
            </View>
            <LayoutFooter/>
        </Container>
      )
    }
}

const styles = StyleSheet.create({
  container : {
      backgroundColor : '#FFF'
  },
  avatarWrapper : {
    flex : 1,
    flexDirection : 'row',
    justifyContent : 'center',
    marginTop : 100
  },
  avatar : {
      width: 100,
      height:100
  },
  infoContent : {
    backgroundColor: '#FFF',
    paddingLeft: 30
  },
  infoTitle : {
    color: '#BDC3C7'
  },
  infoData : {
    color: '#2c3e50'    
  },
  viewBtnWrapper : {
    backgroundColor : '#FFF',
    flex : 1,
    alignItems : 'center'
  },
  logoutContainer: {
    backgroundColor: '#e74c3c',
    paddingVertical: 15,
    width: 250,
    marginBottom: 70
  },
  logoutButton: {
      textAlign: 'center',
      color: '#FFF'
  }
})