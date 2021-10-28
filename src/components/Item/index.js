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

const Item = ({
    catagoryLabel,
    value
}) => {
    const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);
    const theme = isLightTheme ? lightTheme : darkTheme;

    useEffect(() => {
        // console.log('values--->', value)
    }, [])

    return (
        <View style={{ width: '100%', flexDirection: 'row', marginBottom: 5 }}>
            <View style={[styles.vectorBox, { width: '20%', backgroundColor: theme.headerbackground, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }]}>
                <Text style={{
                    color: isLightTheme ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                    fontSize: 13
                }}>{catagoryLabel}</Text>
            </View>
            <View
                style={[styles.input, { backgroundColor: theme.headerbackground }]}
            >
                <View>
                    <Paragraph style={catagoryLabel === "Sent" ? styles.SentStyle : catagoryLabel === "Recieved" ? styles.RecievedStyle : styles.PendingStyle}>- 111.00 HYDRO</Paragraph>
                    <Paragraph style={catagoryLabel === "Sent" ? styles.SentStyle : catagoryLabel === "Recieved" ? styles.RecievedStyle : styles.PendingStyle}>- 20.00 USD</Paragraph>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    SentStyle: {
        textAlign: 'center',
        fontSize: 12,
        fontWeight: 'normal',
        fontFamily: 'Roboto',
        color: '#BA5252'
    },
    RecievedStyle: {
        textAlign: 'center',
        fontSize: 12,
        fontWeight: 'normal',
        fontFamily: 'Roboto',
        color: '#80BA52'
    },
    PendingStyle: {
        textAlign: 'center',
        fontSize: 12,
        fontWeight: 'normal',
        fontFamily: 'Roboto',
        color: '#AAA14C'
    },
    input: {
        backgroundColor: '#4e4e4e',
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        fontSize: 20,
        marginTop: 5,
        paddingLeft: 20,
        width: '80%',
        alignItems: 'flex-end',
        paddingRight: 20
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
export default Item;