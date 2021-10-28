import React, { useEffect } from "react";
import {
    View,
    Image,
    StyleSheet,
    Dimensions,
    TextInput,
    ScrollView,
    ToastAndroid
} from "react-native";
const { height, width } = Dimensions.get('window');
import { Paragraph } from "../../components/Typography";
import Button from "../../components/Button";
import * as SecureStore from 'expo-secure-store';
import Toast from 'react-native-toast-message';
import CryptoJS from "react-native-crypto-js";
import { HYDRO_PRIVATE_KEY, HYDRO_WALLET_ADDRESS, PASSWORD, ENCRYPTEDKEY } from '../../constants';

const Password = ({ navigation }) => {
    const [privateKey, setPrivateKey] = React.useState('');
    const [publicKey, setPublicKey] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [repassword, setRepassword] = React.useState('');

    useEffect(() => {
        (async () => {
            setPrivateKey(await SecureStore.getItemAsync(HYDRO_PRIVATE_KEY));
            setPublicKey(await SecureStore.getItemAsync(HYDRO_WALLET_ADDRESS));
        })();
    }, [])

    const onSubmit = async () => {
        if (password === '')
            ToastAndroid.show("Please input the password!", ToastAndroid.SHORT);
        else {
            if (password !== repassword)
                ToastAndroid.show("Please confirm the password!", ToastAndroid.SHORT);
            else {
                await SecureStore.setItemAsync(PASSWORD, password);
                var encryptKey = CryptoJS.AES.encrypt(password, privateKey).toString();
                await SecureStore.setItemAsync(ENCRYPTEDKEY, encryptKey);
                navigation.navigate("PasswordSet");
            }
        }
    };

    return (
        <ScrollView
            contentContainerStyle={{
                height: height
            }}>
            <View style={styles.container}>
                <View style={styles.top}>
                    <View style={styles.ImageBox}>
                        <Image style={styles.logo} source={require("../../assets/images/new/logo.png")} />
                    </View>
                </View>
                <View style={styles.middle}>
                    <View>
                        <View style={styles.titleBox}>
                            <Paragraph style={styles.paragraph}>Private Key</Paragraph>
                        </View>
                        <View style={styles.keyBox}>
                            <Paragraph style={styles.paragraphKey}>
                                {privateKey}
                            </Paragraph>
                        </View>
                    </View>
                    <View>
                        <View style={styles.titleBox}>
                            <Paragraph style={styles.paragraph}>Public Key</Paragraph>
                        </View>
                        <View style={styles.keyBox}>
                            <Paragraph style={styles.paragraphKey}>
                                {publicKey}
                            </Paragraph>
                        </View>
                    </View>
                    <View style={styles.formBox}>
                        <Paragraph style={styles.paragraphKey}>Password</Paragraph>
                        <TextInput
                            style={styles.input}
                            underlineColorAndroid="transparent"
                            placeholderTextColor="rgba(255, 255, 255, 0.5)"
                            autoCapitalize="none"
                            placeholder="Enter password.."
                            value={password}
                            onChangeText={text => { setPassword(text) }}
                            secureTextEntry={true}
                        />
                        <TextInput
                            style={styles.input}
                            underlineColorAndroid="transparent"
                            placeholderTextColor="rgba(255, 255, 255, 0.5)"
                            autoCapitalize="none"
                            placeholder="Confirm.."
                            value={repassword}
                            onChangeText={text => setRepassword(text)}
                            secureTextEntry={true}
                        />
                    </View>
                </View>
                <View style={styles.bottom}>
                    <Button text="Set Password"
                        onPress={onSubmit}
                        style={styles.button}
                        textStyle={styles.textStyle}
                    />
                </View>
                <Toast ref={(ref) => Toast.setRef(ref)} />
            </View>
        </ScrollView >
    );
};

const styles = StyleSheet.create({
    formBox: {
        width: '90%',
        marginTop: height * 0.025
    },
    input: {
        backgroundColor: '#4e4e4e',
        borderRadius: 4,
        fontSize: height * 0.025,
        marginTop: 5,
        paddingLeft: height * 0.025,
        color: '#fff'
    },
    keyBox: {
        backgroundColor: '#4e4e4e',
        padding: height * 0.015,
        marginHorizontal: height * 0.025
    },
    titleBox: {
        marginVertical: height * 0.015
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
        bottom: height * 0.04,
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
        color: '#fff',
        fontFamily: 'Roboto',
        fontSize: height * 0.025
    },
    paragraphKey: {
        color: '#fff',
        fontFamily: 'Roboto',
        fontSize: height * 0.025
    },
})

export default Password;
