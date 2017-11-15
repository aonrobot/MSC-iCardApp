import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, Image, View, Alert, Platform } from 'react-native';
import { Container, Header, Content,
     Button, Text, Icon, Form, Item,
     Label, Input, List, Card, CardItem,
     Left, Right, Body, Thumbnail} from 'native-base';

import LayoutHeader from '../../layout/LayoutHeader'

import {Actions} from 'react-native-router-flux'



export default class ShowCard extends Component {
  constructor(props){
      super(props)
      this.state = {
        headerTiile : 'นี่คือ E-Business Card ของคุณ',
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
        qrImageUrl : "",
      }

  }

  _onPressSuccessBtn (){
    this._addCard()
  }

  async _addCard() {
    let readCard = await AsyncStorage.getItem('@cards');
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

    await AsyncStorage.setItem('@cards', JSON.stringify(cards))

    Actions.mycard({currentFooterMenu : 'mycard'})
  }

  async genQr(){
    let genCardUrl = 'http://mis_test.metrosystems.co.th/qrlab/business_card/genCard.php';
    
    let questionMark = '%3F'
    let ampersand = '%26'

    if(Platform.OS === 'ios'){
      questionMark = '?'
      ampersand = '&'
    }

    let para = questionMark + 'nTH=' + this.state.nameTH +
               ampersand + 'lnTH=' + this.state.lastnameTH  +
               ampersand + 'nEN=' + this.state.nameEN  +
               ampersand + 'lnEN=' + this.state.lastnameEN +
               ampersand + 'pos=' + this.state.position +
               ampersand + 'tel=' + this.state.contactTel +
               ampersand + 'dir=' + this.state.contactDir +
               ampersand + 'fax=' + this.state.contactFax +
               ampersand + 'email=' + this.state.email +
               ampersand + 'd=' + this.state.department
    let src = "https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=" + genCardUrl + para + "&choe=UTF-8"
    await this.setState({qrImageUrl : src})
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
                  style={{width: 380, height: 380}} />
        </View>
        <View style={styles.btnWrapper}>
          <Button rounded iconLeft success onPress={() => this._onPressSuccessBtn()}>
            <Icon name='md-checkmark-circle' />
            <Text>Save E-Business ของฉัน</Text>
          </Button>
        </View>
      </Content>
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
    justifyContent : 'center'
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