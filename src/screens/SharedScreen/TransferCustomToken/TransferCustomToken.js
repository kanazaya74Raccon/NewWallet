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
import { CustomTokenBalance } from "../../../components/cards";
import QRCode from 'react-native-qrcode-svg';
import { HYDRO_PRIVATE_KEY } from '../../../constants';
const { height, width } = Dimensions.get('window');
//const Web3 = require("web3")
 
const _spender = "0xB0D5a36733886a4c5597849a05B315626aF5222E";

class TransferCustomToken extends Component {
    state = {
        from: "",
        receiveraddress: "",
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
        symbol:'',
        contractAddress: '',
        decimals: 0,
        title:'',
        balancetext: '',
        provider: ''
    }

    async componentDidMount() {
        w3s.initContract()
        let provider = this.props.route.params.provider;
        await this.setState({provider:provider})
        this.retrieveData()
    }

    retrieveData = async () => {
        try {

            let symbol = this.props.route.params.symbol;
            let contractAddress = this.props.route.params.contractAddress;
            let decimals = this.props.route.params.decimals;
            
            let title = 'Transfer ' + symbol;
            let balancetext = symbol + ' Balance'
            /* To do add provider param   */ 
    
            const value = await SecureStore.getItemAsync(HYDRO_PRIVATE_KEY);
            if (value !== null) {
                console.log('PrivateKey-->', value)
            }

            this.setState({symbol:symbol, contractAddress: contractAddress, decimals: decimals, title: title, balancetext: balancetext, privatekeyValue: value})

            let currentProvider = await new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/75cc8cba22ab40b9bfa7406ae9b69a27');
            let provider = new ethers.providers.Web3Provider(currentProvider);
            let wallet = new ethers.Wallet(value, provider)
            this.setState({ walletaddress: wallet.address })
            

            const abi = await w3s.getCustomTokenABI()
            const contract = new ethers.Contract(contractAddress, abi, wallet)

            let tokenbalance = await contract.balanceOf(wallet.address);
            tokenbalance = tokenbalance / (10**decimals)
            this.setState({ balance: tokenbalance})

        } catch (error) {
            console.log(error)
        }
    }

    deposits = async () => {

        try {

            if (!this.state.receiveraddress) {
                await this.setState({ isError: true, error: "Receiver Address Required" })
                return
            } else {
                await this.setState({ isError: false })
            }

            if (!this.state.amount) {
                await this.setState({ isError: true, error: "Amount is required!" })
                return
            } else {
                await this.setState({ isError: false })
            }

            let privateKey = this.state.privatekeyValue;

            const abi = await w3s.getCustomTokenABI();
            const customtokenaddress = this.state.contractAddress
            const decimals = this.state.decimals;

            const provider = ethers.getDefaultProvider()
            //const provider = new ethers.providers.EtherscanProvider("rinkeby")
            const wallet = new ethers.Wallet(privateKey, provider)
            const contract = new ethers.Contract(customtokenaddress, abi, wallet)
            const receiverWallet = this.state.receiveraddress
            const symbol = this.state.symbol
            const howMuchTokens = ethers.utils.parseUnits(this.state.amount, decimals)

            console.log("Before sending!")
            async function sendTokens() {
                try {
                    console.log('receiverWallet', receiverWallet, 'howMuchTokens', howMuchTokens, 'symbol', symbol)
                    result = await contract.transfer(receiverWallet, howMuchTokens)
                    console.log(`Sent ${howMuchTokens} ${symbol} to address ${receiverWallet}`)
                    return true, ''
                } catch (error) {
                    return false, error
                }
            }
            let result, error = await sendTokens()
            console.log('result', result, 'error', error)
            if (result) {
                this.setState({isSuccess:true})
                this.retrieveData()
            } else {
                this.setState({isError:true})
                this.setState({error:error.message})
            }
        }
        catch (ex) {
            console.log(ex)
            await this.setState({ isError: true })
            if (ex.message)
                await this.setState({ error: ex.message })
        }


    };


    onCopyToClipboard = async () => {
        await Clipboard.setString(this.state.hydrobalance);
        ToastAndroid.show("Copied To Clipboard!", ToastAndroid.SHORT);
    };
    onChange = (value) => {
        // alert(value)
        this.setState({ amount: value });
        //console.log("state value --->", this.state.amount);
    }

    render() {
        return (

            <BgView>
                <Header.Back title={this.state.title} onBackPress={this.props.navigation.goBack} containerStyle={styles.header} />
                <View style={styles.container}>
                    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ paddingVertical: width * 0.02 }} />

                        <CustomTokenBalance
                            balance={this.state.balance}
                            onIdPress={this.onCopyToClipboard}
                            titletext={this.state.balancetext}
                        />

                        <LabelInput
                            label="Contract Address"
                            placeholder="Enter Receiver Address"
                            // keyboardType={'number-pad'}
                            value={this.state.receiveraddress}
                            onChangeText={(value) => {
                                console.log(value)
                                this.setState({ receiveraddress: value })
                            }}
                        />

                        <LabelInput
                            label="Amount"
                            placeholder="0.00"
                            keyboardType={'number-pad'}
                            value={this.state.amount}
                            onChangeText={(value) => this.onChange(value)}
                        />

                        {this.state.isError &&
                            <Text style={{ color: 'red' }}>
                                Error : {this.state.error}
                            </Text>
                        }
                        {this.state.isSuccess &&
                            <Text style={{ color: 'green' }}>
                                Transfer successful!
                            </Text>
                        }

                        <View style={{ flexDirection: 'row', width: '98%' }}>
                            <View style={styles.button}>
                                <Button text="Transfer" onPress={this.deposits} />
                            </View>
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

})

export default TransferCustomToken;