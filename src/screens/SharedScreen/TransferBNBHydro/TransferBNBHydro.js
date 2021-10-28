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
import { HydroBalance, } from "../../../components/cards";
import QRCode from 'react-native-qrcode-svg';
import { HYDRO_PRIVATE_KEY } from '../../../constants';
const { height, width } = Dimensions.get('window');
//const Web3 = require("web3")
 
const _spender = "0xB0D5a36733886a4c5597849a05B315626aF5222E";

class TransferBNBHydro extends Component {
    state = {
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
    }

    async componentDidMount() {
        w3s.initContract()
        this.retrieveData()
    }

    retrieveData = async () => {
        try {
            const value = await SecureStore.getItemAsync(HYDRO_PRIVATE_KEY);    
            this.setState({ privatekeyValue: value })
            if (value !== null) {
                console.log('PrivateKey-->', value)
            }
            let currentProvider = await new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/');
            let provider = new ethers.providers.Web3Provider(currentProvider);
            let wallet = new ethers.Wallet(value, provider)
            this.setState({ walletaddress: wallet.address })
            if (value !== null) {
                console.log('PrivateKey-->', value)
            }

            const abi = await w3s.getHydroTokenABI()
            const hydrotokenaddress = await w3s.getHydroTokenBNBAddress()
            const contract = new ethers.Contract(hydrotokenaddress, abi, wallet)

            let hydrobalance = await contract.balanceOf(wallet.address);
            hydrobalance = Web3.utils.fromWei(hydrobalance.toString())
            this.setState({ hydrobalance: hydrobalance })

        } catch (error) {

        }
    }

    deposits = async () => {

        try {

            if (!this.state.hydroaddress) {
                await this.setState({ isError: true, error: "Hydro Address Required" })
                return
            } else {
                await this.setState({ isError: false })
            }

            if (!this.state.amount) {
                await this.setState({ isError: true, error: "uint256 must required!" })
                return
            } else {
                await this.setState({ isError: false })
            }

            let privateKey = this.state.privatekeyValue;

            const abi = await w3s.getHydroTokenABI();
            const hydrotokenaddress = await w3s.getHydroTokenBNBAddress();

            let currentProvider = await new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/');
            let provider = new ethers.providers.Web3Provider(currentProvider);

            const wallet = new ethers.Wallet(privateKey, provider)

            const contract = new ethers.Contract(hydrotokenaddress, abi, wallet)

            const receiverWallet = this.state.hydroaddress

            const howMuchTokens = ethers.utils.parseUnits(this.state.amount, 18)
            console.log("Before sending!")
            async function sendTokens() {
                try {
                    await contract.transfer(receiverWallet, howMuchTokens) 
                    console.log(`Sent ${howMuchTokens} Hydro to address ${receiverWallet}`)
                    let error = ''
                    return error
                } catch (error) {
                    return error
                }                
            }
            let error = await sendTokens()
            
            if (!error) {
                console.log('hi')
                this.setState({isSuccess:true})
                this.retrieveData()
            } else {
                console.log('ho')
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
        await Clipboard.setString(this.state.amount);
        ToastAndroid.show("Copied To Clipboard!", ToastAndroid.SHORT);
    };
    onChange = (value) => {
        // alert(value)
        this.setState({ amount: value });
        //console.log("state value --->", this.state.amount);
    }

    render() {
        console.log(this.props.route.params.walletToken, "Props")
        return (

            <BgView>
                <Header.Back title="Transfer Hydro (BNB)" onBackPress={this.props.navigation.goBack} containerStyle={styles.header} />
                <View style={styles.container}>
                    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ paddingVertical: width * 0.02 }} />

                        <HydroBalance
                            hydroAddress={this.state.hydrobalance}
                            onIdPress={this.onCopyToClipboard}
                        />

                        <LabelInput
                            label="Hydro Address"
                            placeholder="Enter Hydro Address"
                            // keyboardType={'number-pad'}
                            value={this.state.hydroaddress}
                            onChangeText={(value) => {
                                console.log(value)
                                this.setState({ hydroaddress: value })
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

export default TransferBNBHydro;