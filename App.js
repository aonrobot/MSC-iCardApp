import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  BackHandler,
  Alert
} from 'react-native';
import {Router, Scene, Actions} from 'react-native-router-flux'

import { Container } from 'native-base';

import LayoutHeader from './component/layout/LayoutHeader'
import LayoutFooter from './component/layout/LayoutFooter'

import Splash from './Splash'
import MyCard from './component/pages/MyCard' // Show All Exist Card
import ViewCard from './component/pages/ViewCard' // View Card

import CardInfo from './component/pages/NewCard/CardInfo' // Enter Card Info for Generate
import ShowCard from './component/pages/NewCard/ShowCard' // Show Generate Card
import Profile from './component/pages/Profile' // Profile

export default class App extends Component<{}> {

  constructor(props){
    super(props)
    this.state = {
      headerTiile : 'iCard'
    }
    //alert('constructor run')
  }

  handleBackButton = () => {
    console.log(Actions.state.index)
    if (Actions.state.index === 0) {
      Alert.alert(
        'Do you want to exit app!!',
        'press ok to exit app',
        [
          {text: 'Cancel', onPress: () => false, style: 'cancel'},
          {text: 'OK', onPress: () => BackHandler.exitApp()},
        ],
        { cancelable: false }
      )
      
    }

    Actions.pop();
    return true;
  }

  componentDidMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  render() {
    //alert('render run')
    return (
      <Container>
        <Router>  
            <Scene key='root'>
                <Scene key="splash" component={Splash} hideNavBar={true} type="replace" initial/>
                
                <Scene key="mycard" component={MyCard} title="Card ทั้งหมดของฉัน" hideNavBar={true} hideTabBar={true} type="replace"/>
                <Scene key="viewcard" component={ViewCard} hideNavBar={true}/>

                <Scene key="cardinfo" component={CardInfo} hideNavBar={true} type="replace"/>
                <Scene key="showcard" component={ShowCard} hideNavBar={true}/>

                <Scene key="profile" component={Profile} hideNavBar={true} type="replace"/>
            </Scene>
        </Router>
      </Container>
    )
  }
}
