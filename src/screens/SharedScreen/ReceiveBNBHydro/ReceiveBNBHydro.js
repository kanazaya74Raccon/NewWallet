import React, { Component } from 'react';
import {
    View,
    Dimensions,
    Platform, StatusBar, StyleSheet, PermissionsAndroid, SafeAreaView,
    Clipboard, ToastAndroid
} from "react-native";
import { LabelInput } from "../../../components/Forms";
import { BgView, Header } from "../../../components/Layouts";
import { DepositCard, HydroBalance } from "../../../components/cards";
import w3s from '../../../libs/Web3Service';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const { height, width } = Dimensions.get('window');
import QRCode from 'react-native-qrcode-svg';
import * as SecureStore from 'expo-secure-store';
import { ethers, } from 'ethers';
import Web3 from 'web3';
import { HYDRO_PRIVATE_KEY } from '../../../constants';

class ReceiveBNBHydro extends Component {
    state = {
        addressTo: "",
        amount: "",
        isError: false,
        isSuccess: false,
        error: "",
        qrvalue: "",
        qrSection: false,
        walletaddress: "",
        hydrobalance: "",
        privateKey: "",
    }

    async componentDidMount() {
        await w3s.initContract()
        this.retrieveData()
    }

    retrieveData = async () => {
        try {
            const value = await SecureStore.getItemAsync(HYDRO_PRIVATE_KEY);
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
            console.log(error)
        }
    }


    onBarcodeScan = (qrvalue) => {
        // Called after te successful scanning of QRCode/Barcode
        this.setState({ Qrvalue: qrvalue });
        this.setState({ setOpenScanner: false });
    };


    onSuccess = e => {
        if (e.data !== "") {
            this.setState({ qrSection: false })
            this.setState({ qrvalue: e.data })
        }
    };
    openqr = () => {
        this.setState({ qrSection: true })
    };

    onCopyToClipboard = async () => {
        await Clipboard.setString(this.state.walletaddress);
        ToastAndroid.show("Copied To Clipboard!", ToastAndroid.SHORT);
    };
    render() {

        return (
            <BgView>
                <Header.Back title="Receive (BNB Hydro)" onBackPress={this.props.navigation.goBack} containerStyle={styles.header} />
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ alignItems: 'center' }}
                >

                    <View style={{ paddingVertical: width * 0.02 }} />

                    <DepositCard
                        hydroAddress={this.state.walletaddress}
                        onIdPress={this.onCopyToClipboard}
                    />

                    <View style={[styles.qrcode, { paddingVertical: 40 }]}>
                        <QRCode
                            value={JSON.stringify(this.state.walletaddress)}
                            size={width * 0.8}
                            color="white"
                            backgroundColor="black"
                            logoSize={30}
                            logoMargin={2}
                            logoBorderRadius={15}
                            logoBackgroundColor="yellow"
                        />
                    </View>

                    <HydroBalance
                        hydroAddress={this.state.hydrobalance}
                        onIdPress={this.onCopyToClipboard}
                    />

                </KeyboardAwareScrollView>
            </BgView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        alignItems: "center",
        paddingHorizontal: width * 0.05,

    },

    header: {
        marginTop: Platform.OS == 'ios' ? 0 : StatusBar.currentHeight,
        paddingTop: 0,
        height: 50
    },

    button: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: width * 0.05,
        flex: 1
    }

});
export default ReceiveBNBHydro;
