import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, Image, View, Alert } from 'react-native';
import { Container, Header, Content,
     Button, Text, Icon, Form, Item,
     Label, Input, List, Card, CardItem,
     Left, Right, Body, Thumbnail} from 'native-base';
import {Actions} from 'react-native-router-flux'



export default class ShowCard extends Component {
  constructor(props){
      super(props)
      this.state = {
        headerTiile : 'iCard',

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
    console.log('cards', cards.all)
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
        avatar : this.props.info.avatar,
        qrImageUrl : this.state.qrImageUrl
      }
    )
    console.log('addCard', cards)
    await AsyncStorage.setItem('@cards', JSON.stringify(cards))

    let allKey = await AsyncStorage.getAllKeys()
    console.log('allKey', allKey)
    Actions.mycard({currentFooterMenu : 'mycard'})
  }

  async genQr(){
    let genCardUrl = 'http://mis_test.metrosystems.co.th/qrlab/business_card/genCard.php';
    let para = '%3FnTH=' + this.state.nameTH +
               '%26lnTH=' + this.state.lastnameTH  +
               '%26nEN=' + this.state.nameEN  +
               '%26lnEN=' + this.state.lastnameEN +
               '%26pos=' + this.state.position +
               '%26tel=' + this.state.contactTel +
               '%26dir=' + this.state.contactDir +
               '%26fax=' + this.state.contactFax +
               '%26email=' + this.state.email +
               '%26d=' + this.state.department
    let src = "https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=" + genCardUrl + para + "&choe=UTF-8"
    await this.setState({qrImageUrl : src})
  }

  componentWillMount() {
    this.genQr()
  }

  render() {
    return (
    <Container>
      <Content style={styles.container}>
        <Text style={styles.title}><Icon name="md-card" style={styles.titleIcon} />   นี่คือ E-Business Card ของคุณ</Text>
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