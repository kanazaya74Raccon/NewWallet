import React, { useContext } from 'react';
import {
    View,
    Image,
    Dimensions,
    Platform, StatusBar, StyleSheet
} from "react-native";
import { LabelInput, LabelTextarea } from "../../../components/Forms";
import { BgView, Header } from "../../../components/Layouts";
import Button from "../../../components/Button";
import { ThemeContext } from "../../../hooks/useTheme";
import { Paragraph } from "../../../components/Typography";
const { height, width } = Dimensions.get('window');


const ExportKeysConfirm = (props) => {

    const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);
    const theme = isLightTheme ? lightTheme : darkTheme;

    return (
        <BgView>
            <Header.Back title="Export Keys" onBackPress={props.navigation.goBack} containerStyle={styles.header} />
            <View style={styles.container}>
                <View style={styles.top}>
                    <LabelInput
                        label="Public Key"
                    // value={symbol}
                    // onChangeText={(value) => setSymbol(value)}
                    />

                    <LabelInput
                        label="Private Key"
                    // value={decimals}
                    // onChangeText={(value) => setDecimals(value)}
                    />

                    <LabelTextarea
                        label="Private Key"
                    // value={contractAddress}
                    // onChangeText={(value) => setContractAddress(value)}
                    />
                </View>
                <View style={styles.middle}>
                    <Paragraph style={styles.text}>Keep these keys securely offline and dont share them with anyone.</Paragraph>
                </View>
                <View style={styles.bottom}>
                    <Button
                        text={"I understand"}
                        style={{
                            backgroundColor: theme.headerbackground,
                            width: width - width * 0.10,
                            padding: 12,
                            borderRadius: 2,
                            marginVertical: 25,
                        }}
                        textStyle={{
                            color: isLightTheme ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                            fontWeight: "normal",
                            fontSize: 16,
                            letterSpacing: 0.5,
                            lineHeight: 19,
                            fontFamily: "Roboto",
                            textAlign: "center",
                        }}
                        onPress={() => props.navigation.navigate('Home')}
                    />
                </View>
            </View>
        </BgView>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        fontStyle: 'normal',
        lineHeight: 28,
        fontFamily: 'Roboto'
    },
    top: {
        height: height * 50 / 100,
        justifyContent: 'center',
        // alignItems: 'center',
        width: '100%'
    },
    middle: {
        height: height * 50 / 100,
        marginTop: height * 0.05,
        width: '100%'
    },
    bottom: {
        position: 'absolute',
        width: width,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        resizeMode: "contain"
    },
    container: {
        flex: 1,
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
        paddingVertical: width * 0.05
    }

})
export default ExportKeysConfirm;