import React, { Component } from 'react';
import {
    View,
    ScrollView,
    KeyboardAvoidingView,
    TouchableOpacity,
    ToastAndroid,
    Dimensions,
    Platform, StatusBar, StyleSheet
} from "react-native";

import {useContext} from "react"

import { LabelInput } from "../../../components/Forms";
import { BgView, Header } from "../../../components/Layouts";
import Button from "../../../components/Button";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as SecureStore from 'expo-secure-store';
const { height, width } = Dimensions.get('window');
import ERC20Token from "../../../contracts/ERC20Token.json"
import { Contract, ethers } from 'ethers';

class AddCustomToken extends Component {

    state = {
        contractAddress: "",
        decimals: "",
        symbol: ""
    }

    getTokenSymbolAndDecimals = async() => {
        if (!this.state.contractAddress)
            return ToastAndroid.show("Contract Address Is Required", ToastAndroid.LONG);
        const contractAddress = this.state.contractAddress
        const abi = ERC20Token.abi

        const provider = ethers.getDefaultProvider();
        var erc20;
        try {
            erc20 = new ethers.Contract(contractAddress, abi, provider)
        } catch (e) {
            console.log('error', e)
            return
        }

        try {
            const decimals = await erc20.decimals()
            console.log(typeof(decimals))
            const symbol = await erc20.symbol()
            console.log(symbol)
        } catch (error) {
            console.log(error)
        }
        await this.setState({
            symbol: symbol,
            decimals: String(decimals)
        })


    }

    addCustomToken = async () => {
        if (!this.state.contractAddress)
            return ToastAndroid.show("Contract Address Is Required", ToastAndroid.LONG);
        if (!this.state.symbol)
            return ToastAndroid.show("Symbol Is Required", ToastAndroid.LONG);
        if (!this.state.decimals)
            return ToastAndroid.show("Decimals Is Required", ToastAndroid.LONG);
        let objCustomToken = {
            contractAddress: this.state.contractAddress,
            decimals: this.state.decimals,
            symbol: this.state.symbol
        }
        var customtokens = await SecureStore.getItemAsync("customToken")
        console.log(customtokens)
        if (!customtokens) {
            let customtokens = {'tokens': [objCustomToken]}
            await SecureStore.setItemAsync("customToken", JSON.stringify(customtokens))
        } else {
            customtokens = JSON.parse(customtokens)
            customtokens['tokens'].push(objCustomToken)
            await SecureStore.setItemAsync("customToken", JSON.stringify(customtokens))
        }
        
        this.props.navigation.goBack()

    }

    render() {

        return (
            <BgView>
                <Header.Back title="Add Custom Token" onBackPress={this.props.navigation.goBack} containerStyle={styles.header} />
                <View style={styles.container}>
                    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ paddingVertical: width * 0.02 }} />
                        <LabelInput
                            label="Contract Address"
                            placeholder="Contract Address"
                            value={this.state.contractAddress}
                            onChangeText={(value) => this.setState({ contractAddress: value })}
                        />

                        <View style={styles.button}>
                            <Button text="Get token data" onPress={this.getTokenSymbolAndDecimals} />
                        </View>

                        <LabelInput
                            label="Symbol"
                            placeholder=""
                            value={this.state.symbol}
                        />
                        <LabelInput
                            label="Decimals"
                            placeholder=""
                            value={this.state.decimals}
                        />

                        <View style={styles.button}>
                            <Button text="Add Token" onPress={this.addCustomToken} />
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
        paddingVertical: width * 0.05
    }

})

export default AddCustomToken;