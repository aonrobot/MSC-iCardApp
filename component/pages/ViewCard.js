import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, Image, View, Alert } from 'react-native';
import { Container, Header, Content,
     Button, Text, Icon, Form, Item,
     Label, Input, List, Card, CardItem,
     Left, Right, Body, Thumbnail} from 'native-base';

import LayoutHeader from '../layout/LayoutHeader'

import {Actions} from 'react-native-router-flux'

export default class ViewCard extends Component {
  constructor(props){
      super(props)
      this.state = {
        headerTiile : this.props.fullName,
        headerPage : 'viewcard',
        cards : {all : []},
        qrImageUrl : ''
      }
  }

  _onPressDeleteBtn (){
    this._deleteCard()
  }

  async _deleteCard() {

    let cards = this.state.cards
    cards.all.splice(this.props.cardId, 1)
    console.log('deleteCard', cards)
    
    await AsyncStorage.setItem('@cards', JSON.stringify(cards))

    Actions.mycard({currentFooterMenu : 'mycard'})
  }

  async _updateList () {
    
    let result = await AsyncStorage.getItem('@cards');
    let getCards = await JSON.parse(result) || {all : []}
    this.setState({cards : getCards})

    console.log('card at index 0', getCards.all[this.props.cardId])
    let card = getCards.all[this.props.cardId]
    this.setState({qrImageUrl : card.qrImageUrl})
    
    //this._changeTextInputValue('')

  }

  componentWillMount(){
    this._updateList()
  }

  render() {
    return (
    <Container>
      <LayoutHeader title={this.state.headerTiile} page={this.state.headerPage}/>
      <Content style={styles.container}>
        <Text style={styles.title}><Icon name="md-card" style={styles.titleIcon} />   นี่คือ E-Business Card ของคุณ</Text>
        <View style={styles.qrWrapper}>
          <Image source={{uri: this.state.qrImageUrl}}
                  style={{width: 370, height: 370}} />
        </View>
        <View style={styles.btnWrapper}>
          <Button rounded iconLeft danger onPress={() => this._onPressDeleteBtn()}>
            <Icon name='md-trash' />
            <Text>ลบ</Text>
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