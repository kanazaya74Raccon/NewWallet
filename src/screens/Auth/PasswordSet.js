import React from "react";
import {
    View,
    Image,
    StyleSheet,
    Dimensions,
    TextInput,
    ScrollView,
    StatusBar
} from "react-native";
const { height, width } = Dimensions.get('window');
import { Paragraph } from "../../components/Typography";
import Button from "../../components/Button";
import { HYDRO_PRIVATE_KEY, HYDRO_WALLET_ADDRESS } from '../../constants';
import * as SecureStore from 'expo-secure-store';

const PasswordSet = ({ navigation }) => {

    const onSubmit = async () => {
        const hydroId = await SecureStore.getItemAsync(HYDRO_PRIVATE_KEY);
        const address = await SecureStore.getItemAsync(HYDRO_WALLET_ADDRESS);
        navigation.navigate("App", { screen: "Home", params: { address, hydroId } });
    };

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <View style={styles.ImageBox}>
                    <Image style={styles.logo} source={require("../../assets/images/new/logo.png")} />
                </View>
            </View>
            <View style={styles.middle}>
                <View>
                    <Paragraph style={styles.paragraphTitle}>Password set!</Paragraph>
                </View>
                <Paragraph style={styles.paragraph}>
                    Now you wallet has been generated, encrypted and you have made a backup of your mnemonic seed. Great!
                    </Paragraph>

                <Paragraph style={styles.paragraph}>
                    To claim your Hydro ID you must first make a deposit to the wallet in order to cover the gas fees required by the public blockchains.
                    </Paragraph>

                <Paragraph style={styles.paragraph}>
                    Once you have made your first deposit, head on over to the settings to claim your Hydro ID.
                    </Paragraph>
            </View>
            <View style={styles.bottom}>
                <Button text="Okay, i understand"
                    onPress={onSubmit}
                    style={styles.button}
                    textStyle={styles.textStyle}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
        // height: height * 60 / 100,
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
        paddingHorizontal: width * 0.05,
        color: 'rgba(255, 255, 255, 0.5)',
        fontFamily: 'Roboto',
        marginBottom: height * 0.025
    },
    paragraphTitle: {
        paddingHorizontal: width * 0.05,
        color: 'rgba(255, 255, 255, 0.5)',
        fontFamily: 'Roboto',
        fontSize: height * 0.04,
        marginBottom: height * 0.05
    }
})

export default PasswordSet;
