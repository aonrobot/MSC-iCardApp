import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage, ActivityIndicator } from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body, Button, Icon, H2 } from 'native-base';

import LayoutHeader from '../layout/LayoutHeader'
import LayoutFooter from '../layout/LayoutFooter'

import {Actions} from 'react-native-router-flux'

export default class MyCard extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoad : false,
            headerTitle : 'My iCard',
            userLogin : '',
            cards : []
        }
    }

    _onPressViewCard (id){
        Actions.viewcard({cardId : id, userLogin : this.state.userLogin})
    }

    _getUserLoginDetail(username){

        this.setState({isLoad : true})
        
        fetch('https://fora.metrosystems.co.th/icard/api/employee/' + username, {
            method: 'GET'
        })
        .then((response) => {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json()
        })
        .then(async(responseJSON)=>{
            
            let result = responseJSON.result
            let data = responseJSON.data
            this.setState({isLoad : false})
            if(result == true || result == 'true'){                
                await AsyncStorage.setItem('@userInfo', JSON.stringify(data))
                this.setState({userLogin : data[0].Login})
            }else{
                alert('ไม่พบข้อมูลผู้ใช้งานในระบบ กรุณาติดต่อผู้ดูแลระบบ')
                await AsyncStorage.setItem('@userLogin', '')
                await AsyncStorage.setItem('@isLogin', 'false')
                Actions.splash()
            }
        })
        .catch((error) => {
            this.setState({isLoad : false})
            AsyncStorage.setItem('@userLogin', '')
            AsyncStorage.setItem('@isLogin', 'false')
            alert('ไม่สามารถติดต่อ Server ได้')
            Actions.splash()
        })
    }

    async _checkLogin(){
        let isLogin = await AsyncStorage.getItem('@isLogin')
        let userLogin = await AsyncStorage.getItem('@userLogin')
        if(isLogin == 'true' || isLogin === true){
            this._getUserLoginDetail(userLogin)
            this._updateList(userLogin)
        }else{
            alert("Don't login please login first!!")
            Actions.splash()
        }
    }

    async _updateList(username) {
        /*let result = await AsyncStorage.getItem('@cards');
        let getCards = await JSON.parse(result) || {all : []}
        console.log('get Card', getCards)
        this.setState({cards : getCards.all})*/        
        //this._changeTextInputValue('')

        fetch('https://fora.metrosystems.co.th/icard/api/card/of/' + username, {
            method: 'GET'
        })
        .then((response) => {
            return response.json()
        })
        .then(async(responseJSON)=>{
            
            let result = responseJSON.result
            let data = responseJSON.data
            this.setState({isLoad : false})
            if(result == true || result == 'true'){                
                this.setState({cards : data})
            }
        })
        .catch((error) => {
            this.setState({isLoad : false})
            alert('ไม่สามารถดึงข้อมมูล card มาได้ กรุณาตรวจสอบการเชื่อมต่อ Internet')
        })

    }

    componentWillMount(){
        this._checkLogin()
    }

    componentDidMount(){
        
    }
    
    render() {

      var showCardContainer;

      if(this.state.cards.length <= 0){
        showCardContainer = 
          (
            <View style={styles.noCardContainer}>
                <Icon style={styles.icon} name="md-cloud-outline" />
                <H2 style={styles.noCardLabel}>ยังไม่มี Card ที่สร้างไว้เลย :(</H2>
            </View>
          )
      }else{
        showCardContainer = 
          (
            <View>
                <List>
                    {
                        [...this.state.cards].map(
                            (x, i) => 
                            <ListItem key={i}>
                                <Thumbnail square source={{ uri: x.avatar_url }} />
                                <Body>
                                    <Text>{x.nameEN} {x.lastnameEN}</Text>
                                    <Text note>{x.position} ({x.department})</Text>
                                    <Text note>{x.companyName}</Text>
                                </Body>
                                <View style={styles.viewBtnWrapper}>
                                    <Button bordered onPress={() => this._onPressViewCard(x.id)}>
                                        <Text>View</Text>
                                    </Button>
                                </View>
                            </ListItem>
                        )
                    }
                    {/*<ListItem>
                        <Thumbnail size={80} source={{ uri: 'https://scontent.fbkk13-1.fna.fbcdn.net/v/t1.0-9/10892011_823160194391711_4434570603349381728_n.jpg?_nc_eui2=v1%3AAeFnepO4dQbvHZXHtUcl8JlMiJUEV9yfTaeJ7h_-SGL9GjSjT_eRDTvl6u3qanItqsD0hyy7AJrUU8M1D3qA5aPuEO73jWDZjVOLt2AOwmOeAQ&oh=5937b8ad051619f1d06379f6073d2b3e&oe=5A9A4E37' }} />
                        <Body>
                            <Text>Auttawut Wiriyakreng</Text>
                            <Text note>Programmer (MIS)</Text>
                            <Text note>MetroSystems</Text>
                        </Body>
                        <Button bordered onPress={() => this._onPressViewCard()}>
                            <Text>View</Text>
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Thumbnail size={80} source={{ uri: 'https://scontent.fbkk13-1.fna.fbcdn.net/v/t1.0-9/16640772_1584034488281253_7621512004895585572_n.jpg?_nc_eui2=v1%3AAeEUmxLOT7Hxpfv4OvKH2GQAH39QLGidH1apLpW7H0k92x5X8mtItNGyX95KLfUsPZGoX0jjkinRuMerqCsg7tlpCLDDP66NSu-gOhGk2lMRcg&oh=9b4660e8f9b8e5ef27028facb39f1019&oe=5A61D9B2' }} />
                        <Body>
                            <Text>Sutinun Atachai</Text>
                            <Text note>Manager Supply Chain (SP)</Text>
                            <Text note>adidas</Text>
                        </Body>
                        <Button bordered>
                            <Text>View</Text>
                        </Button>
                    </ListItem>*/}
                </List>
            </View>
          )
      }
      
      return (
        <Container>
            {
                <LayoutHeader title={this.state.headerTitle}/>
            }

            <Content style={styles.container}>

            {
                this.state.isLoad ?

                <View style={styles.activityIndicatior}>
                    <ActivityIndicator size="large" color="#3498db"/>
                </View>

                :

                showCardContainer
                
            }
            
            </Content>
            <LayoutFooter/>

        </Container>
      )
    }
}

const styles = StyleSheet.create({
    activityIndicatior : {
        marginTop : 20
    },
    container : {
        backgroundColor : '#FFF',
    },
    noCardContainer : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        marginTop : 100
    },
    noCardLabel : {
        color : '#CCC'
    },
    icon:{
        color : '#DDD',
        fontSize : 58
    },
    avatar : {
        width: 100,
        height:100
    },
    viewBtnWrapper : {
        
    }
})