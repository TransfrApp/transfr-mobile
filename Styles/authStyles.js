import {StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

const authStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    window: {
        backgroundColor: '#FFF',
        height: height * .5,
        width: width * .5,
        borderRadius: 37,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 27,
    },
    textInput: {
        backgroundColor: '#FBFCFC',
        borderColor: '#979797',
        width: width * .30,
        height: height * .07,
        marginTop: 15,
        marginBottom: 20,
        fontSize: 20,
        paddingLeft: 10
    },
    login: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#693CB7',
        width: width * .23,
        height: height * .07,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 23
    },
    headerStyle: {
        backgroundColor: 'transparent'
    },
    subText: {
        fontSize: 20,
        color: '#6D708A'
    }
});

export default authStyles;