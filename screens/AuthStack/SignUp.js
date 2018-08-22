import React, { Component } from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    TextInput,
    Text,
    Dimensions,
    ImageBackground,
    TouchableOpacity,
    View,
} from 'react-native';
import appStyles from '../../Styles/authStyles';
import { observer, inject } from 'mobx-react';

const { height, width } = Dimensions.get('window');

class CreateAccount extends Component {
    static navigationOptions = ({navigation}) => {
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
            username: '',
            password: '',
            confirmPassword: '',
        }
    }
    handleSubmit = () => {
        const user = this.props.store.UserStore.user;

        // How would we pattern match this shit to make it less fugly?
        user.businessName = this.state.businessName;
        user.confirmPassword = this.state.confirmPassword;
        user.email = this.state.email;
        user.password = this.state.password;
        user.confirmPassword = this.state.confirmPassword;
        user.username = this.state.username;

        this.props.navigation.navigate('AccountSetup');
    }

    render() {
        return (
            <ImageBackground source={require('../../assets/images/background.png')} style={{ height: '100%', width: '100%' }}>
                <View style={styles.container}>
                    <View style={styles.window}>
                        <Text style={[appStyles.title, {marginBottom: 10, marginTop: 15}]}>Welcome</Text>
                        <TextInput
                            style={[appStyles.textInput, styles.input]}
                            placeholder={'Business Name'}
                            value={this.state.businessName}
                            onChangeText={(businessName => this.setState({businessName}))}
                            underlineColorAndroid={'transparent'} />
                        <TextInput
                            style={[appStyles.textInput, styles.input]}
                            underlineColorAndroid={'transparent'}
                            value={this.state.username}
                            onChangeText={(username) => this.setState({username})}
                            placeholder={'Username'}/>
                        <TextInput
                            style={[appStyles.textInput, styles.input]}
                            value={this.state.email}
                            onChangeText={(email) => this.setState({email})}
                            underlineColorAndroid={'transparent'}
                            placeholder={'Email'}/>
                        <TextInput
                            style={[appStyles.textInput, styles.input]}
                            underlineColorAndroid={'transparent'}
                            secureTextEntry={true}
                            placeholder={'Password'}
                            value={this.state.password}
                            onChangeText={(password) => this.setState({password})}/>
                        <TextInput
                            style={[appStyles.textInput, styles.input]}
                            underlineColorAndroid={'transparent'}
                            placeholder={'Confirm Password'}
                            value={this.state.confirmPassword}
                            secureTextEntry={true}
                            onChangeText={(confirmPassword) => this.setState({confirmPassword})}/>
                      <View style={{height: 100, marginBottom: 15, justifyContent: 'flex-end'}}>
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