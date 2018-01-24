import React, { Component } from 'react';
import { StyleSheet, KeyboardAvoidingView, Keyboard } from 'react-native'
import {Actions} from 'react-native-router-flux'
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';

export default class LayoutFooter extends Component {
  constructor(props) {
      super(props)
      this.state = {current : ''}
  }

  componentWillReceiveProps(nextProps){
    //this.footerMenu(nextProps.current)
  }

  footerMenu(menu){
    switch(menu){
      case 'mycard' :
        this.setState({current : 'mycard'})
        Actions.state.index = 0
        console.log('My Card Click', Actions.state.index)
        Actions.mycard()
      break;
      case 'newcard' :
        this.setState({current : 'newcard'})
        Actions.state.index = 0
        console.log('New Card Click', Actions.state.index)        
        Actions.cardinfo()
      break;
      case 'profile' :
        this.setState({current : 'profile'})
        Actions.state.index = 0    
        Actions.profile()
      break;
    }
  }

  render() {
    return (
      <Footer>
        <FooterTab style={{backgroundColor : "#1abc9c"}}>
          <Button vertical active={this.state.current === 'mycard' ? true : false} onPress={() => this.footerMenu('mycard')}>
            <Icon style={styles.icon} name="md-card" />
            <Text style={styles.text}>My Card</Text>
          </Button>
          <Button vertical active={this.state.current === 'newcard' ? true : false} onPress={() => this.footerMenu('newcard')}>
            <Icon style={styles.icon} name="md-add-circle" />
            <Text style={styles.text}>Create</Text>
          </Button>
          <Button vertical active={this.state.current === 'profile' ? true : false} onPress={() => this.footerMenu('profile')}>
            <Icon style={styles.icon} name="md-person" />
            <Text style={styles.text}>Me</Text>
          </Button>
        </FooterTab>
      </Footer>
    )
  }
}

const styles = StyleSheet.create({
  text:{
    color : '#FFF'
  },
  icon:{
    color : '#FFF'
  },
  footer : {
    backgroundColor : '#FFF'
  },
  footerTab : {
    backgroundColor : '#FFF'
  }
})
