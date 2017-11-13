import React, { Component } from 'react';
import { KeyboardAvoidingView, Keyboard } from 'react-native'
import {Actions} from 'react-native-router-flux'
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';

export default class LayoutFooter extends Component {
  constructor(props) {
      super(props)
      this.state = {current : ''}
  }

  componentWillReceiveProps(nextProps){
    this.footerMenu(nextProps.current)
  }

  footerMenu(menu){
    switch(menu){
      case 'mycard' :
        this.setState({current : 'mycard'})
        Actions.mycard()
      break;
      case 'newcard' :
        this.setState({current : 'newcard'})
        Actions.newcard()
      break;
    }
  }

  render() {
    return (
      <Footer>
        <FooterTab>
          <Button vertical active={this.state.current === 'mycard' ? true : false} onPress={() => this.footerMenu('mycard')}>
            <Icon name="md-card" />
            <Text>My Card</Text>
          </Button>
          <Button vertical active={this.state.current === 'newcard' ? true : false} onPress={() => this.footerMenu('newcard')}>
            <Icon name="md-add-circle" />
            <Text>Create Card</Text>
          </Button>
          <Button vertical active={this.state.current === 'scancard' ? true : false} onPress={() => this.footerMenu('newcard')}>
            <Icon name="md-qr-scanner" />
            <Text>Scan Card</Text>
          </Button>
        </FooterTab>
      </Footer>
    )
  }
}
