import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
const { height, width } = Dimensions.get('window');
import { Paragraph } from "../../../components/Typography";
import Button from "../../../components/Button";
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from "../../../navigation/RootStackParams";

interface Props extends StackScreenProps<RootStackParams, 'Register'> { };

const Register = ({ navigation }: Props) => {

    const onSubmit = async () => {
        navigation.navigate("Create");
    };

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <View style={styles.ImageBox}>
                    <Image style={styles.logo} source={require("../../../assets/images/new/logo.png")} />
                </View>
            </View>
            <View style={styles.middle}>
                <Image style={styles.hydro} source={require("../../../assets/images/new/2.png")} />
                <Paragraph style={styles.paragraph}>
                    Using our Snowflake protocol, we secure your unique identinty on the blockchain.
                </Paragraph>
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
    button: {
        backgroundColor: '#4e4e4e',
        color: 'rgba(255, 255, 255, 0.5)'
    },
    container: {
        flex: 1,
        backgroundColor: '#373737'
    },
    textStyle: {
        color: 'rgba(255, 255, 255, 0.5)'
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
        bottom: width * 0.03,
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
        marginTop: width * 0.1,
        paddingHorizontal: width * 0.05,
        color: 'rgba(255, 255, 255, 0.5)'
    },

    recover: {
        marginTop: -5,
        backgroundColor: '#4e4e4e',
        color: 'rgba(255, 255, 255, 0.5)'
    }
})

export default Register;
