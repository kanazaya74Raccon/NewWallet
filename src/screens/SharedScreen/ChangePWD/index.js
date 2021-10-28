import React, { useContext } from 'react';
import {
    View,
    Dimensions,
    Platform, StatusBar, StyleSheet,
} from "react-native";
import { LabelInput } from "../../../components/Forms";
import { BgView, Header } from "../../../components/Layouts";
import Button from "../../../components/Button";
import { ThemeContext } from "../../../hooks/useTheme";
const { height, width } = Dimensions.get('window');


const ChangePWD = (props) => {
    const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);
    const theme = isLightTheme ? lightTheme : darkTheme;

    return (
        <BgView>
            <Header.Back title="Change Password" onBackPress={props.navigation.goBack} containerStyle={styles.header} />
            <View style={styles.container}>
                <View style={styles.top}>
                    <LabelInput
                        label="Old Password"
                    // value={symbol}
                    // onChangeText={(value) => setSymbol(value)}
                    />

                    <LabelInput
                        label="New Password"
                    // value={symbol}
                    // onChangeText={(value) => setSymbol(value)}
                    />

                    <LabelInput
                        label="Confirm new password"
                    // value={symbol}
                    // onChangeText={(value) => setSymbol(value)}
                    />
                </View>
                <View style={styles.bottom}>
                    <Button
                        text={"Change Password"}
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
                        onPress={() => { props.navigation.navigate('Home') }}
                    />
                </View>
            </View>
        </BgView>
    );
}

const styles = StyleSheet.create({
    pickerItem: {
        fontSize: 12,
        lineHeight: 14,
        fontFamily: 'Roboto'
    },
    label: {
        fontSize: 16,
        lineHeight: 19,
        marginBottom: 10
    },
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
export default ChangePWD;