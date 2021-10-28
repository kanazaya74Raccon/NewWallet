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

const AddContact = (props) => {
    const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);
    const theme = isLightTheme ? lightTheme : darkTheme;

    return (
        <BgView>
            <SecondaryHeader.Back title="Send transaction" onBackPress={props.navigation.goBack} containerStyle={styles.header} />
            <ScrollView
                contentContainerStyle={{
                    height: height - height * 0.15
                }}>
                <View style={styles.container}>
                    <View style={styles.top}>
                        <View style={styles.formBox}>
                            <Paragraph>Name</Paragraph>
                            <View style={{ width: '100%', flexDirection: 'row' }}>
                                <TextInput
                                    style={[styles.input, { width: '100%', backgroundColor: theme.headerbackground }]}
                                    underlineColorAndroid="transparent"
                                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                    autoCapitalize="none"
                                // value={this.state.name}
                                // onChangeText={text => { this.handleChangename(text) }}
                                />
                            </View>

                            <Paragraph>Wallet address</Paragraph>
                            <View style={{ width: '100%', flexDirection: 'row' }}>
                                <TextInput
                                    style={[styles.input1, { width: '80%', backgroundColor: theme.headerbackground }]}
                                    underlineColorAndroid="transparent"
                                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                    autoCapitalize="none"
                                // value={this.state.name}
                                // onChangeText={text => { this.handleChangename(text) }}
                                />
                                <View style={[styles.vectorBox, { width: '20%', backgroundColor: theme.headerbackground, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }]}>
                                    <Image source={require("../../../assets/images/new/Vector.png")} />
                                </View>
                            </View>

                            <Paragraph>Note</Paragraph>
                            <View style={{ width: '100%', flexDirection: 'row' }}>
                                <TextInput
                                    style={[styles.input, { width: '100%', backgroundColor: theme.headerbackground }]}
                                    underlineColorAndroid="transparent"
                                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                    autoCapitalize="none"
                                // value={this.state.name}
                                // onChangeText={text => { this.handleChangename(text) }}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.bottom}>
                        <Button
                            text={"Save"}
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
                            onPress={() => { props.navigation.navigate('Home') }}
                        />
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
        marginTop: height * 0.05
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

export default AddContact;