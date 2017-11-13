import React, { Component } from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body, Button } from 'native-base';

import LayoutHeader from '../layout/LayoutHeader'

import {Actions} from 'react-native-router-flux'

export default class MyCard extends Component {
    constructor(props){
        super(props)
        this.state = {
            headerTiile : 'My E-Card',
            cards : {all : []} 
        }
        console.log('welcome')
    }

    _onPressViewCard (id){
        //alert(this.state.info.nameTH)
        Actions.viewcard({cardId : id})
    }

    async _updateList () {
        
        let result = await AsyncStorage.getItem('@cards');
        let getCards = await JSON.parse(result) || {all : []}
        console.log('get Card', getCards)
        this.setState({cards : getCards.all})
        
        //this._changeTextInputValue('')

    }

    componentWillMount(){
        this._updateList()
    }
    
    render() {

      return (
        <Container>
            <LayoutHeader title={this.state.headerTiile}/>
            <Content style={styles.container}>
                <List>
                    {
                        [...this.state.cards].map(
                            (x, i) => 
                            <ListItem key={i}>
                                {/*<Thumbnail size={80} source={{ uri: x.avatar }} />*/}
                                <Body>
                                    <Text>{x.nameEN} {x.lastEN}</Text>
                                    <Text note>{x.position} ({x.department})</Text>
                                    <Text note>{x.company}</Text>
                                </Body>
                                <Button bordered onPress={() => this._onPressViewCard(i)}>
                                    <Text>View</Text>
                                </Button>
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
            </Content>
        </Container>
      )
    }
}

const styles = StyleSheet.create({
    container : {
        backgroundColor : '#FFF',
    }
})