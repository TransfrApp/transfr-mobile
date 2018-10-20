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
import axios from 'axios';
import appStyles from '../../Styles/authStyles';
import { observer, inject } from 'mobx-react';
import baseUrl from '../../request-config.js';
const { height, width } = Dimensions.get('window');

class CreateAccount extends Component {
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {
            headerTitle: 'Sign Up',
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            businessName: '',
            name: '',
            password: '',
            confirmPassword: '',
            walletAddress: 'asdfk3234lksy332'
        }
    }

    verifyInput = () => {
        const { password, confirmPassword, email, name, businessName } = this.state;
        if (password || confirmPassword === '') alert("Please make sure to add both passwords");
        if (email === '') alert("Please make surey you have filled out your email");
        if (name === '') alert("Please make sure that your name is filled out");
        if (businessName === '') alert("Please make sure that your business name is listed");
    }


    handleSubmit = () => {
        this.verifyInput();
        if (this.state.password === this.state.confirmPassword || this.state.email === "") {
            axios.post(`${baseUrl}/user`, {
                "email": this.state.email,
                "password": this.state.password,
                "name": this.state.name,
                "business_name": this.state.businessName,
                "wallet_address": this.state.walletAddress
            }).then((response) => {
                console.log("Response From DB", response);
                const user = this.props.store.UserStore;
                // How would we pattern match this shit to make it less fugly?
                const obj = {
                    businessName: response.data.business_name,
                    email: response.data.email,
                    password: response.data.password,
                    name: response.data.name,
                    userId: response.data.id
                }
                user.createAccount(obj); // Updates the store
                this.props.navigation.navigate('Main'); // If we need account type route to AccountSetup
            })
                .catch((error) => {
                    alert("Something seems to have gone wrong");
                    console.log(error);
                });
        } else {
            alert("Please make sure you're passwords match");
        }
    }

    render() {
        return (
            <ImageBackground source={require('../../assets/images/background.png')} style={{ height: '100%', width: '100%' }}>
                <View style={styles.container}>
                    <View style={styles.window}>
                        <Text style={[appStyles.title, { marginBottom: 10, marginTop: 15 }]}>Welcome</Text>
                        <TextInput
                            style={[appStyles.textInput, styles.input]}
                            placeholder={'Business Name'}
                            value={this.state.businessName}
                            onChangeText={(businessName => this.setState({ businessName }))}
                            underlineColorAndroid={'transparent'} />
                        <TextInput
                            style={[appStyles.textInput, styles.input]}
                            underlineColorAndroid={'transparent'}
                            value={this.state.name}
                            onChangeText={(name) => this.setState({ name })}
                            placeholder={'Name'} />
                        <TextInput
                            style={[appStyles.textInput, styles.input]}
                            value={this.state.email}
                            onChangeText={(email) => this.setState({ email })}
                            underlineColorAndroid={'transparent'}
                            placeholder={'Email'} />
                        <TextInput
                            style={[appStyles.textInput, styles.input]}
                            underlineColorAndroid={'transparent'}
                            secureTextEntry={true}
                            placeholder={'Password'}
                            value={this.state.password}
                            onChangeText={(password) => this.setState({ password })} />
                        <TextInput
                            style={[appStyles.textInput, styles.input]}
                            underlineColorAndroid={'transparent'}
                            placeholder={'Confirm Password'}
                            value={this.state.confirmPassword}
                            secureTextEntry={true}
                            onChangeText={(confirmPassword) => this.setState({ confirmPassword })} />
                        <View style={{ height: 100, marginBottom: 15, justifyContent: 'flex-end' }}>
                            <TouchableOpacity onPress={() => this.handleSubmit()} style={appStyles.login}>
                                <Text style={appStyles.buttonText}>Sign Up</Text>
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
    }
})

export default inject("store")(observer(CreateAccount));