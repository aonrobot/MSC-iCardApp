import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';

import {Actions} from 'react-native-router-flux'
export default class LayoutHeader extends Component {
  constructor(props){
    super(props)
    let title = this.props.title || 'iCard'
    let callFrom = this.props.page || '' 
    this.state = {title : title, callFrom : callFrom}
  }
  componentWillReceiveProps(nextProps){
    //alert(nextProps.title)
  }

  _backBtn(){
    Actions.pop()
  }

  render() {

    let backBtn
    
    if(this.state.callFrom === 'showcard' || this.state.callFrom === 'viewcard'){
      backBtn = <Button transparent onPress = {() => this._backBtn()}><Icon style={{color:'white'}} name='md-arrow-back' /></Button>
    }
    
    return (
        <Header style={{backgroundColor : "#1abc9c"}}>
          <StatusBar backgroundColor="#1abc9c"barStyle="light-content" />
            {backBtn}
            <Body>
              <Title style={{fontSize:19,color:"white"}}> {this.state.title}</Title>
            </Body>
        </Header>
    );
  }
}