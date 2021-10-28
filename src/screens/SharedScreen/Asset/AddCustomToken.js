import React, { useContext } from 'react';
import {
    View,
    AsyncStorage,
    ToastAndroid,
    Dimensions,
    Platform, StatusBar, StyleSheet
} from "react-native";
import { LabelInput, LabelTextarea } from "../../../components/Forms";
import { BgView, Header } from "../../../components/Layouts";
import Button from "../../../components/Button";
import { ThemeContext } from "../../../hooks/useTheme";
const { height, width } = Dimensions.get('window');


const AddCustomToken = (props) => {

    const [contractAddress, setContractAddress] = React.useState('');
    const [decimals, setDecimals] = React.useState('');
    const [symbol, setSymbol] = React.useState('');

    const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);
    const theme = isLightTheme ? lightTheme : darkTheme;

    const handleAddCustomToken = async () => {
        if (!contractAddress)
            return ToastAndroid.show("Contract Address Is Required", ToastAndroid.LONG);
        if (!symbol)
            return ToastAndroid.show("Symbol Is Required", ToastAndroid.LONG);
        if (!decimals)
            return ToastAndroid.show("Decimals Is Required", ToastAndroid.LONG);
        let objCustomToken = {
            contractAddress: contractAddress,
            decimals: decimals,
            symbol: symbol
        }
        await AsyncStorage.setItem("customToken", JSON.stringify(objCustomToken))
        props.navigation.goBack()

    }

    return (
        <BgView>
            <Header.Back title="Add Custom Token" onBackPress={props.navigation.goBack} containerStyle={styles.header} />
            <View style={styles.container}>
                <View style={styles.top}>
                    <View style={{ paddingVertical: width * 0.02 }} />
                    <LabelTextarea
                        label="Token Contract"
                        placeholder="Tap to edit..."
                        value={contractAddress}
                        onChangeText={(value) => setContractAddress(value)}
                    />
                    <LabelInput
                        label="Symbol"
                        placeholder="Tap to edit..."
                        value={symbol}
                        onChangeText={(value) => setSymbol(value)}
                    />
                    <LabelInput
                        label="Decimals"
                        placeholder="Tap to edit..."
                        value={decimals}
                        onChangeText={(value) => setDecimals(value)}
                    />
                </View>
                <View style={styles.bottom}>
                    <Button
                        text={"Add"}
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
                        onPress={handleAddCustomToken}
                    />
                </View>
            </View>
        </BgView>
    );
}

const styles = StyleSheet.create({
    top: {
        height: height * 80 / 100,
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
export default AddCustomToken;