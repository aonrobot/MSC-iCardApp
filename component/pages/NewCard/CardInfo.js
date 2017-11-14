import React, { Component } from 'react';
import { StyleSheet, Image, View, Alert } from 'react-native';
import { Container, Header, Content,
     Button, Text, Icon, Form, Item,
     Label, Input, List, Card, CardItem,
     Left, Right, Body, Thumbnail} from 'native-base';

import LayoutHeader from '../../layout/LayoutHeader'

import {Actions} from 'react-native-router-flux'    


export default class CardInfo extends Component {
    constructor(){
        super()
        this.state = {
            headerTiile : 'Create New E-Business Card',
            info : {
                nameTH : '',
                lastnameTH : '',
                nameEN : '',
                lastnameEN : '',
                position : '',
                department : '',
                contactTel : '',
                contactDir : '',
                contactFax : '',
                email : '',
                company : 'MetroSystems',
                avatar : "",
                qrImageUrl : ""
            }
        }
    }

    _onPressCreateCardBtn (){
        //alert(this.state.info.nameTH)
        Actions.showcard({info : this.state.info})
    }

    render() {
      return (
        <Container>
            <LayoutHeader title={this.state.headerTiile}/>
            <Content style={styles.container}>
                <Text style={styles.title}><Icon name="md-card" />   ข้อมูลนามบัตร</Text>
                <View style={styles.formWrapper}>
                    <Form>
                        <Item stackedLabel>
                            <Label>ชื่อ (ภาษาไทย)</Label>
                            <Input onChangeText={(text) => this.setState(
                                prevState => ({
                                    info: {
                                        ...prevState.info,
                                        nameTH : text
                                    }
                                }
                            ))}/>
                        </Item>
                        <Item stackedLabel>
                            <Label>นามสกุล (ภาษาไทย)</Label>
                            <Input onChangeText={(text) => this.setState(
                                prevState => ({
                                    info: {
                                        ...prevState.info,
                                        lastnameTH : text
                                    }
                                }
                            ))}/>
                        </Item>
                        <Item stackedLabel>
                            <Label>ชื่อ (ภาษาอังกฤษ)</Label>
                            <Input onChangeText={(text) => this.setState(
                                prevState => ({
                                    info: {
                                        ...prevState.info,
                                        nameEN : text
                                    }
                                }
                            ))} keyboardType = 'name-phone-pad'/>
                        </Item>
                        <Item stackedLabel>
                            <Label>นามสกุล (ภาษาอังกฤษ)</Label>
                            <Input onChangeText={(text) => this.setState(
                                prevState => ({
                                    info: {
                                        ...prevState.info,
                                        lastnameEN : text
                                    }
                                }
                            ))} keyboardType = 'name-phone-pad'/>
                        </Item>
                        <Item stackedLabel>
                            <Label>บริษัท</Label>
                            <Input onChangeText={(text) => this.setState(
                                prevState => ({
                                    info: {
                                        ...prevState.info,
                                        company : text
                                    }
                                }
                            ))} value="MetroSystems"/>
                        </Item>
                        <Item stackedLabel>
                            <Label>ตำแหน่ง</Label>
                            <Input onChangeText={(text) => this.setState(
                                prevState => ({
                                    info: {
                                        ...prevState.info,
                                        position : text
                                    }
                                }
                            ))}/>
                        </Item>
                        <Item stackedLabel>
                            <Label>แผนก</Label>
                            <Input onChangeText={(text) => this.setState(
                                prevState => ({
                                    info: {
                                        ...prevState.info,
                                        department : text
                                    }
                                }
                            ))}/>
                        </Item>
                        <Item stackedLabel>
                            <Label>เบอร์โทรศัพท์</Label>                           
                            <Input onChangeText={(text) => this.setState(
                                prevState => ({
                                    info: {
                                        ...prevState.info,
                                        contactTel : text
                                    }
                                }
                            ))} keyboardType = 'phone-pad'/>
                        </Item>
                        <Item stackedLabel>
                            <Label>เบอร์โทรศัพท์ตรง</Label>                           
                            <Input onChangeText={(text) => this.setState(
                                prevState => ({
                                    info: {
                                        ...prevState.info,
                                        contactDir : text
                                    }
                                }
                            ))} keyboardType = 'phone-pad'/>
                        </Item>
                        <Item stackedLabel>
                            <Label>เบอร์ Fax</Label>                           
                            <Input onChangeText={(text) => this.setState(
                                prevState => ({
                                    info: {
                                        ...prevState.info,
                                        contactFax : text
                                    }
                                }
                            ))} keyboardType = 'phone-pad'/>
                        </Item>
                        <Item stackedLabel>
                            <Label>อีเมลล์</Label>
                            <Input onChangeText={(text) => this.setState(
                                prevState => ({
                                    info: {
                                        ...prevState.info,
                                        email : text
                                    }
                                }
                            ))} keyboardType = 'email-address'/>
                        </Item>
                    </Form>
                </View>
                <View style={styles.btnWrapper}>
                    <Button rounded iconRight onPress={() => this._onPressCreateCardBtn()}>
                        <Text>Create</Text>
                        <Icon name='md-arrow-round-forward' />
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
    formWrapper :{
        backgroundColor : '#FFF',
        paddingTop : 20,
        paddingBottom : 20,
        flex : 1
    },
    btnWrapper : {
        paddingTop : 25,
        paddingBottom : 50,
        paddingRight : 15,
        flex : 1,
        flexDirection: 'row',
        justifyContent : 'flex-end'
    }
})