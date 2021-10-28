import React, { useContext } from 'react';
import {
    View,
    Dimensions,
    Platform, StatusBar, StyleSheet,
    Image
} from "react-native";
import { LabelInput } from "../../../components/Forms";
import { BgView, Header } from "../../../components/Layouts";
import Button from "../../../components/Button";
import { ThemeContext } from "../../../hooks/useTheme";
import { Picker } from '@react-native-picker/picker';
import { Paragraph } from "../../../components/Typography";
const { height, width } = Dimensions.get('window');


const ExportTransactions = (props) => {
    const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);
    const theme = isLightTheme ? lightTheme : darkTheme;
    const [selectedvalue, setSelectedValue] = React.useState('init');

    return (
        <BgView>
            <Header.Back title="Export Transactions" onBackPress={props.navigation.goBack} containerStyle={styles.header} />
            <View style={styles.container}>
                <View style={styles.top}>
                    <LabelInput
                        label="Enter Password"
                        placeholder="Tap to edit..."
                    // value={symbol}
                    // onChangeText={(value) => setSymbol(value)}
                    />

                    <Paragraph style={styles.label}>Choose wallet</Paragraph>
                    <Picker
                        // mode="dropdown"
                        backgroundColor={theme.headerbackground}
                        style={{
                            color: isLightTheme ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                            borderRadius: 10,
                        }}
                        itemStyle={{
                            width: '100%',
                            backgroundColor: theme.headerbackground,
                            color: isLightTheme ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                        }}
                        selectedValue={selectedvalue}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedValue(itemValue)
                        }>
                        <Picker.Item label="Tap to edit.." value="init" style={styles.pickerItem} />
                        <Picker.Item label="Java" value="java" style={styles.pickerItem} />
                        <Picker.Item label="JavaScript" value="js" style={styles.pickerItem} />
                    </Picker>
                </View>
                <View style={styles.bottom}>
                    <Button
                        text={"Download CSV"}
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
export default ExportTransactions;