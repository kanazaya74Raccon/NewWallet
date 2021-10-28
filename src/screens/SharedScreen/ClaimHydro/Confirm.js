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
const { height, width } = Dimensions.get('window');


const ClaimHydroConfirm = (props) => {

    const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);
    const theme = isLightTheme ? lightTheme : darkTheme;

    return (
        <BgView>
            <Header.Back title="Claim Hydro ID" onBackPress={props.navigation.goBack} containerStyle={styles.header} />
            <View style={styles.container}>
                <View style={styles.top}>
                    <Image
                        style={styles.logo}
                        source={
                            require(`../../../assets/images/new/claimHydro.png`)
                        }
                    />
                </View>
                <View style={styles.middle}>
                    <LabelInput
                        label="Hydro ID"
                    // value={symbol}
                    // onChangeText={(value) => setSymbol(value)}
                    />

                    <LabelTextarea
                        label="Address"
                    // value={contractAddress}
                    // onChangeText={(value) => setContractAddress(value)}
                    />

                    <LabelInput
                        label="Gasfee"
                    // value={decimals}
                    // onChangeText={(value) => setDecimals(value)}
                    />
                </View>
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
    top: {
        height: height * 20 / 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    middle: {
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
export default ClaimHydroConfirm;