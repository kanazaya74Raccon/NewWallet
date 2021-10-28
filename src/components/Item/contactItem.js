import React, { useContext, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Dimensions
} from 'react-native';
const { height, width } = Dimensions.get('window');
import { ThemeContext } from "../../hooks/useTheme";
import { Paragraph } from "../Typography";

const Contactitem = ({
    label,
    value
}) => {
    const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);
    const theme = isLightTheme ? lightTheme : darkTheme;

    return (
        <View style={{ width: '90%', flexDirection: 'row', marginBottom: 5, height: height * 0.07 }}>
            <View style={[styles.vectorBox, { width: '30%', backgroundColor: theme.headerbackground, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }]}>
                <Text style={{
                    color: isLightTheme ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                    fontSize: height * 0.025,
                    fontWeight: 'bold'
                }}>{label}</Text>
            </View>
            <View
                style={[styles.input, { backgroundColor: theme.headerbackground }]}
            >
                <View>
                    <Paragraph style={{
                        textAlign: 'center',
                        fontSize: height * 0.025,
                        fontWeight: 'normal',
                        fontFamily: 'Roboto',
                        color: isLightTheme ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                    }}>{value}</Paragraph>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#4e4e4e',
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        fontSize: 20,
        marginTop: 5,
        paddingLeft: 20,
        width: '70%',
        alignItems: 'flex-end',
        paddingRight: 20,
        justifyContent: 'center'
    },
    vectorBox: {
        backgroundColor: '#4e4e4e',
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        fontSize: 20,
        marginTop: 5,
        paddingLeft: 20,
        color: '#fff'
    },
})
export default Contactitem;