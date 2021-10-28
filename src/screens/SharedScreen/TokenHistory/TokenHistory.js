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

import { Table, TableWrapper, Row } from 'react-native-table-component';
import filter from 'lodash.filter';
import { HYDRO_PRIVATE_KEY } from '../../../constants';

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
            widthArr: [80, 120, 80, 80]
        }
    }

    async componentDidMount() {
        w3s.initContract()
        let title = this.props.route.params.symbol + ' History';
        await this.setState({title: title})
        this.retrieveData()
    }

    retrieveData = async () => {
        try {
            const provider = this.props.route.params.provider;
            const tokenAddress = this.props.route.params.tokenAddress;
            const value = await SecureStore.getItemAsync(HYDRO_PRIVATE_KEY);
            const decimals = this.props.route.params.decimals;
            console.log(provider, tokenAddress, value, decimals)
            this.setState({
                privatekeyValue: value,
                provider: provider,
                tokenAddress: tokenAddress,
                decimals: decimals
            })
            if (value !== null) {
                this.tokenhistory()
            }
        } catch (error) {
            console.log('e', error)
        }
    }

    tokenhistory = async () => { 
        try {
            //let currentProvider = await new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/75cc8cba22ab40b9bfa7406ae9b69a27');
            //let web3 = new Web3(currentProvider);
            let PROVIDER_URL = this.state.provider;
            let currentProvider = await new Web3.providers.HttpProvider(PROVIDER_URL);
            let provider = new ethers.providers.Web3Provider(currentProvider);            

            let privateKey = this.state.privatekeyValue;

            //const provider = new ethers.providers.EtherscanProvider("rinkeby")
            const wallet = new ethers.Wallet(privateKey, provider)
            const walletAddress = wallet.address;
            const abi = await w3s.getHydroTokenABI();
            const hydrotokenaddress = this.state.tokenAddress;

            const contract = new ethers.Contract(hydrotokenaddress, abi, wallet)

            let iface = new ethers.utils.Interface(abi)

            let filterFromMe = contract.filters.Transfer(walletAddress, null);
            filterFromMe.fromBlock = 0;

            let logs = await provider.getLogs(filterFromMe);

            const tableData = [];
            console.log('logs',logs)
            logs.forEach((tx) => {
                let data = iface.parseLog(tx);
                console.log(tx)
                let hex_amount = data.values._amount['_hex'];
                console.log('a')
                let amount = Web3.utils.toBN(hex_amount);
                
                amount = amount / (10**this.state.decimals);
                console.log(amount)

                const rowData = [];

                rowData.push('OUT')
                rowData.push(tx.topics[0])
                rowData.push(amount)
                //rowData.push(Math.pow(16, tx.value._hex))
                rowData.push(tx.blockNumber)

                tableData.push(rowData)

                
            })

            let filterToMe = contract.filters.Transfer(null, walletAddress);
            filterToMe.fromBlock = 0;

            let logs_toMe = await provider.getLogs(filterToMe);
            logs_toMe.forEach((tx) => {
                let data = iface.parseLog(tx);
                let hex_amount = data.values._amount['_hex'];
                let amount = Web3.utils.toBN(hex_amount);
                amount = amount / (10**this.state.decimals);
                console.log(amount)
                const rowData = [];

                rowData.push('IN')
                rowData.push(tx.topics[0])
                rowData.push(amount)
                //rowData.push(Math.pow(16, tx.value._hex))
                rowData.push(tx.blockNumber)

                tableData.push(rowData)

                
            })

            tableData.sort(
                function(a, b) {
                    if (a[3] > b[3]) return -1
                    if (a[3] < b[3]) return 1
                    return 0
                }
            )
            this.setState({ history: tableData })

        }
        catch (ex) {
            console.log(ex)
            await this.setState({ isError: true })
            if (ex.message)
                await this.setState({ error: ex.message })
        }
    };


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
                <Header.Back title={this.state.title} onBackPress={this.props.navigation.goBack} containerStyle={styles.header} />
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