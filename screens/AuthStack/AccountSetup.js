import React, { Component } from 'react';
import {
    StyleSheet,
    TextInput,
    Text,
    Dimensions,
    ImageBackground,
    TouchableOpacity,
    View,
} from 'react-native';
import axios from "axios";
import baseUrl from '../../request-config';
import appStyles from '../../Styles/authStyles';
import { observer, inject } from 'mobx-react';

const { height, width } = Dimensions.get('window');

class AccountSetup extends Component {
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {
            headerTitle: 'Select Account Type'
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            wallet: '',
        }
    }
    componentDidMount() {
        // console.log(this.props.store);
        const user = this.props.store.UserStore;
        console.log("User in Store", user);
    }

    handleSubmit = () => {
        const user = this.props.store.UserStore.user;
        //Update the DB with account type
        axios.patch(`${baseUrl}/user`, {
            "wallet_address": this.state.wallet,
            "id": user.userId
        }).then(response => {
           this.props.store.UserStore.createWalletAddress(this.state.wallet);
            this.props.navigation.navigate('Main');
        }).catch(err => console.log(err));
    }

    render() {

        return (
            <ImageBackground source={require('../../assets/images/background.png')} style={{ height: '100%', width: '100%' }}>
                <View style={styles.container}>
                    <View style={styles.window}>
                        <Text style={[appStyles.title, { marginBottom: 30, marginTop: 30 }]}>Set Your Wallet Address</Text>
                        <TextInput
                            underlineColorAndroid={'transparent'}
                            value={this.state.wallet}
                            onChangeText={(wallet) => this.setState({ wallet })}
                            placeholder="Wallet Address"
                            style={styles.textInput} />
                        <View style={{ height: 100, marginBottom: 30, marginTop:30, justifyContent: 'flex-end' }}>
                            <TouchableOpacity onPress={() => this.handleSubmit()} style={appStyles.login}>
                                <Text style={appStyles.buttonText}>Finish Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    ...appStyles,
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    window: {
        backgroundColor: '#FFF',
        width: width * .5,
        borderRadius: 37,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        marginTop: 5,
        marginBottom: 5
    },
    radio: {
        height: height * 0.08,
        width: width * 0.25,
        borderWidth: 3,
        borderColor: '#979797',
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        flexDirection: 'row'
    },
    label: {
        fontSize: 20,
        color: '#6D708A',
        fontWeight: '600'
    },
    active: {
        height: height * 0.08,
        width: width * 0.25,
        borderWidth: 3,
        borderColor: '#693CB7',
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        flexDirection: 'row'
    },
    activeText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#693CB7'
    },
    textInput: {
        backgroundColor: '#FBFCFC',
        borderColor: '#979797',
        width: width * .30,
        height: height * .07,
        marginTop: 30,
        marginBottom: 20,
        fontSize: 20,
        paddingLeft: 10
    },
})

export default inject("store")(observer(AccountSetup));