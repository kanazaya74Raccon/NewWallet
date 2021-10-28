import React, { useContext, useEffect } from 'react';
import {
    View,
    ScrollView,
    Text,
    Dimensions,
    Platform,
    StatusBar, StyleSheet,
    Image,
    TextInput,
    ToastAndroid
} from "react-native";
import { Paragraph } from "../../../components/Typography";
import { BgView, SecondaryHeader } from "../../../components/Layouts";
const { height, width } = Dimensions.get('window');
import { ThemeContext } from "../../../hooks/useTheme";
import Button from "../../../components/Button";
import w3s from '../../../libs/Web3Service';
import { HYDRO_PRIVATE_KEY } from '../Contact';
import * as SecureStore from 'expo-secure-store';
import Web3 from 'web3';
import { ethers, } from 'ethers';
import {
    EtherWithdraw,
    Hydrodeposits,
    BNBwithdraw,
    USDTdeposits
} from "./DepositsFunc";

const Confirm = ({
    navigation,
    route
}) => {
    const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);
    const theme = isLightTheme ? lightTheme : darkTheme;
    const {
        mark,
        walletToken,
        hydroaddress,
        usd,
        fee,
        amount,
        decimals
    } = route.params;
    const [from, setFrom] = React.useState("")
    const [comments, setComments] = React.useState("")
    const [isError, setIsError] = React.useState(false)
    const [isSuccess, setIsSuccess] = React.useState(false)
    const [error, setError] = React.useState("")
    const [qrvalue, setQrvalue] = React.useState("")
    const [privatekeyValue, setPrivatekeyValue] = React.useState("")
    const [OpenScanner, setOpenScanner] = React.useState(false)
    const [balance, setBalance] = React.useState("")
    const [qrSection, setQrSection] = React.useState(false)
    const [walletaddress, setWalletaddress] = React.useState("")
    const [hydrobalance, setHydrobalance] = React.useState("")

    useEffect(() => {
        w3s.initContract();
        retrieveData();
    }, [])

    const retrieveData = async () => {
        try {
            const value = await SecureStore.getItemAsync(HYDRO_PRIVATE_KEY);
            setPrivatekeyValue(value);
            if (value !== null) {
                console.log('PrivateKey-->', value)
            }
            let currentProvider = await new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/75cc8cba22ab40b9bfa7406ae9b69a27');
            let provider = new ethers.providers.Web3Provider(currentProvider);
            let wallet = new ethers.Wallet(value, provider)
            setWalletaddress(wallet.address);
            if (value !== null) {
                console.log('PrivateKey-->', value)
            }

            const abi = await w3s.getHydroTokenABI()
            const hydrotokenaddress = await w3s.getHydroTokenAddress()
            const contract = new ethers.Contract(hydrotokenaddress, abi, wallet)

            if (mark === "HYDRO") {
                let hydrobalance = await contract.balanceOf(wallet.address);
                hydrobalance = Web3.utils.fromWei(hydrobalance.toString())
                setHydrobalance(hydrobalance)
            }
            if (mark === "ETH") {
                let etherbalance = await wallet.getBalance()
                etherbalance = Web3.utils.fromWei(etherbalance.toString())
                setHydrobalance(etherbalance)
            }

            if (mark === "BNB") {
                let currentProvider = await new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/');
                let provider = new ethers.providers.Web3Provider(currentProvider);
                let wallet = new ethers.Wallet(value, provider)
                setWalletaddress(wallet.address);
                if (value !== null) {
                    console.log('PrivateKey-->', value)
                }

                let etherbalance = await wallet.getBalance()
                etherbalance = Web3.utils.fromWei(etherbalance.toString())
                setHydrobalance(etherbalance)
            }

        } catch (error) {

        }
    }

    const submit = () => {
        switch (mark) {
            case "HYDRO":
                Hydrodeposits(privatekeyValue, hydroaddress, amount, navigation);
                break;
            case "ETH":
                EtherWithdraw(privatekeyValue, hydroaddress, amount, navigation);
                break;
            case "BNB":
                BNBwithdraw(privatekeyValue, hydroaddress, amount, navigation);
                break;
            case "USDT":
                USDTdeposits(hydroaddress, amount, privatekeyValue, walletToken, decimals, navigation);
                break;
            case "DAI":
                USDTdeposits(hydroaddress, amount, privatekeyValue, walletToken, decimals, navigation);
                break;
        }
    }

    return (
        <BgView>
            <SecondaryHeader.Back title="Review transaction" onBackPress={navigation.goBack} containerStyle={styles.header} />
            <View style={styles.container}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                        paddingBottom: width * 0.05,
                    }}>
                    <View style={styles.top}>
                        <View style={styles.ImageBox}>
                            <Image
                                style={styles.logo}
                                source={
                                    mark === 'HYDRO' ?
                                        require(`../../../assets/images/new/HYDRO.png`) :
                                        mark === 'HYDRO1' ?
                                            require(`../../../assets/images/new/HYDRO1.png`) :
                                            mark === 'BNB' ?
                                                require(`../../../assets/images/new/BNB.png`) :
                                                mark === 'ETH' ?
                                                    require(`../../../assets/images/new/ETH.png`) :
                                                    mark === 'TUSC' ?
                                                        require(`../../../assets/images/new/TUSC.png`) :
                                                        mark === 'BTC' ?
                                                            require(`../../../assets/images/new/BTC.png`) :
                                                            mark === 'USDT' ?
                                                                require(`../../../assets/images/new/USDT.png`) :
                                                                require(`../../../assets/images/new/DAI.png`)
                                }
                            />
                        </View>
                    </View>
                    <View style={styles.formBox}>
                        <Paragraph>Send Hydro To</Paragraph>
                        <View style={{ width: '100%', flexDirection: 'row' }}>
                            <TextInput
                                style={[styles.input1, {
                                    width: '100%', backgroundColor: theme.headerbackground, borderTopRightRadius: 4,
                                    borderBottomRightRadius: 4,
                                    color: isLightTheme ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)'
                                }]}
                                underlineColorAndroid="transparent"
                                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                autoCapitalize="none"
                                value={hydroaddress}
                            />
                        </View>

                        <Paragraph style={{ marginTop: 25 }}>Amount</Paragraph>
                        <View style={{ width: '100%', flexDirection: 'row' }}>
                            <TextInput
                                style={[styles.input1, {
                                    width: '80%', backgroundColor: theme.headerbackground,
                                    color: isLightTheme ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)'
                                }]}
                                underlineColorAndroid="transparent"
                                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                autoCapitalize="none"
                                value={amount}
                            />
                            <View style={[styles.vectorBox, { width: '20%', backgroundColor: theme.headerbackground, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }]}>
                                <Text style={{
                                    color: isLightTheme ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                                    fontSize: 10
                                }}>Hydro</Text>
                            </View>
                        </View>

                        <View style={{ width: '100%', flexDirection: 'row', marginBottom: 40 }}>
                            <TextInput
                                style={[styles.input1, {
                                    width: '80%', backgroundColor: theme.headerbackground,
                                    color: isLightTheme ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)'
                                }]}
                                underlineColorAndroid="transparent"
                                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                autoCapitalize="none"
                                value={usd}
                            />
                            <View style={[styles.vectorBox, { width: '20%', backgroundColor: theme.headerbackground, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }]}>
                                <Text style={{
                                    color: isLightTheme ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                                    fontSize: 10
                                }}>USD</Text>
                            </View>
                        </View>

                        <Paragraph>Fee</Paragraph>
                        <View style={{ width: '100%', flexDirection: 'row' }}>
                            <TextInput
                                style={[styles.input, {
                                    width: '100%', backgroundColor: theme.headerbackground,
                                    color: isLightTheme ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)'
                                }]}
                                underlineColorAndroid="transparent"
                                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                autoCapitalize="none"
                                value={fee}
                            />
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.bottom}>
                    <Button
                        text={"Confirm"}
                        style={{
                            backgroundColor: theme.headerbackground,
                            width: width - width * 0.10,
                            padding: 12,
                            borderRadius: 2,
                            marginVertical: 25,
                        }}
                        textStyle={{
                            color: isLightTheme ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                            fontWeight: "bold",
                            fontSize: 19,
                            letterSpacing: 0.5,
                            lineHeight: 26,
                            fontFamily: "Roboto",
                            textAlign: "center",
                        }}
                        onPress={submit}
                    />
                </View>
            </View>
        </BgView>

    );
}

const styles = StyleSheet.create({
    tbnContract_container: {
        width: '100%',
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    formBox: {
        width: '90%'
    },
    textStyle: {
        color: 'rgba(255, 255, 255, 0.5)'
    },
    button: {
        backgroundColor: '#3A3A3A',
    },
    top: {
        height: height * 20 / 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottom: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ImageBox: {
        height: width * 0.15,
    },
    logo: {
        resizeMode: "contain",
        width: width * 0.3,
        height: height * 10 / 100,

    },
    input: {
        backgroundColor: '#4e4e4e',
        borderRadius: 4,
        fontSize: 20,
        marginTop: 5,
        paddingLeft: 20,
        color: '#fff'
    },
    input1: {
        backgroundColor: '#4e4e4e',
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        fontSize: 20,
        marginTop: 5,
        paddingLeft: 20,
        color: '#fff'
    },
    vectorBox: {
        backgroundColor: '#4e4e4e',
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        fontSize: 20,
        marginTop: 5,
        paddingLeft: 20,
        color: '#fff'
    },
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
    qrcode: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: width * 0.05,
        marginBottom: width * 0.05,
        marginRight: width * 0.02,
    },

})

export default Confirm;