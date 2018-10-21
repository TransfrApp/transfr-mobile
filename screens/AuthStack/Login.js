import React, { Component } from 'react';
import {
    TextInput,
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity,
    View,
    AsyncStorage,
    ImageBackground
} from 'react-native';
import axios from 'axios';
import baseUrl from '../../request-config';
import syncFromDB from '../../Service/syncFromDB';
const { width, height } = Dimensions.get('window');
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
class LoginScreen extends Component {
    static navigationOptions = {
        header: null,
    }
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    saveToken = async (token) => {
        try {
            await AsyncStorage.setItem('token', token);
        } catch (err) {
            console.log(err);
        }
    }

    getToken = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            return token;
        } catch (err) {
            console.log(err);
        }
    }

    componentDidMount = async () => {
        const token = await this.getToken();
        console.log("Token", token);
        if (token !== null) {
            axios.post(`${baseUrl}/user/login`, {
                token
            }).then(res => {
                const { token, user } = res.data;
                const { email, name, password } = user;
                const camelCase = { businessName: user.business_name, email, password, name, userId: user.id }
                this.props.store.UserStore.createAccount(camelCase);
                this.props.navigation.navigate('Main');
            }).catch((err) => console.log("Token auth unavailable. Need to finish the logic for JWT Auth"));
        } else return;
    }

    handleLogin = async () => {
        const { email, password } = this.state;
        const { camelCase, token } = await syncFromDB.fetchUser(email, password);
        this.saveToken(token);
        this.props.store.UserStore.createAccount(camelCase);
        this.props.navigation.navigate('Main');
    }

    render() {
        return (
            <ImageBackground source={require('../../assets/images/background.png')} style={{ width: '100%', height: '100%' }}>
                <View style={styles.container}>
                    <View style={styles.window}>
                        <Text style={styles.title}>Welcome Back!</Text>
                        <TextInput
                            underlineColorAndroid={'transparent'}
                            value={this.state.email}
                            onChangeText={(email) => this.setState({ email })}
                            placeholder="Email"
                            style={styles.textInput} />
                        <TextInput
                            underlineColorAndroid={'transparent'}
                            value={this.state.password}
                            onChangeText={(password) => this.setState({ password })}
                            secureTextEntry={true}
                            placeholder="Password"
                            style={styles.textInput} />
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.subText}>Forgot Password?</Text>
                            <TouchableOpacity onPress={() => alert("Waiting for backend functionality")}>
                                <Text style={[styles.subText, { color: "#693CB7" }]}> Reset</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: 120, justifyContent: 'flex-end' }}>
                            <TouchableOpacity style={styles.login} onPress={() => this.handleLogin()}>
                                <Text style={styles.buttonText}>Log In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <Text style={styles.subText}>No Account?</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('CreateAccount')}>
                            <Text style={[styles.subText, { color: '#693CB7' }]}> Get Started</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
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
})

export default LoginScreen;