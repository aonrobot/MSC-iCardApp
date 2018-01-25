import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, Image, View, Alert, Platform } from 'react-native';
import { Container, Header, Content,
     Button, Text, Icon, Form, Item,
     Label, Input, List, Card, CardItem,
     Left, Right, Body, Thumbnail} from 'native-base';

import LayoutHeader from '../../layout/LayoutHeader'
import LayoutFooter from '../../layout/LayoutFooter'

import {Actions} from 'react-native-router-flux'



export default class ShowCard extends Component {
  constructor(props){
      super(props)
      this.state = {
        headerTiile : 'E-Business Card ของคุณ',
        headerPage : 'showcard',

        cards : [],

        nameTH : this.props.info.nameTH,
        lastnameTH : this.props.info.lastnameTH,
        nameEN : this.props.info.nameEN,
        lastnameEN : this.props.info.lastnameEN,
        position : this.props.info.position,
        department : this.props.info.department,
        contactTel : this.props.info.contactTel,
        contactDir : this.props.info.contactDir,
        contactFax : this.props.info.contactFax,
        email : this.props.info.email,
        company :  this.props.info.company,
        avatar : this.props.info.avatar,
        qrImageUrl : "uri",
      }

  }

  _onPressSuccessBtn (){
    this._addCard()
  }

  async _addCard() {
    /*let readCard = await AsyncStorage.getItem('@cards');
    let cards = JSON.parse(readCard) || {all : []}

    cards.all.push(
      {
        nameTH : this.props.info.nameTH,
        lastnameTH : this.props.info.lastnameTH,
        nameEN : this.props.info.nameEN,
        lastnameEN : this.props.info.lastnameEN,
        position : this.props.info.position,
        department : this.props.info.department,
        contactTel : this.props.info.contactTel,
        contactDir : this.props.info.contactDir,
        contactFax : this.props.info.contactFax,
        email : this.props.info.email,
        company :  this.props.info.company,
        avatar : this.state.qrImageUrl, // Will Change in feature change to real avatar
        qrImageUrl : this.state.qrImageUrl
      }
    )

    await AsyncStorage.setItem('@cards', JSON.stringify(cards))*/

    let userInfo = await AsyncStorage.getItem('@userInfo')
    userInfo = await JSON.parse(userInfo)[0]

    fetch('https://fora.metrosystems.co.th/icard/api/card/create', {
        method: 'POST',
        timeout: 1,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            u : userInfo.Login.toLowerCase(),
            c : this.props.info.company,
            nT : this.props.info.nameTH,
            lT : this.props.info.lastnameTH,
            nE : this.props.info.nameEN,
            lE : this.props.info.lastnameEN,
            p : this.props.info.position,
            d : this.props.info.department,
            cT : this.props.info.contactTel,
            cD : this.props.info.contactDir,
            cF : this.props.info.contactFax,
            e : this.props.info.email
        })
    })
    .then((response) => {
        return response.json()
    })
    .then(async(responseJSON)=>{
        let result = responseJSON.result
        if(result == true || result == 'true'){
            Actions.mycard()
        }
    })
    .catch((error) => {
        alert('ไม่สามารถบันทึก card ได้ในขนาดนี้ กรุณาตรวจสอบการเชื่อมต่อ Internet')
    })

  }

  async genQr(){
    
    /*let questionMark = '%3F'
    let ampersand = '%26'

    if(Platform.OS == 'ios' || Platform.OS == 'android'){
      questionMark = '?'
      ampersand = '&'
    }*/

    /*let para = questionMark + 'nTH=' + this.state.nameTH +
               ampersand + 'lnTH=' + this.state.lastnameTH  +
               ampersand + 'nEN=' + this.state.nameEN  +
               ampersand + 'lnEN=' + this.state.lastnameEN +
               ampersand + 'pos=' + this.state.position +
               ampersand + 'tel=' + this.state.contactTel +
               ampersand + 'dir=' + this.state.contactDir +
               ampersand + 'fax=' + this.state.contactFax +
               ampersand + 'email=' + this.state.email +
               ampersand + 'd=' + this.state.department*/

    

    fetch('https://fora.metrosystems.co.th/icard/api/card/nextId', {method: 'GET'})
    .then((response) => {
        return response.json()
    })
    .then(async(responseJSON)=>{
        let result = responseJSON.result
        let data = responseJSON.data

        let lastCardId = 0
        let CARD_url = ''
        if(result == true || result == 'true'){                
          lastCardId = data.CARD_id
          CARD_url = data.CARD_url
        }

        let src = "https://chart.googleapis.com/chart?cht=qr&chs=350x350&chl=" + CARD_url +"&choe=UTF-8"

        this.setState({qrImageUrl : src})
    })
    .catch((error) => {
        alert('ไม่สามารถติดต่อ Server ได้')
        Actions.mycard()
    })

  }

  componentWillMount() {
    this.genQr()
  }

  render() {
    return (
    <Container>
      <LayoutHeader title={this.state.headerTiile} page={this.state.headerPage} />
      <Content style={styles.container}>
        {/*<Text style={styles.title}><Icon name="md-card" style={styles.titleIcon} />   นี่คือ E-Business Card ของคุณ</Text>*/}
        <View style={styles.qrWrapper}>
          <Image source={{uri: this.state.qrImageUrl}}
                  style={{width: 350, height: 350}} />
        </View>
        <View style={styles.btnWrapper}>
          <Button rounded iconLeft success onPress={() => this._onPressSuccessBtn()}>
            <Icon name='md-checkmark-circle' />
            <Text>Save E-Business ของฉัน</Text>
          </Button>
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
    flexDirection : 'row',
    justifyContent : 'center',
    padding : 10
  },
  btnWrapper : {
    paddingTop : 25,
    paddingBottom : 40,
    paddingRight : 15,
    flex : 1,
    flexDirection: 'row',
    justifyContent : 'flex-end'
  }
})