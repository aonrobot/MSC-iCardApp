import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, Image, View, Alert, Linking } from 'react-native';
import { Container, Header, Content,
     Button, Text, Icon, Form, Item,
     Label, Input, List, Card, CardItem,
     Left, Right, Body, Thumbnail} from 'native-base';

import LayoutHeader from '../layout/LayoutHeader'
import LayoutFooter from '../layout/LayoutFooter'

import {Actions} from 'react-native-router-flux'

export default class ViewCard extends Component {
  constructor(props){
      super(props)
      this.state = {
        headerTiile : 'View Card',
        headerPage : 'viewcard',
        
        qrImageUrl : 'not have image'
      }
  }

  _onPressDeleteBtn (){
    this._deleteCard()
  }
  
  _onPressOpenLinkBtn(url){
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  }

  async _deleteCard() {

    let username = this.props.userLogin
    let cardId = this.props.cardId

    /*et cards = this.state.cards
    cards.all.splice(this.props.cardId, 1)
    console.log('deleteCard', cards)
    
    await AsyncStorage.setItem('@cards', JSON.stringify(cards))*/

    Alert.alert(
      'คุณแน่ใจนะว่าต้องการ ลบ card นี้',
      'กดปุ่ม Ok เพื่อลบ card',
      [
        {text: 'Cancel', onPress: () => false, style: 'cancel'},
        {text: 'OK', onPress: () => {
          
          fetch('https://fora.metrosystems.co.th/icard/api/card/delete', {
              method: 'POST',
              timeout: 1,
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  username : username,
                  cardId : cardId
              })
          })
          .then((response) => {
              return response.json()
          })
          .then(async(responseJSON)=>{
              let result = responseJSON.result
              if(result == true || result == 'true'){
                  Actions.mycard({currentFooterMenu : 'mycard'})
              }
          })
          .catch((error) => {
              alert('ไม่สามารถลบ card ได้ กรุณาตรวจสอบการเชื่อมต่อ Internet')
          })

        }},
      ], { cancelable: false }
    )

  }

  /*async _updateList () {
    
    let result = await AsyncStorage.getItem('@cards');
    let getCards = await JSON.parse(result) || {all : []}
    this.setState({cards : getCards})

    console.log('card at index 0', getCards.all[this.props.cardId])
    let card = getCards.all[this.props.cardId]
    this.setState({qrImageUrl : card.qrImageUrl})
    
    //this._changeTextInputValue('')

  }*/

  _getCard() {
    fetch('https://fora.metrosystems.co.th/icard/api/card/' + this.props.cardId, {
        method: 'GET'
    })
    .then((response) => {
        return response.json()
    })
    .then(async(responseJSON)=>{
        
        let result = responseJSON.result
        let data = responseJSON.data[0]
        if(result == true || result == 'true'){          
          this.setState({
            qrImageUrl : data.qrcode_url,
            headerTiile : data.nameEN + ' ' + data.lastnameEN
          })
        }
    })
    .catch((error) => {
        alert('ไม่สามารถดึงข้อมมูล card มาได้ กรุณาตรวจสอบการเชื่อมต่อ Internet')
    })
  }

  componentWillMount(){
    this._getCard()
  }

  render() {
    return (
    <Container>
      <LayoutHeader title={this.state.headerTiile} page={this.state.headerPage}/>

      <Content style={styles.container}>
        <Text style={styles.title}><Icon name="md-card" style={styles.titleIcon} />   นี่คือ QR Code Card ของคุณ</Text>
        <View style={styles.btnWrapper}>
          <Button style={styles.btn} rounded iconLeft info onPress={() => this._onPressOpenLinkBtn('https://fora.metrosystems.co.th/icard/card/' + this.props.cardId)}>
            <Icon name='md-information-circle' />
            <Text>ดู Business Card ของคุณ</Text>
          </Button>
          <Button style={styles.btn} rounded iconLeft danger onPress={() => this._onPressDeleteBtn()}>
            <Icon name='md-trash' />
            <Text>ลบ</Text>
          </Button>
        </View>
        <View style={styles.qrWrapper}>
          <Image source={{uri: this.state.qrImageUrl}}
                  style={{width: 350, height: 350}} />
        </View>
      </Content>

      <LayoutFooter/>
    </Container>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    backgroundColor : '#EEE',
    paddingTop : 15,
    paddingBottom: 15
  },
  title : {
    paddingBottom : 20,
    paddingLeft : 15,
    fontSize : 16
  },
  qrWrapper : {
    flex : 1,
    paddingBottom : 30,
    flexDirection : 'row',
    justifyContent : 'center',
    padding : 10
  },
  btn : {
    marginRight : 8
  },
  btnWrapper : {
    paddingTop : 15,
    paddingBottom : 10,
    paddingRight : 15,
    flex : 1,
    flexDirection: 'row',
    justifyContent : 'flex-end'
  }
})