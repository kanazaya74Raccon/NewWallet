import React, { Component } from 'react';
import {
    View,
    Clipboard,
    ToastAndroid,
    Dimensions,
    Platform, StatusBar, StyleSheet
} from "react-native";
import { BgView, SecondaryHeader } from "../../../components/Layouts";
import { DepositCard, HydroBalance } from "../../../components/cards";
import w3s from '../../../libs/Web3Service';
const { height, width } = Dimensions.get('window');
import { CameraKitCameraScreen } from 'react-native-camera-kit';
import QRCodeScanner from 'react-native-qrcode-scanner';
import QRCode from 'react-native-qrcode-svg';
import * as SecureStore from 'expo-secure-store';
import { ethers, } from 'ethers';
import Web3 from 'web3';
import BTNCopy from './BTNCopy';
import { HYDRO_PRIVATE_KEY } from '../../../constants';


class Transfer extends Component {
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
            let currentProvider = await new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/75cc8cba22ab40b9bfa7406ae9b69a27');
            let provider = new ethers.providers.Web3Provider(currentProvider);
            let wallet = new ethers.Wallet(value, provider)
            this.setState({ walletaddress: wallet.address })
            if (value !== null) {
                console.log('PrivateKey-->', value)
            }

            const abi = await w3s.getHydroTokenABI()
            const hydrotokenaddress = await w3s.getHydroTokenAddress()
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

    onCopyToClipboard = async () => {
        await Clipboard.setString(this.state.walletaddress);
        ToastAndroid.show("Copied To Clipboard!", ToastAndroid.SHORT);
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
    render() {

        return (
            <BgView>
                <View style={styles.container}>
                    <SecondaryHeader.Back title="Receive" onBackPress={this.props.navigation.goBack} containerStyle={styles.header} />

                    <View style={{ paddingVertical: width * 0.02 }} />
                    <View style={styles.top}>
                        <DepositCard
                            hydroAddress={this.state.walletaddress}
                        // onIdPress={this.onCopyToClipboard}
                        />
                    </View>

                    <View style={styles.middle}>
                        <View style={styles.qrcode}>
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
                    </View>

                    <View style={styles.bottom}>
                        <BTNCopy onCopyToClipboard={() => { this.onCopyToClipboard() }} />
                    </View>
                </View>
            </BgView>
        );
    }

}

const styles = StyleSheet.create({
    top: {
        height: height * 20 / 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottom: {
        position: 'absolute',
        width: width,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    middle: {
        justifyContent: 'center',
        alignItems: 'center',
        // height: height * 60 / 100,
    },

    container: {
        flex: 1,
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
export default Transfer;
