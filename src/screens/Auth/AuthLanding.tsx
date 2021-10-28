import React from "react";
import Button from "../../components/Button";
import * as SecureStore from 'expo-secure-store';
const { height, width } = Dimensions.get('window');
import { Paragraph } from "../../components/Typography";
import { StackScreenProps } from '@react-navigation/stack';
import { HYDRO_ID_KEY, WALLET_ADDRESS } from '../../constants';
import { View, Image, StyleSheet, Dimensions } from "react-native";
import { RootStackParams } from "../../navigation/RootStackParams";

interface Props extends StackScreenProps<RootStackParams, 'AuthLanding'> { };

const AuthLanding = ({ navigation }: Props) => {

  const onSubmit = async () => {
    const address = await SecureStore.getItemAsync(HYDRO_ID_KEY);
    const hydroId = await SecureStore.getItemAsync(WALLET_ADDRESS);

    if (address && hydroId !== null) {
      navigation.navigate("App", { screen: "home", params: { address, hydroId } });
    } else {
      navigation.navigate("Register");
    }
  };

  const recover = () => {
    navigation.navigate("Recover");
  };


  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.ImageBox}>
          <Image style={styles.logo} source={require("../../assets/images/new/logo.png")} />
        </View>
      </View>
      <View style={styles.middle}>
        <Image style={styles.hydro} source={require("../../assets/images/new/1.png")} />
        <Paragraph style={styles.paragraph}>
          Register now to create your digital identity, transact and use the hydro
          protocols to secure who you are online.
        </Paragraph>
      </View>
      <View style={styles.bottom}>
        <Button text="Get Started"
          onPress={onSubmit}
          style={styles.button}
          textStyle={styles.textStyle}
        />
        <Button
          text="Recover"
          onPress={recover}
          style={styles.recover}
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
    height: height * 15 / 100,
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
    // marginTop: width * 0.2,
    paddingHorizontal: width * 0.05,
    color: 'rgba(255, 255, 255, 0.5)'
  },

  recover: {
    marginTop: -5,
    backgroundColor: '#4e4e4e',
    color: 'rgba(255, 255, 255, 0.5)'
  }
})

export default AuthLanding;
