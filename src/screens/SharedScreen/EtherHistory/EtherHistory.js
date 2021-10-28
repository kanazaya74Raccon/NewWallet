import React, { useContext, useEffect } from 'react';
import {
    View,
    ScrollView,
    Dimensions,
    Platform,
    StatusBar, StyleSheet,
    Image,
} from "react-native";
import { Paragraph } from "../../../components/Typography";
import { BgView, SecondaryHeader } from "../../../components/Layouts";
const { height, width } = Dimensions.get('window');
import { ThemeContext } from "../../../hooks/useTheme";
import Button from './Button';
import Item from '../../../components/Item';
import {
    bnbhistory,
    tokenhistory
} from "./HistoryFunc";
import { HYDRO_PRIVATE_KEY } from '../../../constants';
import * as SecureStore from 'expo-secure-store';

const _spender = "0xA123cl23sE90f011f34FDddC7c5A07800F87h2";

const Items = [
    { value1: '- 111.00 HYDRO', value2: '- 20.00 USD' },
    { value1: '- 111.00 HYDRO', value2: '- 20.00 USD' },
    { value1: '- 111.00 HYDRO', value2: '- 20.00 USD' },
    { value1: '- 111.00 HYDRO', value2: '- 20.00 USD' },
    { value1: '- 111.00 HYDRO', value2: '- 20.00 USD' }
]

const History = ({ route, navigation }) => {
    const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);
    const theme = isLightTheme ? lightTheme : darkTheme;
    const { mark, decimals, walletToken, provider } = route.params;
    const [statusFlag, setStatusFlag] = React.useState('Sent')
    const [items, setItems] = React.useState([]);
    const [privatekeyValue, setPrivatekeyValue] = React.useState('')

    const handlegetPrivatekeyValue = async () => {
        const value = await SecureStore.getItemAsync(HYDRO_PRIVATE_KEY);
        setPrivatekeyValue(value)
    }

    useEffect(() => {
        handlegetPrivatekeyValue();
        switch (mark) {
            case "BNB":
                var history = bnbhistory(walletToken, setItems)
                break;
            case "USDT":
            case "DAI":
                console.log(provider, privatekeyValue, walletToken)
                tokenhistory(provider, privatekeyValue, walletToken, setItems)
                break;
            default:
                setItems(Items)
                break;
        }
    }, [privatekeyValue])

    const handleChangeStatus = (status) => {
        setStatusFlag(status)
    }

    return (
        <BgView>
            <SecondaryHeader.Back title={`${mark} History`} onBackPress={navigation.goBack} containerStyle={styles.header} />
            <View style={styles.container}>
                <View style={styles.top}>
                    <View style={[styles.ImageBox, { backgroundColor: theme.headerbackground }]}>
                        <Image
                            style={styles.logo}
                            source={
                                mark === 'HYDRO' ?
                                    require(`../../../assets/images/new/HYDRO.png`) :
                                    mark === 'HYDRO1' ?
                                        require(`../../../assets/images/new/HYDRO1.png`) :
                                        mark === 'BNB' ?
                                            require(`../../../assets/images/new/BNB.png`) :
                                            mark === 'ETH' ?
                                                require(`../../../assets/images/new/ETH.png`) :
                                                mark === 'TUSC' ?
                                                    require(`../../../assets/images/new/TUSC.png`) :
                                                    mark === 'BTC' ?
                                                        require(`../../../assets/images/new/BTC.png`) :
                                                        mark === 'USDT' ?
                                                            require(`../../../assets/images/new/USDT.png`) :
                                                            require(`../../../assets/images/new/DAI.png`)
                            }
                        />
                        <Paragraph>{_spender}</Paragraph>
                    </View>
                    <View style={styles.rowBox}>
                        <Button
                            style={styles.btnSmall}
                            title="Sent"
                            textStyle={styles.btnSmallTXT}
                            onPress={handleChangeStatus}
                            status={statusFlag}
                        />
                        <Button
                            style={styles.btnSmall}
                            title="Recieved"
                            textStyle={styles.btnSmallTXT}
                            onPress={handleChangeStatus}
                            status={statusFlag}
                        />
                        <Button
                            style={styles.btnSmall}
                            title="Pending"
                            textStyle={styles.btnSmallTXT}
                            onPress={handleChangeStatus}
                            status={statusFlag}
                        />
                    </View>
                </View>
                <View style={styles.middle}>
                    <ScrollView>
                        {
                            items.map((val, index) => {
                                return (
                                    <Item
                                        catagoryLabel={statusFlag}
                                        value={val.value1}
                                        key={index}
                                    />
                                )
                            })
                        }
                    </ScrollView>
                </View>
                <View style={styles.bottom}>
                    <Button
                        style={styles.btnOpen}
                        title="Open in blockexplorer"
                        textStyle={styles.btnOpenTXT}
                        onPress={() => { console.log('title') }}
                    />
                </View>
            </View>
        </BgView>

    );
}

const styles = StyleSheet.create({
    rowBox: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    btnSmall: {
        width: 115,
        borderRadius: 2,
        marginTop: 5,
        height: 30,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    btnSmallTXT: {
        fontSize: 13
    },
    btnOpen: {
        width: width - width * 0.10,
        padding: 12,
        borderRadius: 2,
        marginVertical: 25,
    },
    btnOpenTXT: {
        fontWeight: "normal",
        fontSize: 20,
        lineHeight: 26
    },
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
        height: height * 20 / 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    middle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: height * 60 / 100,
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
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 5,
        padding: 5
    },
    logo: {
        resizeMode: "contain",
        width: '20%',
        height: height * 6 / 100,
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

export default History;