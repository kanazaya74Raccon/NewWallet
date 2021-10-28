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

const Deposits = ({ navigation, route }) => {
    const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);
    const theme = isLightTheme ? lightTheme : darkTheme;
    const { mark, walletToken, decimals } = route.params;
    const [hydroaddress, setHydroaddress] = React.useState("")
    const [amount, setAmount] = React.useState(0)
    const [usd, setUSD] = React.useState(0)
    const [fee, setFee] = React.useState(0)

    return (
        <BgView>
            <SecondaryHeader.Back title="Send transaction" onBackPress={navigation.goBack} containerStyle={styles.header} />

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
                                style={[styles.input1, { width: '80%', backgroundColor: theme.headerbackground, color: isLightTheme ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)' }]}
                                underlineColorAndroid="transparent"
                                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                autoCapitalize="none"
                                value={hydroaddress}
                                onChangeText={text => { setHydroaddress(text) }}
                            />
                            <View style={[styles.vectorBox, { width: '20%', backgroundColor: theme.headerbackground, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }]}>
                                <Image source={require("../../../assets/images/new/Vector.png")} />
                            </View>
                        </View>
                        <View style={styles.tbnContract_container}>
                            <Button
                                text={"Contact"}
                                style={{
                                    borderRadius: 2,
                                    backgroundColor: theme.headerbackground,
                                    width: 70,
                                    height: 25,
                                    marginVertical: 5,
                                    padding: 0
                                }}
                                textStyle={{
                                    fontWeight: "bold",
                                    letterSpacing: 0.5,
                                    lineHeight: 26,
                                    fontFamily: "Roboto",
                                    textAlign: "center",
                                    fontSize: 10,
                                    color: isLightTheme ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                                }}
                            />
                        </View>

                        <Paragraph>Amount</Paragraph>
                        <View style={{ width: '100%', flexDirection: 'row' }}>
                            <TextInput
                                style={[styles.input1, { width: '80%', backgroundColor: theme.headerbackground, color: isLightTheme ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)' }]}
                                underlineColorAndroid="transparent"
                                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                autoCapitalize="none"
                                keyboardType={'number-pad'}
                                value={amount}
                                onChangeText={text => { setAmount(text) }}
                            />
                            <View style={[styles.vectorBox, { width: '20%', backgroundColor: theme.headerbackground, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }]}>
                                <Text style={{
                                    color: isLightTheme ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                                    fontSize: 10
                                }}>Hydro</Text>
                            </View>
                        </View>

                        <View style={{ width: '100%', flexDirection: 'row' }}>
                            <TextInput
                                style={[styles.input1, { width: '80%', backgroundColor: theme.headerbackground, color: isLightTheme ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)' }]}
                                underlineColorAndroid="transparent"
                                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                autoCapitalize="none"
                                keyboardType={'number-pad'}
                                value={usd}
                                onChangeText={text => { setUSD(text) }}
                            />
                            <View style={[styles.vectorBox, { width: '20%', backgroundColor: theme.headerbackground, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }]}>
                                <Text style={{
                                    color: isLightTheme ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                                    fontSize: 10
                                }}>USD</Text>
                            </View>
                        </View>
                        <View style={styles.tbnContract_container}>
                            <Button
                                text={"Half"}
                                style={{
                                    borderRadius: 2,
                                    backgroundColor: theme.headerbackground,
                                    width: 70,
                                    height: 25,
                                    marginVertical: 5,
                                    marginRight: 5,
                                    padding: 0
                                }}
                                textStyle={{
                                    fontWeight: "bold",
                                    letterSpacing: 0.5,
                                    lineHeight: 26,
                                    fontFamily: "Roboto",
                                    textAlign: "center",
                                    fontSize: 10,
                                    color: isLightTheme ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                                }}
                            />
                            <Button
                                text={"All"}
                                style={{
                                    borderRadius: 2,
                                    backgroundColor: theme.headerbackground,
                                    width: 70,
                                    height: 25,
                                    marginVertical: 5,
                                    padding: 0
                                }}
                                textStyle={{
                                    fontWeight: "bold",
                                    letterSpacing: 0.5,
                                    lineHeight: 26,
                                    fontFamily: "Roboto",
                                    textAlign: "center",
                                    fontSize: 10,
                                    color: isLightTheme ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                                }}
                            />
                        </View>

                        <Paragraph>Fee</Paragraph>
                        <View style={{ width: '100%', flexDirection: 'row' }}>
                            <TextInput
                                style={[styles.input, { width: '100%', backgroundColor: theme.headerbackground, color: isLightTheme ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)' }]}
                                underlineColorAndroid="transparent"
                                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                autoCapitalize="none"
                                value={fee}
                                onChangeText={text => { setFee(text) }}
                            />
                        </View>
                        <View style={styles.tbnContract_container}>
                            <Button
                                text={"Advanced"}
                                style={{
                                    borderRadius: 2,
                                    backgroundColor: theme.headerbackground,
                                    width: 70,
                                    height: 25,
                                    marginVertical: 5,
                                    padding: 0
                                }}
                                textStyle={{
                                    fontWeight: "bold",
                                    letterSpacing: 0.5,
                                    lineHeight: 26,
                                    fontFamily: "Roboto",
                                    textAlign: "center",
                                    fontSize: 10,
                                    color: isLightTheme ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                                }}
                            />
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.bottom}>
                    <Button
                        text={"Send"}
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
                        onPress={() => {
                            navigation.navigate('depositsConfirm', {
                                mark: mark,
                                walletToken: walletToken,
                                decimals: decimals,
                                hydroaddress: hydroaddress,
                                amount: amount,
                                usd: usd,
                                fee: fee
                            })
                        }}
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

export default Deposits;