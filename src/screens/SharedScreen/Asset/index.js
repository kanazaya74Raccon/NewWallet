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
} from "react-native";
import { Paragraph } from "../../../components/Typography";
import { BgView, SecondaryHeader } from "../../../components/Layouts";
const { height, width } = Dimensions.get('window');
import { ThemeContext } from "../../../hooks/useTheme";
import Button from "../../../components/Button";

const Asset = (props) => {
    const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);
    const theme = isLightTheme ? lightTheme : darkTheme;

    return (
        <BgView>
            <SecondaryHeader.Back title="New Asset" onBackPress={props.navigation.goBack} containerStyle={styles.header} />
            <ScrollView
                contentContainerStyle={{
                    height: height - StatusBar.currentHeight
                }}>
                <View style={styles.container}>
                    <View style={styles.top}>
                        <View style={styles.formBox}>
                            <Button
                                text={"Custom Token"}
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
                                onPress={() => { props.navigation.navigate('addCustomToken') }}
                            />

                            <Button
                                text={"Native Coin"}
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
                                onPress={() => { props.navigation.navigate('nativeCoin') }}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
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
        height: height * 80 / 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottom: {
        position: 'absolute',
        width: width,
        bottom: 0,
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

export default Asset;