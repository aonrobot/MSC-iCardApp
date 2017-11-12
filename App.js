import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';
import {Router, Scene} from 'react-native-router-flux'

import { Container } from 'native-base';

import LayoutHeader from './component/layout/LayoutHeader'
import LayoutFooter from './component/layout/LayoutFooter'

import Splash from './Splash'
import MyCard from './component/pages/MyCard'
import ViewCard from './component/pages/ViewCard'
import CardInfo from './component/pages/NewCard/CardInfo'
import ShowCard from './component/pages/NewCard/ShowCard'

export default class App extends Component<{}> {

  constructor(props){
    super(props)
    this.state = {headerTiile : 'iCard'}
    //alert('constructor run')
  }

  render() {
    //alert('render run')
    return (
      <Container>
        <Router>  
            <Scene key='root'>
                <Scene key="splash" component={Splash} hideNavBar={true} initial/>
                <Scene key="mycard" component={MyCard} title="Card ทั้งหมดของฉัน" hideNavBar={true} />
                <Scene key="viewcard" component={ViewCard} hideNavBar={true} />
                <Scene key='newcard' hideNavBar={true} >
                    <Scene key="cardinfo" component={CardInfo} hideNavBar={true} initial/>
                    <Scene key="showcard" component={ShowCard} hideNavBar={true}/>
                </Scene>
            </Scene>
        </Router>
        <LayoutFooter current={this.props.currentFooterMenu}/>
      </Container>
    );
  }
}

