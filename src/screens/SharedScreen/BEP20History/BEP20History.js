import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Dimensions,
    Platform,
    StatusBar, StyleSheet, SafeAreaView, Clipboard, ToastAndroid,
} from "react-native";
import { BgView, Header } from "../../../components/Layouts";
import w3s from '../../../libs/Web3Service';
import Web3 from 'web3';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ethers, } from 'ethers';
import * as SecureStore from 'expo-secure-store';

import { Table, TableWrapper, Row } from 'react-native-table-component';
import { HYDRO_PRIVATE_KEY } from '../../../constants';


const { height, width } = Dimensions.get('window');

const _spender = "0xB0D5a36733886a4c5597849a05B315626aF5222E";

class BEP20History extends Component {

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
                this.getbep20history()
            }
        } catch (error) {
            console.log('e', error)
        }
    }

    getbep20history = async () => { 
        
            
        let PROVIDER_URL = this.state.provider;
        let currentProvider = await new Web3.providers.HttpProvider(PROVIDER_URL);
        let provider = new ethers.providers.Web3Provider(currentProvider);         
        let web3 = new Web3(currentProvider);

        let currentBlock = await web3.eth.getBlockNumber()
        console.log('currentBlock', currentBlock)

        let privateKey = this.state.privatekeyValue;

        const wallet = new ethers.Wallet(privateKey, provider)
        const walletAddress = wallet.address;
        const abi = await w3s.getHydroTokenABI();
        const hydrotokenaddress = this.state.tokenAddress;

        const contract = new ethers.Contract(hydrotokenaddress, abi, wallet)

        let iface = new ethers.utils.Interface(abi)

        let filter = contract.filters.Transfer(walletAddress, walletAddress);

        const tableData = new Array();

        console.log(filter)

        let urlFromMe = 'https://api.bscscan.com/api?module=logs&action=getLogs&address=' + hydrotokenaddress + '&topic0=' + filter.topics[1] + '&apikey=JMX12FHPAA7YEVFHFGJZ7VCIJ1HEV48VHP'

        let urlToMe = 'https://api.bscscan.com/api?module=logs&action=getLogs&address=' + hydrotokenaddress + '&topic1=' + filter.topics[1] + '&apikey=JMX12FHPAA7YEVFHFGJZ7VCIJ1HEV48VHP'

        let dataToMe = await (await fetch(urlToMe)).json()
        let dataFromMe = await (await fetch(urlFromMe)).json()

        dataToMe.result.forEach((tx) => {
            const rowData = new Array();
            let data = iface.parseLog(tx)
            
            let hex_amount = data.values._amount['_hex'];
            let value = Web3.utils.toBN(hex_amount)
            value = value / (10**this.state.decimals);
            value = value.toString()

            rowData.push('IN')
            rowData.push(tx.topics[0])
            rowData.push(value)
            rowData.push(web3.utils.hexToNumber(tx.blockNumber))
        
            tableData.push(rowData)
            
        })

        dataFromMe.result.forEach((tx) => {
            console.log(tx)
            let data = iface.parseLog(tx)

            const rowData = new Array();
            let hex_amount = data.values._amount['_hex'];
            let value = Web3.utils.toBN(hex_amount)
            value = value / (10**this.state.decimals);
            value = value.toString()

            rowData.push('IN')
            rowData.push(tx.topics[0])
            rowData.push(value)
            rowData.push(web3.utils.hexToNumber(tx.blockNumber))

            tableData.push(rowData)

        })

        console.log('before!')
        //console.log(typeof tableData)
        //console.log(tableData)

        //this.state.history.push(tableData)
        //console.log(this.state.history)
        await this.setState({ history: tableData })
        console.log('after!')

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
    };
};

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

export default BEP20History;