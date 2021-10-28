import React, { useContext } from 'react';
import {
    TouchableOpacity,
    Text,
    Dimensions
} from 'react-native';
import { ThemeContext } from "../../../hooks/useTheme";
const { height, width } = Dimensions.get('window');

const BTN = ({
    onPress,
    style,
    title,
    textStyle,
    status
}) => {
    const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);
    const theme = isLightTheme ? lightTheme : darkTheme;

    return (
        <TouchableOpacity
            style={
                title === status ? {
                    backgroundColor: '#171717',
                    ...style
                } :
                    {
                        backgroundColor: theme.headerbackground,
                        ...style
                    }
            }
            onPress={() => { onPress(title) }}
        >
            <Text
                style={{
                    color: title === status && isLightTheme ? '#fff' : !title === status || isLightTheme ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                    letterSpacing: 0.5,
                    fontFamily: "Roboto",
                    textAlign: "center",
                    ...textStyle
                }}
            >
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default BTN;