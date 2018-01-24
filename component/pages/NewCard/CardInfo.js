import React, { Component } from 'react';
import { StyleSheet, Image, View, Alert, AsyncStorage, Picker, ActivityIndicator } from 'react-native';
import { Container, Header, Content,
     Button, Text, Icon, Form, Item,
     Label, Input, List, Card, CardItem,
     Left, Right, Body, Thumbnail} from 'native-base';

import LayoutHeader from '../../layout/LayoutHeader'
import LayoutFooter from '../../layout/LayoutFooter'

import {Actions} from 'react-native-router-flux'

export default class CardInfo extends Component {
    constructor(){
        super()

        this.state = {
            isLoad : false,
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
            },

            userData : [],
            companyData : [],

            txtInputNameTH : '',
            txtInputLastNameTH : '',
            txtInputNameEN : '',
            txtInputLastNameEN : '',

            txtInputPosition : '',
            txtInputDepartment : '',
            txtInputContactTel : '',
            txtInputContactDir : '',
            txtInputEmail : '',

            companyCode : ''
            
        }
    }

    _onCompanyChange(value){
        this.setState({
            companyCode : value
        })
        this.setState(
            prevState => ({
                info: {
                    ...prevState.info,
                    company : value,
                }
            }
        ))
    }

    getAllCompany(){
        
        fetch('http://10.200.109.90:8000/api/company', {
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

            let defaultCompany = data[3].company_code || data[0].company_code
            if(result == true || result == 'true'){                
                this.setState({
                    companyData : data,
                    companyCode : defaultCompany // set defualt picker to ...
                })
            }
            this.setState(
                prevState => ({
                    info: {
                        ...prevState.info,
                        company : defaultCompany
                    }
                }
            ))
        })
        .catch((error) => {
            this.setState({isLoad : false})
            alert('ไม่สามารถติดต่อ Server ได้ กรูณาลองเข้ามาใหม่ในภายหลังครับ')
            Actions.mycard()
        })
    }

    _onPressCreateCardBtn (){
        //alert(this.state.info.nameTH)
        Actions.showcard({info : this.state.info})
    }

    async _onLoad(){

        this.setState({isLoad : true})

        this.getAllCompany()

        let userInfo = await AsyncStorage.getItem('@userInfo')
        userInfo = await JSON.parse(userInfo)
        
        this.setState({userData : userInfo})
        this.setState({
            txtInputNameTH : userInfo[0].FirstName,
            txtInputLastNameTH : userInfo[0].LastName,
            txtInputNameEN : userInfo[0].FirstNameEng,
            txtInputLastNameEN : userInfo[0].LastNameEng,

            txtInputPosition : userInfo[0].PositionNameEng,
            txtInputDepartment : userInfo[0].OrgUnitName,
            txtInputContactTel : userInfo[0].MobilePhone,
            txtInputContactDir : userInfo[0].phoneDir,
            txtInputEmail : userInfo[0].email
        })

        this.setState(
            prevState => ({
                info: {
                    ...prevState.info,
                    nameTH : userInfo[0].FirstName,
                    lastnameTH : userInfo[0].LastName,
                    nameEN : userInfo[0].FirstNameEng,
                    lastnameEN : userInfo[0].LastNameEng,
                    position : userInfo[0].PositionNameEng,
                    department : userInfo[0].OrgUnitName,
                    contactTel : userInfo[0].MobilePhone,
                    contactDir : userInfo[0].phoneDir,
                    email : userInfo[0].email
                }
            }
        ))
    }

    componentDidMount(){
        this._onLoad()
    }

    render() {
      return (
        <Container>
            <LayoutHeader title={this.state.headerTiile}/>
            <Content style={styles.container}>
                <Text style={styles.title}><Icon name="md-card" />   ข้อมูลนามบัตร</Text>

                {
                    this.state.isLoad ?
                    
                    <ActivityIndicator size="large" color="#3498db"/>
    
                    :
                    <View>
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
                                    ))} editable={false} selectTextOnFocus={false} defaultValue={this.state.info.nameTH}/>
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
                                    ))} editable={false} selectTextOnFocus={false} defaultValue={this.state.txtInputLastNameTH}/>
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
                                    ))} keyboardType = 'name-phone-pad' editable={false} selectTextOnFocus={false} defaultValue={this.state.txtInputNameEN}/>
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
                                    ))} keyboardType = 'name-phone-pad' editable={false} selectTextOnFocus={false} defaultValue={this.state.txtInputLastNameEN}/>
                                </Item>
                                <View style={styles.companyView}>
                                    <Label style={styles.companyLabel}>บริษัท</Label>
                                    <Picker style={styles.companyPicker} selectedValue = {this.state.companyCode} onValueChange = {this._onCompanyChange.bind(this)}>
                                        {
                                            [...this.state.companyData].map(
                                                (e,i)=>

                                                <Picker.Item key={i} label={e.company_name} value={e.company_code} />
                                            )
                                        }
                                    </Picker>
                                </View>
                                <Item stackedLabel>
                                    <Label>ตำแหน่ง</Label>
                                    <Input onChangeText={(text) => this.setState(
                                        prevState => ({
                                            info: {
                                                ...prevState.info,
                                                position : text
                                            }
                                        }
                                    ))} defaultValue={this.state.txtInputPosition}/>
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
                                    ))} defaultValue={this.state.txtInputDepartment}/>
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
                                    ))} keyboardType = 'phone-pad' defaultValue={this.state.txtInputContactTel}/>
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
                                    ))} keyboardType = 'phone-pad' defaultValue={this.state.txtInputContactDir}/>
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
                                    ))} keyboardType = 'email-address' defaultValue={this.state.txtInputEmail}/>
                                </Item>
                            </Form>
                        </View>
                        <View style={styles.btnWrapper}>
                            <Button rounded iconRight onPress={() => this._onPressCreateCardBtn()}>
                                <Text>Create</Text>
                                <Icon name='md-arrow-round-forward' />
                            </Button>
                        </View>
                    </View>
                }

            </Content>
            <LayoutFooter/>
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
    },
    companyView : {
        marginLeft : 10,
        marginTop : 10
    },
    companyLabel : {
        marginLeft : 5
    }
})