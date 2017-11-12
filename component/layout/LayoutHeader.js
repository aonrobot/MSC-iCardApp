import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';
export default class LayoutHeader extends Component {
  constructor(props){
    super(props)
    let title = this.props.title || 'iCard'
    this.state = {title : title}
  }
  componentWillReceiveProps(nextProps){
    //alert(nextProps.title)
  }
  render() {
    
    return (
        <Header style={{backgroundColor : "#1abc9c"}}>
          <StatusBar backgroundColor="#1abc9c"barStyle="light-content" />
            <Body>
              <Title style={{fontSize:19}}> {this.state.title}</Title>
            </Body>
        </Header>
    );
  }
}