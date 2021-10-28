import React, { useContext, useState } from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
const { height, width } = Dimensions.get('window');
import { Paragraph } from "../../components/Typography";
import Button from "../../components/Button";
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/RootStackParams';
import { ethers } from "ethers";
import * as SecureStore from 'expo-secure-store';
import { HYDRO_PRIVATE_KEY, MNEMONIC_KEY, HYDRO_WALLET_ADDRESS } from '../../constants';
import bip39 from 'react-native-bip39';
import Spinner from 'react-native-loading-spinner-overlay';
import { ThemeContext } from "../../hooks/useTheme";
import Clipboard from "@react-native-clipboard/clipboard";

interface Props extends StackScreenProps<RootStackParams, 'Mnemonic'> { };

const Mnemonic = ({ navigation }: Props) => {
    const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);
    const [mnemonic, setMnemonic] = useState('');
    const [spinner, setSpinner] = useState(false);
    const theme = isLightTheme ? lightTheme : darkTheme;

    const onSubmit = async () => {
        if (!mnemonic) return;
        navigation.navigate("Password");
    };

    const copyMnemonic = () => {
        console.log(mnemonic);
        if (!mnemonic) return;
        Clipboard.setString(mnemonic);
    }

    const createWallet = async () => {
        if (mnemonic) return;

        setSpinner(true);
        try {
            const mnemonicTMP = await bip39.generateMnemonic(128);
            const wallet = ethers.Wallet.fromMnemonic(mnemonicTMP);

            const privateKey = wallet.privateKey;
            const walletAddress = wallet.address;

            await SecureStore.setItemAsync(MNEMONIC_KEY, mnemonicTMP);
            await SecureStore.setItemAsync(HYDRO_PRIVATE_KEY, privateKey);
            await SecureStore.setItemAsync(HYDRO_WALLET_ADDRESS, walletAddress);

            setMnemonic(mnemonicTMP);
        } catch (error) {
            console.log(error.message);
        }
        setSpinner(false);
    };

    return (

        <View style={styles.container}>
            <Spinner visible={spinner} small={'small'} color={theme.primary} />
            <View style={styles.top}>
                <View style={styles.ImageBox}>
                    <Image style={styles.logo} source={require("../../assets/images/new/logo.png")} />
                </View>
            </View>

            <View style={styles.middle}>
                <Paragraph style={styles.paragraph}>
                    Now we will generate 12 words for you, this is your mnemonic seed which can be used to restore your wallet. Make sure to backup your seed and keep it safe.
                    </Paragraph>
                <Button
                    onPress={createWallet}
                    text="Generate Mnemonic Seed"
                    style={styles.button_generate}
                />
                <View style={styles.mnermonicKey_container}>
                    <Paragraph style={styles.mnermonicKey}>
                        {mnemonic}
                    </Paragraph>
                </View>
                <View style={styles.tbnCopy_container}>
                    <Button
                        text="Copy Mnemonic"
                        onPress={copyMnemonic}
                        style={styles.button_copy}
                    />
                </View>
            </View>
            <View style={styles.bottom}>
                <Button text="Next"
                    onPress={onSubmit}
                    style={styles.button}
                    textStyle={styles.textStyle}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mnermonicKey_container: {
        width: '90%',
        backgroundColor: '#4e4e4e',
        padding: 10,
    },
    tbnCopy_container: {
        width: '90%',
        alignItems: 'flex-end'
    },
    button_copy: {
        backgroundColor: '#3D4B66',
        width: 200
    },
    button_generate: {
        backgroundColor: '#3D4B66',
    },
    textStyle: {
        color: 'rgba(255, 255, 255, 0.5)'
    },
    button: {
        backgroundColor: '#4e4e4e',
    },
    container: {
        flex: 1,
        backgroundColor: '#373737'
    },

    top: {
        height: height * 20 / 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 0.02,
    },

    ImageBox: {
        height: width * 0.15,
    },

    logo: {
        resizeMode: "contain",
        width: width * 0.3,
        height: height * 10 / 100,

    },

    middle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: height * 60 / 100,
    },

    bottom: {
        position: 'absolute',
        width: width,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },

    hydro: {
        width: width * 0.5,
        height: width * 0.5,
        resizeMode: "contain",
    },

    testVersion: {
        textAlign: "center",
        paddingTop: width * 0.03,
    },

    paragraph: {
        textAlign: "center",
        paddingHorizontal: width * 0.05,
        color: 'rgba(255, 255, 255, 0.5)'
    },
    mnermonicKey: {
        paddingHorizontal: width * 0.05,
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: 24,
        minHeight: height * 0.15,
        textAlign: 'justify',
        fontFamily: 'Roboto Mono'
    },
    recover: {
        marginTop: -5,
        backgroundColor: '#4e4e4e',
        color: 'rgba(255, 255, 255, 0.5)'
    }
})

export default Mnemonic;
