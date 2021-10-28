import React, { useEffect } from "react";
import * as SecureStore from 'expo-secure-store';
import LoadingView from 'react-native-loading-view'
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../../navigation/RootStackParams";
import { HYDRO_WALLET_ADDRESS, HYDRO_PRIVATE_KEY } from '../../constants';

interface Props extends StackScreenProps<RootStackParams, 'Validation'> { };

const Validation = ({ navigation }: Props) => {
  useEffect(() => {
    (async () => {
      // const hydroId = await SecureStore.getItemAsync(HYDRO_ID_KEY);
      // const address = await SecureStore.getItemAsync(HYDRO_WALLET_ADDRESS);
      const hydroId = await SecureStore.getItemAsync(HYDRO_PRIVATE_KEY);
      const address = await SecureStore.getItemAsync(HYDRO_WALLET_ADDRESS);

      if (address !== null) {
        navigation.navigate("App", { screen: "Home", params: { address, hydroId } })
      } else {
        navigation.navigate("Landing");
      }
    })();
  }, [])

  return (
    <LoadingView loading={true} >
    </LoadingView>
  );
};

export default Validation;
