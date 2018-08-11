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
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
// import appStyles from '../../constants/Styles.js';
import FullButton from '../../components/FullButton.js';

const { height, width } = Dimensions.get('window');

class AccountSetup extends Component {
    static navigationOptions = {
        header: null,
    }
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            businessType: 0
        }
    }
    handleSubmit = () => {
        // =========================
        // Insert Login Logic here
        // =========================
        this.props.navigation.navigate('Main');
    }

    render() {

        var radio_props = [
            {label: 'Consumer', value: 'consumer' },
            {label: 'Merchant', value: 'merchant' }
          ];

        return (
            <ImageBackground source={require('../../assets/images/background.png')} style={{ height: '100%', width: '100%' }}>
                <View style={styles.container}>
                    <View style={styles.window}>
                        <Text style={[appStyles.title, {marginBottom: 10, marginTop: 15}]}>Welcome</Text>
                        <RadioForm
                            radio_props={radio_props}
                            buttonColor={'#693CB7'}
                            initial={this.state.businessType}
                            onPress={(value) => {this.setState({businessType: value})}}
                            />
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

export default AccountSetup;