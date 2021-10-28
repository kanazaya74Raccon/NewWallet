import React, { Component } from 'react';
import {
    View,
    ScrollView,
    KeyboardAvoidingView,
    Text,
    Dimensions,
    Linking,
    TouchableHighlight,
    PermissionsAndroid,
    Platform,
    StatusBar, StyleSheet, SafeAreaView, Clipboard, ToastAndroid,
} from "react-native";
import { LabelInput } from "../../../components/Forms";
import { BgView, Header } from "../../../components/Layouts";
import Button from "../../../components/Button/index";
import w3s from '../../../libs/Web3Service';
import { toWei } from '../../../libs/format';
import Web3 from 'web3';
import HydroToken from '../../../contracts/HydroToken.json'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ThemeProvider } from '@react-navigation/native';
import { ethers, } from 'ethers';
import { Value } from 'react-native-reanimated';
import * as SecureStore from 'expo-secure-store';
import { DepositCard, } from "../../../components/cards";
import QRCode from 'react-native-qrcode-svg';
import { Apis } from "tuscjs-ws";
import { ChainStore } from "tuscjs";

import { Table, TableWrapper, Row } from 'react-native-table-component';
import filter from 'lodash.filter';

const { height, width } = Dimensions.get('window');
//const Web3 = require("web3")

const _spender = "0xB0D5a36733886a4c5597849a05B315626aF5222E";

class TokenHistory extends Component {


    constructor(props) {
        super(props);
        this.state = {
            from: "",
            hydroaddress: "",
            amount: "",
            comments: "",
            isError: false,
            isSuccess: false,
            error: "",
            qrvalue: '',
            privatekeyValue: '',
            OpenScanner: false,
            balance: "",
            qrSection: false,
            history: [],
            tableHead: ['IN/OUT', 'Recipient', 'Value', 'Block'],
            widthArr: [60, 140, 80, 80]
        }
    }

    async componentDidMount() {
        w3s.initContract()
        this.retrieveData()
    }

    retrieveData = async () => {

        const accountname = await SecureStore.getItemAsync('accountName');
        const value = await SecureStore.getItemAsync('accountprivateKey');

        this.setState({ privatekeyValue: value })
        this.setState({ walletaddress: accountname })
        this.setState({accountname: accountname})
        console.log("HELLO")

        

        var accountNames = {}
        let res = await Apis.instance('wss://tuscapi.gambitweb.com/', true).init_promise

        let tx_history = await Apis.history.get_account_history(accountname, "1.8.0", 100, "1.8.0")

        console.log(tx_history)
        const tableData = [];        
        for (let e of tx_history) {
            console.log(e)
            let rowData = [];
            try {
                let from = e['op'][1]['from'];
                let to = e['op'][1]['to'];
                let amount = e['op'][1]['amount']['amount'];
                let block_number = e['block_num'];
             
            
                if (!(from in accountNames)) {
                    let from_account_name = await Apis.db.get_full_accounts([from], false)
                    accountNames[from] = from_account_name[0][1]['account']['name'];
                }
                if (!(to in accountNames)) {
                    let to_account_name = await Apis.db.get_full_accounts([to], false)
                    accountNames[to] = to_account_name[0][1]['account']['name'];
                }

                from = accountNames[from];
                to = accountNames[to];
                if (from == accountname) {
                    rowData.push('OUT');
                    rowData.push(to);  
                } else {
                    rowData.push('IN')
                    rowData.push(from);  
                }
                rowData.push(amount/10**5);
                rowData.push(block_number);
                tableData.push(rowData);
            } catch {
                break
            }
            
        }
        
        this.setState({history: tableData})



    }

    onCopyToClipboard = async () => {
        await Clipboard.setString(this.props.route.params.walletToken);
        ToastAndroid.show("Copied To Clipboard!", ToastAndroid.SHORT);
    };
    onChange = (value) => {
        this.setState({ amount: value });
    }

    render() {
        return (
            <BgView>
                <Header.Back title='TUSC History' onBackPress={this.props.navigation.goBack} containerStyle={styles.header} />
                <View style={styles.container}>
                    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ paddingVertical: width * 0.02 }} />
                        <View style={styles.table_container}>
                            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                                <Row data={this.state.tableHead} widthArr={this.state.widthArr} style={styles.table_header} textStyle={styles.table_text} />
                            </Table>
                            <ScrollView style={styles.table_dataWrapper}>
                                <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                                    {
                                        this.state.history.map((rowData, index) => (
                                            <Row
                                                key={index}
                                                data={rowData}
                                                widthArr={this.state.widthArr}
                                                style={[styles.table_row, index % 2 && { backgroundColor: '#F7F6E7' }]}
                                                textStyle={styles.table_text}
                                            />
                                        ))
                                    }
                                </Table>
                            </ScrollView>
                        </View>
                    </KeyboardAwareScrollView>
                </View>
            </BgView>

        );

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: width * 0.05
    },

    header: {
        marginTop: Platform.OS == 'ios' ? 0 : StatusBar.currentHeight,
        paddingTop: 0,
        height: 50
    },

    button: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: width * 0.03,

    },
    qrcode: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: width * 0.05,
        marginBottom: width * 0.05,
        marginRight: width * 0.02,
    },

    table_container: { flex: 1, backgroundColor: '#fff' },
    table_header: { height: 50, backgroundColor: '#537791' },
    table_text: { textAlign: 'center', fontWeight: '100' },
    table_dataWrapper: { marginTop: -1 },
    table_row: { backgroundColor: '#E7E6E1' }

})

export default TokenHistory;