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
// import appStyles from '../../constants/Styles.js';
import FullButton from '../../components/FullButton.js';

const { height, width } = Dimensions.get('window');

class CreateAccount extends Component {
    static navigationOptions = {
        header: null,
    }
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: ''
        }
    }
    handleSubmit = () => {
        // =========================
        // Insert Login Logic here
        // =========================
        this.props.navigation.navigate('Main');
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
                            underlineColorAndroid={'transparent'}
                            value={this.state.name} />
                        <TextInput
                            style={[appStyles.textInput, styles.input]}
                            underlineColorAndroid={'transparent'}
                            placeholder={'Username'}
                            value={this.state.email} />
                        <TextInput
                            style={[appStyles.textInput, styles.input]}
                            underlineColorAndroid={'transparent'}
                            placeholder={'Email'}
                            value={this.state.password} />
                        <TextInput
                            style={[appStyles.textInput, styles.input]}
                            underlineColorAndroid={'transparent'}
                            placeholder={'Password'}
                            value={this.state.password} />
                        <TextInput
                            style={[appStyles.textInput, styles.input]}
                            underlineColorAndroid={'transparent'}
                            placeholder={'Confirm Password'}
                            value={this.state.password} />
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

export default CreateAccount;